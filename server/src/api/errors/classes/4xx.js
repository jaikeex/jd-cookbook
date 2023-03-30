import CustomHttpError from './CustomHttpError.js';

export class E400 extends CustomHttpError {
  constructor(message = 'Bad Request!', ...params) {
    super(message, 400);
  }
}

export class E401 extends CustomHttpError {
  constructor(message = 'You are not authorized!', ...params) {
    super(message, 401);
  }
}

export class E403 extends CustomHttpError {
  constructor(message = 'Forbidden!', ...params) {
    super(message, 403);
  }
}

export class E404 extends CustomHttpError {
  constructor(message = 'Requested resource not found!', ...params) {
    super(message, 404);
  }
}

export class E409 extends CustomHttpError {
  constructor(message = 'Conflict!', ...params) {
    super(message, 409);
  }
}
