import { z } from 'zod';

export default z.object({
  email: z.string().email().max(100),
  password: z.string().min(6).max(100)
});
