import type { APIRequestContext, APIResponse } from "@playwright/test";

// Supported HTTP methods
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// Reuse Playwright's own request options type
export type ApiRequestOptions = NonNullable<
  Parameters<APIRequestContext["fetch"]>[1]
>;

export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}
  async send(
    method: HttpMethod,
    endpoint: string,
    options: ApiRequestOptions = {},
  ): Promise<APIResponse> {
    return this.request.fetch(endpoint, {
      ...options,
      method,
    });
  }
}
