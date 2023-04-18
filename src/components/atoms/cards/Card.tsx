'use client';

import classNames from 'classnames';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className }: Props) {
  return (
    <div
      className={classNames(
        'bg-card text-ebony dark:bg-card-dark dark:text-white p-8 rounded-xl shadow-lg',
        className
      )}
    >
      {children}
    </div>
  );
}
