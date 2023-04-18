'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { useTranslation } from '@/app/i18n/client';
import Button from '@/components/atoms/buttons/Button';
import AppLayout from '@/components/layouts/AppLayout';
import Loader from '@/components/loading/Loader';

export default function Housekeeping() {
  const router = useRouter();

  const { t } = useTranslation('generic');

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/auth/signin`);
    }
  }, [status]);

  // If the session is loading or unauthenticated, return the loading message
  if (status === 'loading' || status === 'unauthenticated') {
    return <Loader />;
  }

  // App

  return (
    <>
      <AppLayout>
        <div className="flex items-center gap-2">
          {Boolean(session?.user?.image) && (
            <Image
              alt=""
              src={session?.user?.image as string}
              className="rounded-full"
              width={80}
              height={80}
              priority
            />
          )}

          <div>
            <div className="">
              {t('signed_in_as', { value: session?.user?.email as string })}
            </div>

            <div className="inline-block">
              <Button
                color={'secondary'}
                className="my-2"
                size="small"
                clickHandler={() => {
                  signOut({
                    callbackUrl: `/`,
                    redirect: true
                  });
                }}
              >
                {t('sign_out')}
              </Button>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
