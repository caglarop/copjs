import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

import { appRouter } from '@/server/api/root';
import { createTRPCContext } from '@/server/trpc';

// this is the server RPC API handler

const handler = (request: Request) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext: createTRPCContext as any
  });
};

export const GET = handler;
export const POST = handler;
