import type { z } from "zod";

import {
  ApiClient,
  type HttpMethod,
  type ApiRequestOptions,
} from "./api-client";

import { maskSensitiveData, logger } from "@core";

// Result returned by every API operation
export type ApiOperationResult<TSuccess, TError> =
  | {
      status: number;
      ok: true;
      data: TSuccess;
    }
  | {
      status: number;
      ok: false;
      data: TError;
    };

// Logs payload after masking sensitive information
const logPayload = (label: string, payload: unknown): void => {
  logger.logPayload(label, maskSensitiveData(payload), "API");
};

// Playwright multipart file payload shape
type MultipartFilePayload = {
  name?: unknown;
  mimeType?: unknown;
  buffer: unknown;
};

// Identifies a multipart file payload
const isMultipartFilePayload = (
  value: unknown,
): value is MultipartFilePayload =>
  value !== null && typeof value === "object" && "buffer" in value;

// Gets the size of binary data without exposing its contents
const getBinarySize = (value: unknown): number | undefined => {
  if (ArrayBuffer.isView(value)) {
    return value.byteLength;
  }

  if (value instanceof ArrayBuffer) {
    return value.byteLength;
  }
  return undefined;
};

// Replaces binary file contents with safe metadata for logging
const summarizeMultipartPayload = (payload: unknown): unknown => {
  if (
    payload === null ||
    typeof payload !== "object" ||
    Array.isArray(payload)
  ) {
    return payload;
  }

  return Object.fromEntries(
    Object.entries(payload).map(([key, value]) => {
      if (!isMultipartFilePayload(value)) {
        return [key, value];
      }

      const size = getBinarySize(value.buffer);

      return [
        key,
        {
          name: value.name,
          mimeType: value.mimeType,
          ...(size === undefined ? {} : { size }),
        },
      ];
    }),
  );
};

export class ApiOperationExecutor {
  constructor(private readonly apiClient: ApiClient) {}

  async execute<
    TRequestSchema extends z.ZodType,
    TSuccessSchema extends z.ZodType,
    TErrorSchema extends z.ZodType,
  >(options: {
    method: HttpMethod;
    endpoint: string;
    payload: z.input<TRequestSchema>;
    requestSchema: TRequestSchema;
    bodyType?: "json" | "multipart";
    successSchema: TSuccessSchema;
    errorSchema: TErrorSchema;
    requestOptions?: ApiRequestOptions;
  }): Promise<
    ApiOperationResult<z.output<TSuccessSchema>, z.output<TErrorSchema>>
  > {
    const {
      method,
      endpoint,
      payload,
      requestSchema,
      bodyType = "json",
      successSchema,
      errorSchema,
      requestOptions = {},
    } = options;

    // Multipart requests are not supported for GET
    if (method === "GET" && bodyType === "multipart") {
      throw new Error("GET requests cannot use multipart request bodies.");
    }

    // 1. Validate request before sending
    const validatedRequest = requestSchema.safeParse(payload);

    if (!validatedRequest.success) {
      throw new Error(
        `Request validation failed: ${validatedRequest.error.message}`,
      );
    }

    logger.section("API REQUEST", "API");
    logger.info(`Method:   ${method}`, "API");
    logger.info(`Endpoint: ${endpoint}`, "API");

    // 2. Prepare safe request payload for logging
    const requestPayloadForLogging =
      bodyType === "multipart"
        ? summarizeMultipartPayload(validatedRequest.data)
        : validatedRequest.data;

    logPayload(
      "Request Payload (validated and sent)",
      requestPayloadForLogging,
    );

    // 3. Select request body format
    const requestBodyOptions: ApiRequestOptions =
      method === "GET"
        ? {
            params: validatedRequest.data as Record<
              string,
              string | number | boolean
            >,
          }
        : bodyType === "multipart"
          ? {
              multipart: validatedRequest.data as NonNullable<
                ApiRequestOptions["multipart"]
              >,
            }
          : {
              data: validatedRequest.data,
            };

    // 4. Send HTTP request
    const response = await this.apiClient.send(method, endpoint, {
      ...requestOptions,
      ...requestBodyOptions,
    });

    // 5. Read response body
    let responseBody: unknown;

    try {
      responseBody = await response.json();
    } catch {
      logger.error(
        `Unable to parse JSON response. HTTP status: ${response.status()}`,
        "API",
      );

      throw new Error(
        `Unable to parse JSON response. HTTP status: ${response.status()}`,
      );
    }

    logger.section("API RESPONSE", "API");
    logger.info(`HTTP Status: ${response.status()}`, "API");
    logPayload("Response Body", responseBody);
    logger.info("=".repeat(40), "API");

    // 6. Select schema based on HTTP status
    const selectedSchema = response.ok() ? successSchema : errorSchema;

    // 7. Validate response
    const validatedResponse = selectedSchema.safeParse(responseBody);

    if (!validatedResponse.success) {
      throw new Error(
        `Response validation failed. HTTP status: ${response.status()}. ${validatedResponse.error.message}`,
      );
    }

    // 8. Return validated result
    if (response.ok()) {
      return {
        status: response.status(),
        ok: true,
        data: validatedResponse.data as z.output<TSuccessSchema>,
      };
    }

    return {
      status: response.status(),
      ok: false,
      data: validatedResponse.data as z.output<TErrorSchema>,
    };
  }
}
