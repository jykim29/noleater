'use client';

import { twMerge } from 'tailwind-merge';

interface SNSLoginButtonProps {
  provider: 'google' | 'kakao';
  onLogin?: () => void;
}

const snsButtonVariant = {
  google: {
    style:
      'bg-white text-gray-80 [&>span]:before:bg-[url(/assets/icons/logo_google.svg)]',
    label: 'Google',
  },
  kakao: {
    style:
      'bg-kakao text-black [&>span]:before:bg-[url(/assets/icons/logo_kakao.svg)]',
    label: '카카오',
  },
  common:
    'min-w-[230px] h-10 rounded-lg border border-gray-20 px-3 shadow-md pointer-fine:hover:not-disabled:brightness-95',
};

export default function SNSLoginButton({
  provider,
  onLogin,
}: SNSLoginButtonProps) {
  const handleClickLogin = () => {
    // login 함수
    if (onLogin && typeof onLogin === 'function') onLogin();
  };

  return (
    <button
      className={twMerge(
        snsButtonVariant.common,
        snsButtonVariant[provider].style
      )}
      type="button"
      onClick={handleClickLogin}
    >
      <span className="relative pl-8 before:absolute before:top-1/2 before:left-0 before:inline-block before:h-5 before:w-5 before:-translate-y-1/2 before:bg-no-repeat">
        {snsButtonVariant[provider].label} 계정으로 로그인
      </span>
    </button>
  );
}
