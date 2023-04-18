import type { IncomingMessage } from 'http';

import { env } from '@/env.mjs';

export default function BasicAuth(
  req: IncomingMessage & {
    cookies: Partial<{
      [key: string]: string;
    }>;
  }
) {
  const basicAuth: string = req.headers.authorization || '';

  if (basicAuth) {
    const credentials: string = basicAuth.split(' ')[1] || '';

    const [username, password] = Buffer.from(credentials, 'base64')
      .toString()
      .split(':');

    if (
      username === env.BASIC_AUTH_USERNAME &&
      password === env.BASIC_AUTH_PASSWORD
    ) {
      return new Response('AUTHORIZED', {
        status: 200,
        headers: {
          'WWW-Authenticate': 'Basic realm="AUTHORIZED"'
        }
      });
    }
  }

  return new Response('ACCESS DENIED', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="ACCESS DENIED"'
    }
  });
}
