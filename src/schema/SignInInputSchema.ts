import { z } from 'zod';

export default z.object({
  email: z.string().email({ message: 'errors.invalid_email' }).max(100),
  password: z
    .string()
    .min(6, {
      message: 'errors.password_too_short'
    })
    .max(100, {
      message: 'errors.password_too_long'
    })
});
