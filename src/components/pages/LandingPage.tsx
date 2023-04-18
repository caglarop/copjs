'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { useTranslation } from '@/app/i18n/client';
import AppLayout from '@/components/layouts/AppLayout';
import Loader from '@/components/loading/Loader';

export default function LandingPage() {
  const router = useRouter();

  const { status } = useSession();

  const { t } = useTranslation('generic');

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(`/housekeeping`);
    }
  }, [status]);

  const [initialRenderComplete, setInitialRenderComplete] =
    useState<boolean>(false);

  // Wait for the initial render to complete
  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);

  if (status === 'loading' || status === 'authenticated') {
    return <Loader />;
  }

  // If the initial render is not complete, return an empty fragment
  if (!initialRenderComplete) {
    return (
      <>
        <Loader />
      </>
    );
  }

  // If the initial render is complete, return the page
  return (
    <AppLayout>
      <div className="mb-2">{t('not-signed-in')}</div>
    </AppLayout>
  );
}
