import { z } from 'zod';

export default z.object({
  email: z
    .string()
    .email({
      message: 'errors.invalid_email'
    })
    .max(100, {
      message: 'errors.field_too_long'
    })
});
