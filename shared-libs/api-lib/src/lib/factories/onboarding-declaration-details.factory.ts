import { DeclarationServiceRequest } from "@api-lib";

export const createDeclarationPayload = (
  declarationAccepted: boolean,
): DeclarationServiceRequest => {
  return {
    declarationAccepted: declarationAccepted,
  };
};
