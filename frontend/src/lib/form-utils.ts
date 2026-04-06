import { type FieldError, type Merge } from 'react-hook-form';

export type FieldErrorType = FieldError | Merge<FieldError, (FieldError | undefined)[]> | undefined;

export function getFieldError(error?: FieldErrorType) {
  if (!error) return null;

  if ('message' in error && error.message) {
    return error.message as string;
  }

  if (Array.isArray(error)) {
    const firstError = error.find((e) => e?.message);
    return firstError?.message || null;
  }

  return null;
}

export function getFieldState(error?: FieldErrorType) {
  if (!error) return {};

  return {
    isDirty: 'isDirty' in error ? error.isDirty : false,
    isTouched: 'isTouched' in error ? error.isTouched : false,
    invalid: 'invalid' in error ? error.invalid : false,
    error: getFieldError(error),
  };
}
