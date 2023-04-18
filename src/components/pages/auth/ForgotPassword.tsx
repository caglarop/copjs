'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from 'react-icons/hi';
import type { z } from 'zod';

import { useTranslation } from '@/app/i18n/client';
import Alert from '@/components/atoms/alerts/Alert';
import Button from '@/components/atoms/buttons/Button';
import Card from '@/components/atoms/cards/Card';
import InputText from '@/components/atoms/inputs/InputText';
import H1 from '@/components/atoms/typography/headings/H1';
import Link from '@/components/atoms/typography/Link';
import Subtitle from '@/components/atoms/typography/Subtitle';
import Title from '@/components/atoms/typography/Title';
import BaseLayout from '@/components/layouts/BaseLayout';
import Loader from '@/components/loading/Loader';
import RequestPasswordLinkSchema from '@/schema/RequestPasswordLinkSchema';
import { trpc } from '@/utils/trpc';

export default function ForgotPassword() {
  const router = useRouter();

  const { t } = useTranslation('generic');

  const { status } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm<z.infer<typeof RequestPasswordLinkSchema>>({
    mode: 'onChange',
    resolver: zodResolver(RequestPasswordLinkSchema),
    defaultValues: {}
  });

  const { mutate } = trpc.auth.requestLink.useMutation();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(`/housekeeping`);
    }
  }, [status]);

  const onSubmit = async (input: z.infer<typeof RequestPasswordLinkSchema>) => {
    await mutate(input);
  };

  // If the session is loading or authenticated, return the loading message
  if (status === 'loading' || status === 'authenticated') {
    return <Loader />;
  }

  // Reset password

  return (
    <>
      <BaseLayout>
        <div className="flex h-full w-full items-center justify-center">
          <div className="mx-auto w-full max-w-[410px]">
            <H1 className="mb-10 text-center">{t('reset_password')}</H1>

            <Card>
              <div className="my-5">
                <Title className="mb-2">{t('reset_your_password')}</Title>
                <Subtitle>
                  {t('you_remembered_your_password_again')}{' '}
                  <Link href={`/auth/signin`}>{t('sign_in')}</Link>
                </Subtitle>
              </div>

              {isSubmitSuccessful && (
                <Alert color="success">
                  {t(
                    'we_have_sent_you_an_email_with_a_link_to_reset_your_password'
                  )}
                </Alert>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4">
                  <InputText
                    type="email"
                    autoFocus={true}
                    placeholder={t('email')}
                    floatingLabel={true}
                    className="w-full"
                    name="email"
                    register={register}
                    disabled={isSubmitting}
                  />
                </div>
                {errors?.email?.message && (
                  <Alert color="danger">
                    {t(errors?.email?.message, {
                      maxChar: 100
                    })}
                  </Alert>
                )}

                <div>
                  <Button
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                    className="mb-2 mt-4 w-full justify-center"
                    rightIcon={<HiOutlineArrowSmRight />}
                  >
                    {t('send_reset_link')}
                  </Button>
                </div>
              </form>

              <Link
                href={`/auth/signin`}
                className="group mt-4 flex w-full items-center justify-center gap-2"
              >
                <div className="inline-block duration-300 group-hover:pr-1">
                  <HiOutlineArrowSmLeft />
                </div>
                {t('back_to_sign_in')}
              </Link>
            </Card>
          </div>
        </div>
      </BaseLayout>
    </>
  );
}
