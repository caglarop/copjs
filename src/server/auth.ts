import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const getServerAuthSession = async ({
  req,
  res
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  if (!req || !res) {
    return null;
  }

  return getServerSession(req, res, authOptions);
};
