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
import SignInInputSchema from '@/schema/SignInInputSchema';
import { hashPassword } from '@/utils/hash';

export default function SignIn() {
  const router = useRouter();

  const { t } = useTranslation('generic');

  const [error, setError] = useState('');

  const { status } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<z.infer<typeof SignInInputSchema>>({
    mode: 'onChange',
    resolver: zodResolver(SignInInputSchema),
    defaultValues: {}
  });

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(`/housekeeping`);
    }

    /*
    if (router.query.error) {
      setError(router.query.error as string);
    }
    */
  }, [status]);

  const onSubmit = async (input: z.infer<typeof SignInInputSchema>) => {
    const result = await signIn('credentials', {
      email: input.email,
      password: hashPassword(input.password),
      redirect: false
    });

    if (result?.error) {
      setError('invalid_credentials');
    }
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

  // Sign in

  return (
    <>
      <BaseLayout>
        <div className="flex h-full w-full items-center justify-center">
          <div className="mx-auto w-full max-w-[410px]">
            <H1 className="mb-10 text-center">{t('welcome_back')}</H1>

            <SignInButtons providers={providers} />

            <HorizontalDivider>{t('or_sign_in_with_email')}</HorizontalDivider>

            <Card>
              <div className="my-5">
                <Title className="mb-2">{t('welcome_back')}</Title>
                <Subtitle>
                  {t('you_dont_have_an_account')}{' '}
                  <Link href={`/auth/signup`}>{t('create_an_account')}</Link>
                </Subtitle>
              </div>

              {error.length > 0 && <Alert color="danger">{t(error)}</Alert>}
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
                  <Alert color="danger">{t(errors?.email?.message)}</Alert>
                )}

                <div className="mt-4">
                  <InputText
                    type="password"
                    placeholder={t('password')}
                    floatingLabel={true}
                    className="w-full"
                    name="password"
                    register={register}
                    disabled={isSubmitting}
                  />
                </div>
                {errors?.password?.message && (
                  <Alert color="danger">{t(errors?.password?.message)}</Alert>
                )}

                <Link href={`/auth/forgot-password`} className="my-5 block">
                  {t('forgot_password')}
                </Link>

                <Button
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                  className="my-2 w-full justify-center"
                  rightIcon={<HiOutlineArrowSmRight />}
                >
                  {t('sign_in')}
                </Button>
              </form>

              <Link
                href="/"
                className="group mt-4 flex w-full items-center justify-center gap-2"
              >
                <div className="inline-block duration-300 group-hover:pr-1">
                  <HiOutlineArrowSmLeft />
                </div>
                {t('back_to_homepage')}
              </Link>
            </Card>
          </div>
        </div>
      </BaseLayout>
    </>
  );
}
