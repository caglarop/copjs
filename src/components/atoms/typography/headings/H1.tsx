'use client';

import classNames from 'classnames';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function H1({ children, className }: Props) {
  return (
    <h1 className={classNames('text-3xl font-bold', className)}>{children}</h1>
  );
}
