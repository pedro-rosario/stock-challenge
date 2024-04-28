import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../../services/apiError';
import * as userService from '../user/service';
import { body, createValidator } from '../../utils/validator';
import * as jwt from '../../utils/jwt';
import { EMAIL_RE } from '../../constants';

export async function logIn(req: Request, res: Response, next: NextFunction) {
  const validator = createValidator([
    body('email')
      .matches(EMAIL_RE)
      .withMessage('Please insert a valid email address.'),
    body('password').isString(),
  ]);

  const validationResult = await validator.validate(req);

  if (!validationResult.isEmpty()) {
    return next(ApiError.createValidationError(validationResult));
  }

  const { email, password } = req.body;
  const user = await userService.getByMatchingPassword(email, password);

  if (!user) return next(ApiError.unauthorized('Wrong password'));

  const userToken = jwt.generateToken({ email, permissions: [user.role] });

  res.json({ email, token: userToken });
}
