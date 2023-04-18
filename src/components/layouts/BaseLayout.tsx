'use client';

import backgroundImage from '@/assets/images/bg.png';
import rectangleImage from '@/assets/images/rectangle.png';
import MainFooter from '@/components/layouts/MainFooter';
import { useTheme } from '@/providers/ThemeProvider';

type Props = {
  children?: React.ReactNode;
};

export default function BaseLayout({ children }: Props) {
  const { theme } = useTheme();

  return (
    <>
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
          className="h-[calc(100%-90px)]"
        >
          <div className="h-full w-full overflow-auto">
            <div className="flex min-h-full w-full flex-col items-center justify-center">
              <div className="w-full px-4 py-[50px]">{children}</div>
            </div>
          </div>
        </div>
        <MainFooter />
      </div>
    </>
  );
}
