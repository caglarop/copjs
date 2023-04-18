'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import type { BuiltInProviderType } from 'next-auth/providers';
import type { ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { getProviders, signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from 'react-icons/hi';
import type { z } from 'zod';

import { useTranslation } from '@/app/i18n/client';
import Alert from '@/components/atoms/alerts/Alert';
import Button from '@/components/atoms/buttons/Button';
import Card from '@/components/atoms/cards/Card';
import HorizontalDivider from '@/components/atoms/divider/HorizontalDivider';
import InputText from '@/components/atoms/inputs/InputText';
import H1 from '@/components/atoms/typography/headings/H1';
import Link from '@/components/atoms/typography/Link';
import Subtitle from '@/components/atoms/typography/Subtitle';
import Title from '@/components/atoms/typography/Title';
import BaseLayout from '@/components/layouts/BaseLayout';
import Loader from '@/components/loading/Loader';
import SignInButtons from '@/components/SignInButtons';
import RegistrationSchema from '@/schema/RegistrationSchema';
import { trpc } from '@/utils/trpc';

export default function SignUp() {
  const router = useRouter();

  const { t } = useTranslation('generic');

  const { status } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<z.infer<typeof RegistrationSchema>>({
    mode: 'onChange',
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {}
  });

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(`/housekeeping`);
    }
  }, [status]);

  const { mutate, data, error } = trpc.user.create.useMutation();

  useEffect(() => {
    (async () => {
      if (data) {
        await signIn('credentials', {
          ...data,
          redirect: false
        });
      }
    })();
  }, [data, error]);

  const onSubmit = async (input: z.infer<typeof RegistrationSchema>) => {
    // Send the request to the API to create the user
    await mutate(input);
  };

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    (async () => {
      setProviders(await getProviders());
    })();
  }, []);

  // If the session is loading or authenticated, return the loading message
  if (
    providers === null ||
    status === 'loading' ||
    status === 'authenticated'
  ) {
    return <Loader />;
  }

  // Sign up

  return (
    <>
      <BaseLayout>
        <div className="flex h-full w-full items-center justify-center">
          <div className="mx-auto w-full max-w-[410px]">
            <H1 className="mb-10 text-center">{t('create_an_account')}</H1>

            <SignInButtons providers={providers} />

            <HorizontalDivider>{t('or_register_with_email')}</HorizontalDivider>

            <Card>
              <div className="my-5">
                <Title className="mb-2">{t('create_an_account')}</Title>
                <Subtitle>
                  {t('already_registered')}{' '}
                  <Link href={`/auth/signin`}>{t('sign_in')}</Link>
                </Subtitle>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4">
                  <InputText
                    type="text"
                    autoFocus={true}
                    placeholder={t('display_name')}
                    floatingLabel={true}
                    className="w-full"
                    disabled={isSubmitting}
                    name="name"
                    register={register}
                  />
                </div>
                {errors?.name?.message && (
                  <Alert color="danger">
                    {t(errors?.name?.message, {
                      minChar: 3,
                      maxChar: 100
                    })}
                  </Alert>
                )}

                <div className="mt-4">
                  <InputText
                    type="email"
                    placeholder={t('email')}
                    floatingLabel={true}
                    className="w-full"
                    disabled={isSubmitting}
                    name="email"
                    register={register}
                  />
                </div>
                {errors?.email?.message && (
                  <Alert color="danger">
                    {t(errors?.email?.message, {
                      maxChar: 100
                    })}
                  </Alert>
                )}

                <div className="mt-4">
                  <InputText
                    type="password"
                    placeholder={t('password')}
                    floatingLabel={true}
                    className="w-full"
                    disabled={isSubmitting}
                    name="password"
                    register={register}
                  />
                </div>
                {errors?.password?.message && (
                  <Alert color="danger">{t(errors?.password?.message)}</Alert>
                )}

                <div className="mt-4">
                  <InputText
                    type="password"
                    placeholder={t('confirm_password')}
                    floatingLabel={true}
                    className="w-full"
                    disabled={isSubmitting}
                    name="passwordConfirm"
                    register={register}
                  />
                </div>
                {errors?.passwordConfirm?.message && (
                  <Alert color="danger">
                    {t(errors?.passwordConfirm?.message)}
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
                    {t('sign_up')}
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
