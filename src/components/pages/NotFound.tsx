'use client';

import { useTranslation } from '@/app/i18n/client';
import Button from '@/components/atoms/buttons/Button';
import H1 from '@/components/atoms/typography/headings/H1';
import BaseLayout from '@/components/layouts/BaseLayout';

export default function NotFound() {
  const { t } = useTranslation('generic');

  return (
    <>
      <BaseLayout>
        <div className="flex h-full w-full items-center justify-center">
          <div>
            <H1 className="mb-3">{t('page_not_found')}</H1>
            <div>
              <Button
                color={'primary'}
                className={'my-2 w-full justify-center'}
                size="small"
                clickHandler={() => {
                  window.location.href = '/';
                }}
              >
                {t('back_to_homepage')}
              </Button>
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
}
