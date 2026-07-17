export class ApiError extends Error {
  constructor(status, code, message, details = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function errorResponse(error, requestId = "local-request") {
  const status = Number(error.status || 500);
  return {
    ok: false,
    error: {
      code: error.code || "INTERNAL_ERROR",
      message: status >= 500 ? "Unexpected server error." : error.message,
      details: status >= 500 ? {} : error.details || {},
      requestId
    }
  };
}

export function successResponse(data, requestId = "local-request") {
  return { ok: true, data, requestId };
}
