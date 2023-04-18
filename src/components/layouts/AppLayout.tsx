'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { useTranslation } from '@/app/i18n/client';
import backgroundImage from '@/assets/images/bg.png';
import rectangleImage from '@/assets/images/rectangle.png';
import Button from '@/components/atoms/buttons/Button';
import Subtitle from '@/components/atoms/typography/Subtitle';
import Title from '@/components/atoms/typography/Title';
import MainFooter from '@/components/layouts/MainFooter';
import { useTheme } from '@/providers/ThemeProvider';

type Props = {
  children?: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  const { data: session } = useSession();

  const router = useRouter();

  const { theme } = useTheme();

  const { t } = useTranslation('generic');

  return (
    <div
      className="dark:bg-ebony selection:bg-primary h-full w-full selection:text-white dark:text-white"
      style={
        theme === 'dark'
          ? {
              backgroundColor: '#101828',
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }
          : {
              backgroundImage: `url(${backgroundImage.src})`,
              backgroundColor: '#ECF3FB',
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }
      }
    >
      <div
        style={{
          backgroundImage: `url(${rectangleImage.src})`,
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center'
        }}
        className="h-[calc(100%-90px)] overflow-auto"
      >
        <div className="h-full w-full overflow-auto">
          <div className="h-full w-full px-4 py-[50px] lg:py-[50px]">
            <div className="flex h-full w-full items-center justify-center">
              <div className="p-[50px]">
                <div className="text-center">
                  {session && (
                    <>
                      <div className="mb-3">
                        <Title className="mb-1">{t('dashboard')}</Title>
                        <Subtitle>
                          {t('welcome', { value: session.user.name as string })}
                        </Subtitle>
                        <div>{session.user.role}</div>
                      </div>
                    </>
                  )}

                  {!session && (
                    <div className="mb-3 inline-block">
                      <Button
                        clickHandler={() => {
                          router.push(`/auth/signin`);
                        }}
                        size="small"
                      >
                        {t('sign_in')}
                      </Button>
                    </div>
                  )}

                  <div className="relative">{children}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MainFooter />
    </div>
  );
}
