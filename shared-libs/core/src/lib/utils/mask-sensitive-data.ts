const SENSITIVE_KEY_PATTERN =
  /password|token|authorization|secret|api[-_]?key|^pan(?:card)?$|^aadhaar(?:card)?$/i;

export const maskSensitiveData = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(maskSensitiveData);
  }

  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [
        key,
        SENSITIVE_KEY_PATTERN.test(key)
          ? "***REDACTED***"
          : maskSensitiveData(nestedValue),
      ]),
    );
  }

  return value;
};
