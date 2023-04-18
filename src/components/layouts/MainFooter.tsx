'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import ThemeToggler from '@/components/atoms/buttons/ThemeToggler';
import LocaleSelector from '@/components/atoms/mixed/LocaleSelector';
import Footer from '@/components/layouts/Footer';
import { trpc } from '@/utils/trpc';

export default function MainFooter() {
  const params = useParams();

  const { data: version } = trpc.info.version.useQuery();

  useEffect(() => {}, [params?.lang]);

  return (
    <>
      <Footer>
        <div className="flex w-full items-center justify-center gap-4">
          <div>
            Made with ❤️ by{' '}
            <a href="https://devlified.com" target="_devlify_io">
              Devlified.com
            </a>
          </div>
          {version && version.length > 0 && (
            <div>
              <div className="dark:bg-primary inline-block rounded bg-gray-50 p-1 text-[11px] dark:text-white">
                {version}
              </div>
            </div>
          )}
          <div>
            <ThemeToggler />
          </div>
          <LocaleSelector />
        </div>
      </Footer>
    </>
  );
}
