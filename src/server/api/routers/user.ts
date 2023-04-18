import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import RegistrationSchema from '@/schema/RegistrationSchema';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from '@/server/trpc';
import { hashPassword } from '@/utils/hash';

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(RegistrationSchema)
    .mutation(async ({ input }) => {
      const { name, email, password } = input;

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashPassword(password)
        }
      });

      return user;
    }),

  get: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1).max(255)
      })
    )
    .mutation(async ({ input }) => {
      const { id } = input;

      const user = await prisma.user.findFirst({
        where: { id }
      });

      return user || null;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1).max(255),
        data: z.record(z.any())
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;

      const user = await prisma.user.update({
        where: { id },
        data
      });

      return user || null;
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1).max(255)
      })
    )
    .mutation(async ({ input }) => {
      const { id } = input;

      await prisma.user.delete({
        where: { id }
      });

      return true;
    })
});
