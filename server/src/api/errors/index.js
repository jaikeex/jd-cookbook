import * as clientErrors from './classes/4xx.js';
import * as serverErrors from './classes/5xx.js';

const httpErrors = {
  ...clientErrors,
  ...serverErrors
};

export default httpErrors;
