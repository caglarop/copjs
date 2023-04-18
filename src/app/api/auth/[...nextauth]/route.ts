import { PrismaAdapter } from '@next-auth/prisma-adapter'; // Import the adapter
import type { NextAuthOptions, Session, User } from 'next-auth';
import NextAuth from 'next-auth'; // Import the types from the package
import CredentialsProvider from 'next-auth/providers/credentials'; // Import the Credentials provider
import DiscordProvider from 'next-auth/providers/discord'; // Import the Discord provider
import GithubProvider from 'next-auth/providers/github'; // Import the Discord provider

import { env } from '@/env.mjs';
import { prisma } from '@/lib/prisma'; // The adapter requires a prisma instance
import SignInInputSchema from '@/schema/SignInInputSchema';

export interface ExtendedSession extends Session {
  // Add any custom properties to the session here
  role: string;
}

export function getBaseUrl(req: any): string {
  const isHttps = req?.url?.startsWith('https://');
  const protocol = isHttps ? 'https' : 'http';
  const host = req.headers['x-forwarded-host'] || req.headers.host;

  return `${protocol}://${host}`;
}

/**
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET || 'CHANGE_THIS', // The secret used to encrypt the cookie
  adapter: PrismaAdapter(prisma), // The adapter is what connects NextAuth to your database

  /**
   * @see https://next-auth.js.org/configuration/providers
   */
  providers: [
    // Add as many providers as you like

    // Discord
    DiscordProvider({
      allowDangerousEmailAccountLinking: true,
      clientId: `${env.DISCORD_CLIENT_ID}`, // The client ID can be found on the application page
      clientSecret: `${env.DISCORD_CLIENT_SECRET}` // The client secret can be found on the application page
    }),

    // Github
    GithubProvider({
      allowDangerousEmailAccountLinking: true,
      clientId: `${env.GITHUB_CLIENT_ID}`, // The client ID can be found on the application page
      clientSecret: `${env.GITHUB_CLIENT_SECRET}` // The client secret can be found on the application page
    }),

    // Credentials
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',

      // The credentials is used to generate a suitable form on the sign in page.
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password' }
      },

      async authorize(input): Promise<User | null> {
        const credentials = await SignInInputSchema.parseAsync(input);

        const user = await prisma.user.findFirst({
          where: { email: credentials.email }
        });

        if (!user || credentials.password !== user.password) {
          return null;
        }

        return user;
      }
    })
  ],

  /**
   * @see https://next-auth.js.org/configuration/callbacks
   */
  callbacks: {
    /**
     * JWT
     */
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...user,
          ...token
        };
      }

      return token;
    },

    /**
     * Extend the session with custom properties
     */
    session({ session, token }: { session: Session; token: any; user: User }) {
      const newSession = { ...session };

      newSession.user = token;

      // Return the session to be stored in the cookie
      return newSession;
    }
  },

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `strategy` should be set to 'jwt' if no database is used.
    strategy: 'jwt',

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60 // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `strategy: 'jwt'` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: env.NEXTAUTH_SECRET || 'CHANGE_THIS'
  },

  /**
   * @see https://next-auth.js.org/configuration/pages
   */
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/signin?error=', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/housekeeping' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
