// next-auth.d.ts
import type { User as PrismaUser } from '@prisma/client';

// Extend the types using module augmentation
// For more information on each option (and a full list of options) go to https://next-auth.js.org/configuration/options
declare module 'next-auth' {
  interface User extends PrismaUser {}

  interface Session {
    expires: string; // This is the date the session will expire

    user: User; // This is the user object returned from the database
  }
}
