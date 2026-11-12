import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { DynamicDataHelper } from "@core";

import type { IdentityDetailsServiceRequest } from "../schemas/onboarding-identity.schema";

export const createOnboardingIdentityPayload =
  async (): Promise<IdentityDetailsServiceRequest> => {
    const fileBuffer = await readFile(
      resolve(process.cwd(), "../../CodingImp.pdf"),
    );
    const pan = DynamicDataHelper.generateRandomPancardNumber().toUpperCase();
    const aadhar = DynamicDataHelper.generateRandomAadharNumber();
    return {
      panCard: pan,
      aadhaarCard: aadhar,
      aadhaarFile: {
        name: "test-aadhaar.pdf",
        mimeType: "application/pdf",
        buffer: fileBuffer,
      },
    };
  };
