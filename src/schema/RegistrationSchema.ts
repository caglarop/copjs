import { z } from 'zod';

export default z
  .object({
    name: z
      .string()
      .min(3, {
        message: 'errors.field_too_short'
      })
      .max(100, {
        message: 'errors.field_too_long'
      }),
    email: z
      .string()
      .email({
        message: 'errors.invalid_email'
      })
      .max(100, {
        message: 'errors.field_too_long'
      }),
    password: z
      .string()
      .min(6, {
        message: 'errors.password_too_short'
      })
      .max(100, {
        message: 'errors.password_too_long'
      }),
    passwordConfirm: z
      .string()
      .min(6, {
        message: 'errors.password_too_short'
      })
      .max(100, {
        message: 'errors.password_too_long'
      })
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: 'errors.passwords_dont_match',
    path: ['passwordConfirm']
  });
