import { authRouter } from '@/server/api/routers/auth';
import { infoRouter } from '@/server/api/routers/info';
import { userRouter } from '@/server/api/routers/user';
import { createTRPCRouter } from '@/server/trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/navigations should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  auth: authRouter,
  info: infoRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
