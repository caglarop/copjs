'use client';

import classNames from 'classnames';
import React from 'react';

import style from '@/components/atoms/inputs/InputText.module.css';

type Props = {
  type?: 'date' | 'email' | 'number' | 'password' | 'tel' | 'text' | 'url';
  color?: 'primary';
  placeholder?: string;
  changeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  /*
  leftIcon?: React.ReactNode | null; // The left icon
  rightIcon?: React.ReactNode | null; // The right icon
  */
  floatingLabel?: boolean; // Whether the label should float
  className?: string;

  name?: string;
  register?: any;
};

export default function InputText({
  type = 'text',
  color = 'primary',
  autoFocus = false,
  placeholder,
  changeHandler,
  disabled,
  readOnly,
  floatingLabel,
  className,
  name,
  register
}: Props) {
  const colorVariants = {
    primary:
      'bg-transparent text-ebony ring-1 ring-secondary hover:ring-2 hover:ring-primary focus:ring-2 focus:ring-primary dark:ring-gray-600 dark:text-white dark:hover:ring-2 dark:hoverring-primary-300 dark:focus:ring-2 dark:focus:ring-primary-300 placeholder-gray outline-none'
  };

  return (
    <>
      <div className={classNames('group relative z-0')}>
        <input
          {...register(name)}
          type={type}
          autoFocus={autoFocus}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            // If the input is not read only, disabled or the change handler is undefined, call the change handler
            if (!readOnly && !disabled && changeHandler !== undefined) {
              changeHandler(e);
            }
          }}
          onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
            // If the input is not read only, disabled or the change handler is undefined, call the change handler
            if (!readOnly && !disabled && changeHandler !== undefined) {
              changeHandler(e as any);
            }
          }}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={floatingLabel ? ' ' : placeholder}
          className={classNames(
            'peer appearance-none h-[70px] w-full',
            'flex items-center gap-2',
            'transition duration-200 font-regular text-base rounded-xl',
            floatingLabel ? 'pt-7 pb-2 px-4' : 'py-4 px-4',
            colorVariants[color],
            disabled && 'opacity-70 cursor-not-allowed',
            className,
            style.input
          )}
        />
        {floatingLabel && (
          <label
            htmlFor={name}
            onClick={() => {
              //
            }}
            className={classNames(
              'absolute transform duration-300 px-4',
              'cursor-text select-none',
              'top-6 -z-10 origin-[0] -translate-y-4',
              'peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4',
              'text-gray dark:text-white'
            )}
          >
            {placeholder}
          </label>
        )}
      </div>
    </>
  );
}
