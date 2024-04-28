import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../../services/apiError';
import * as userService from '../user/service';
import { body, createValidator } from '../../utils/validator';
import { EMAIL_RE, USER_ROLES } from '../../constants';

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const validUserRoles = Object.values(USER_ROLES);
  const validator = createValidator([
    body('email')
      .matches(EMAIL_RE)
      .withMessage('Please insert a valid email address.'),
    body('role')
      .isIn(validUserRoles)
      .withMessage(
        `Invalid role. It must be one of [${validUserRoles.join(', ')}].`,
      ),
  ]);

  const validationResult = await validator.validate(req);

  if (!validationResult.isEmpty()) {
    return next(ApiError.createValidationError(validationResult));
  }

  const { email, role } = req.body;
  try {
    const user = await userService.createUser({ email, role });
    res.json(user);
  } catch (error) {
    next(error);
  }
}
