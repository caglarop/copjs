import { createTRPCRouter, publicProcedure } from '@/server/trpc';
import { getShortCommitId } from '@/utils/commit-id';

export const infoRouter = createTRPCRouter({
  version: publicProcedure.query(async () => {
    const commitId = await getShortCommitId();

    return commitId || '';
  })
});
