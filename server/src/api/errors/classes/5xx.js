import CustomHttpError from './CustomHttpError.js';

export class E500 extends CustomHttpError {
  constructor(message = 'Unexpected error occurred!') {
    super(message, 500);
  }
}
