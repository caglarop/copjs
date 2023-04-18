'use client';

import classNames from 'classnames';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Title({ children, className }: Props) {
  return (
    <div className={classNames('text-xl font-medium', className)}>
      {children}
    </div>
  );
}
