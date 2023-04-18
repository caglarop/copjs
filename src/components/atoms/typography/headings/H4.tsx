'use client';

import classNames from 'classnames';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function H4({ children, className }: Props) {
  return (
    <h4 className={classNames('text-lg font-bold', className)}>{children}</h4>
  );
}
