'use client';

import classNames from 'classnames';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function H2({ children, className }: Props) {
  return (
    <h2 className={classNames('text-2xl font-bold', className)}>{children}</h2>
  );
}
