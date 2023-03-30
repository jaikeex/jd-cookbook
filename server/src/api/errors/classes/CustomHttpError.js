export default class CustomHttpError extends Error {
  constructor(message, code, ...params) {
    super(message, ...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomHttpError);
    }

    this.code = code;
  }
}
