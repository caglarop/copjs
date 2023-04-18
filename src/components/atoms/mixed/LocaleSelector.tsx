'use client';

import i18next from 'i18next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { languages } from '@/app/i18n/settings';

export default function LocaleSelector() {
  const [langs, setLangs] = useState(languages);

  useEffect(() => {
    setLangs(languages.filter((l: string) => i18next.language !== l));
  }, [i18next.language]);

  return (
    <>
      {langs.map((l: string, i: number) => {
        return (
          <Link
            key={i}
            href={`/${l}`}
            className="dark:bg-ebony-200 inline-block rounded bg-slate-200 px-2 py-1"
          >
            {l}
          </Link>
        );
      })}
    </>
  );
}
