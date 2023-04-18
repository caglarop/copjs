'use client';

import classNames from 'classnames';

type Props = {
  children: React.ReactNode;
  className?: string;
  color: 'danger' | 'success' | 'warning' | 'info' | 'primary' | 'secondary';
};

export default function Alert({ children, className, color }: Props) {
  const colorVariants = {
    danger: 'bg-red-100 text-red-900',
    success: 'bg-green-100 text-green-900',
    warning: 'bg-yellow-100 text-yellow-900',
    info: 'bg-blue-100 text-blue-900',
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-ebony'
  };

  return (
    <div
      className={classNames(
        'my-2 p-4 rounded-xl',
        colorVariants[color],
        className
      )}
    >
      {children}
    </div>
  );
}
