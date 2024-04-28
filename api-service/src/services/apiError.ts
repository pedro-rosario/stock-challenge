import { Result } from 'express-validator';

export class ApiError extends Error {
  public statusCode: number;
  public errors: any[];

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }

  static createValidationError(validationResult: Result): ApiError {
    const apiError = ApiError.unprocessableEntity('Validation Error');
    apiError.errors = validationResult.array();
    return apiError;
  }

  static unauthorized(message: string): ApiError {
    return new ApiError(message, 401);
  }

  static notFound(message: string): ApiError {
    return new ApiError(message, 404);
  }

  static unprocessableEntity(message: string): ApiError {
    return new ApiError(message, 422);
  }

  static conflict(message: string): ApiError {
    return new ApiError(message, 409);
  }
}
