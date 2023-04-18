'use client';

import classNames from 'classnames';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Subtitle({ children, className }: Props) {
  return (
    <div
      className={classNames(
        'text-gray dark:text-gray-300 text-base font-regular',
        className
      )}
    >
      {children}
    </div>
  );
}
