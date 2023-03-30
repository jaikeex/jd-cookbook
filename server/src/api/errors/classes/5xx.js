import CustomHttpError from './CustomHttpError.js';

export class E500 extends CustomHttpError {
  constructor(message = 'Unexpected error occurred!', ...params) {
    super(message, 500);
  }
}
