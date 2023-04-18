/* eslint-disable import/order */
import 'windi.css';
import '@/styles/globals.css';

import { dir } from 'i18next';

import { languages } from '@/app/i18n/settings';
import AuthContext from '@/app/providers/AuthContext';
import { TrpcProvider } from '@/app/providers/TrpcContext';
import { ThemeProvider } from '@/providers/ThemeProvider';

export async function generateStaticParams() {
  return languages.map(lng => ({ lng }));
}

/*
export const generateMetadata = async (): Promise<Metadata> => {
  const t = (key: string) => key;

  return {
    title: {
      default: t('metadata.title.default'),
      template: t('metadata.title.template')
    },
    description: t('metadata.description'),
    applicationName: t('metadata.applicationName'),
    icons: {
      icon: '/favicon.ico'
    },
    robots: {
      index: true,
      follow: true
    }
  };
};
*/

export default async function RootLayout({
  children,
  params: { lng }
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <TrpcProvider>
      <html lang={lng} dir={dir(lng)}>
        <head />
        <body className="h-full w-full">
          <AuthContext>
            <ThemeProvider>{children}</ThemeProvider>
          </AuthContext>
        </body>
      </html>
    </TrpcProvider>
  );
}
