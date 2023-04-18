import { prisma } from '@/lib/prisma';
import CheckCredentialsSchema from '@/schema/CheckCredentialsSchema';
import RequestPasswordLinkSchema from '@/schema/RequestPasswordLinkSchema';
import { createTRPCRouter, publicProcedure } from '@/server/trpc';

export const authRouter = createTRPCRouter({
  checkCredentials: publicProcedure
    .input(CheckCredentialsSchema)
    .query(async ({ input }) => {
      const { email, password } = input;

      const user = await prisma.user.findFirst({
        where: { email }
      });

      if (user && user.password === password) {
        return user;
      }

      return null;
    }),
  requestLink: publicProcedure
    .input(RequestPasswordLinkSchema)
    .mutation(async ({ input }) => {
      const { email } = input;

      const user = await prisma.user.findFirst({
        where: { email }
      });

      if (user) {
        return user;
      }

      return null;
    })
});
