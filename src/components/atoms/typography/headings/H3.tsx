'use client';

import classNames from 'classnames';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function H3({ children, className }: Props) {
  return (
    <h3 className={classNames('text-xl font-bold', className)}>{children}</h3>
  );
}
