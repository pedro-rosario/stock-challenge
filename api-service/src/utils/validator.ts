import { Request } from 'express';
import {
  validationResult,
  Result,
  ValidationChain,
  ValidationError,
} from 'express-validator';

export * from 'express-validator';

/**
 * Creates a validator middleware that runs the specified validations on the request.
 * @param {ValidationChain[]} validations - An array of validation chains to run.
 * @returns {Object} An object with a `validate` function that runs the validations on the request.
 */
export const createValidator = (validations: ValidationChain[]) => {
  return {
    validate: async (
      request: Request,
    ): Promise<Result<ValidationError> | null> => {
      await Promise.all(
        validations.map((validation) => validation.run(request)),
      );

      return validationResult(request);
    },
  };
};
