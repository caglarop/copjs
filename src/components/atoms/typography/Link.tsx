'use client';

import classNames from 'classnames';
import NextLink from 'next/link';

type Props = {
  children: React.ReactNode;
  className?: string;

  href: string;
  title?: string;
  target?: string;
};

export default function Link({
  children,
  className,
  href,
  title,
  target
}: Props) {
  return (
    <NextLink
      href={href}
      title={title}
      target={target}
      className={classNames(
        'transition duration-300 font-medium text-primary dark:text-primary-300 hover:underline',
        className
      )}
    >
      {children}
    </NextLink>
  );
}
