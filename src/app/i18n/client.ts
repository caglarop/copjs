'use client';

import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { useParams } from 'next/navigation';
import {
  initReactI18next,
  useTranslation as useTranslationOrg
} from 'react-i18next';

import { getOptions } from '@/app/i18n/settings';

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: any, namespace: any) =>
        import(`./locales/${language}/${namespace}.json`)
    )
  )
  .init(getOptions());

export function useTranslation(ns: any, options = {}) {
  const params = useParams();

  if (i18next.resolvedLanguage !== params.lng) {
    i18next.changeLanguage(params.lng);
  }

  // @ts-ignore
  return useTranslationOrg(ns, options) as any;
}
