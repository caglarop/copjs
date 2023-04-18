'use client';

import { SessionProvider, useSession } from 'next-auth/react';

export interface AuthContextProps {
  children: React.ReactNode;
}

export default function AuthContext({ children }: AuthContextProps) {
  const { data: session } = useSession();

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
