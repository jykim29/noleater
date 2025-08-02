'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  label?: string;
  id: string;
  name: string;
  className?: string;
}

export default function PasswordInput({
  label = '',
  id,
  name,
  className: newClassName = '',
  ...rest
}: InputProps) {
  const [isShow, setIsShow] = useState(false);
  const handleClickToggle = () => setIsShow((prev) => !prev);
  return (
    <label
      className="relative flex w-full flex-col justify-center gap-1"
      htmlFor={id}
    >
      <input
        className={twMerge(
          'peer bg-gray-20 border-gray-40 focus-within:outline-focus w-full border py-2 pr-12 pl-4 not-placeholder-shown:bg-white focus-within:bg-white',
          label && 'mt-[26px]',
          newClassName
        )}
        type={isShow ? 'text' : 'password'}
        id={id}
        name={name}
        {...rest}
      />
      {label && (
        <span className="peer-focus-within:text-focus text-body-sm absolute top-0 left-0 peer-focus-within:font-semibold">
          {label}
        </span>
      )}
      <button
        className={twMerge(
          'absolute top-1/2 right-3 h-[18px] w-5 -translate-y-1/2 bg-[url(/assets/icons/eye_show.svg)] bg-center bg-no-repeat',
          label && 'top-12',
          isShow && 'bg-[url(/assets/icons/eye_hide.svg)]'
        )}
        type="button"
        onMouseDown={(e) => e.preventDefault()} // 버튼 클릭 시, input 요소 focus-out 방지 이벤트
        onClick={handleClickToggle}
      >
        <span className="sr-only">비밀번호 표시</span>
      </button>
    </label>
  );
}
