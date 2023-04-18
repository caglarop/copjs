'use client';

import Button from '@/components/atoms/buttons/Button';
import H1 from '@/components/atoms/typography/headings/H1';
import BaseLayout from '@/components/layouts/BaseLayout';

export default function Page() {
  return (
    <>
      <title>{'Internal error'}</title>
      <BaseLayout>
        <div className="flex h-full w-full items-center justify-center">
          <div>
            <H1 className="mb-3">{'Internal error'}</H1>
            <div>
              <Button
                color={'primary'}
                className={'my-2 w-full justify-center'}
                size="small"
                clickHandler={() => {
                  window.location.href = '/';
                }}
              >
                {'Back to homepage'}
              </Button>
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
}
