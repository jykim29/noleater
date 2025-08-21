'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  BottomSheet,
  Button,
  Checkbox,
  Overlay,
  PasswordInput,
  TextInput,
} from '../common';
import SNSLoginButton from './SNSLoginButton';
import ErrorMessageBox from './ErrorMessageBox';
import { register } from '@/app/(auth)/register/actions';

export default function RegisterForm() {
  const [state, registerAction, isPending] = useActionState(register, {});
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      alert('회원가입이 완료되었습니다. 환영합니다!');
      router.push('/home');
    }
  }, [state]);
  return (
    <Overlay>
      <BottomSheet>
        <form className="flex flex-col gap-4">
          <fieldset className="flex flex-col gap-2">
            <legend className="sr-only">가입계정 정보</legend>
            {state.success === false && (
              <ErrorMessageBox>❗ {state.error?.message}</ErrorMessageBox>
            )}
            <TextInput
              className="rounded-md"
              type="email"
              id="email"
              name="email"
              label="이메일 주소"
              placeholder="example@noleater.dev"
              autoComplete="off"
              required
              defaultValue={state.data?.email || ''}
            />
            <PasswordInput
              className="rounded-md"
              id="password"
              name="password"
              label="비밀번호"
              placeholder="대/소문자, 숫자, 특수문자 포함 8 ~ 20자"
              required
              defaultValue={state.data?.password || ''}
            />
            <PasswordInput
              className="rounded-md"
              id="passwordConfirm"
              name="passwordConfirm"
              label="비밀번호 확인"
              placeholder="비밀번호를 다시 입력해주세요."
              required
              defaultValue={state.data?.passwordConfirm || ''}
            />
          </fieldset>

          <fieldset className="flex items-center gap-3">
            <legend className="sr-only">약관 동의</legend>
            <Checkbox
              id="agreement"
              name="agreement"
              required
              defaultChecked={state.data?.agreement}
            >
              회원가입 약관에 동의
            </Checkbox>
            <button
              className="text-body-sm text-positive underline"
              type="button"
            >
              약관 보기
            </button>
          </fieldset>
          <Button
            type="submit"
            disabled={isPending}
            formAction={registerAction}
          >
            {isPending ? '처리중' : '회원가입'}
          </Button>
        </form>
        <div className="text-body-sm text-gray-60 my-2 flex items-center gap-2">
          <p>이미 놀잇터 회원이신가요?</p>
          <Link className="text-positive underline" href="/login">
            로그인하기
          </Link>
        </div>
        <div
          className="bg-gray-60 before:text-body-sm before:text-gray-60 relative my-7 h-[1px] w-full before:absolute before:top-1/2 before:left-1/2 before:-translate-1/2 before:bg-white before:px-3 before:content-['또는']"
          role="separator"
          aria-label="또는"
        ></div>
        <div className="flex flex-col items-center justify-center gap-2">
          <SNSLoginButton provider="google" />
          <SNSLoginButton provider="kakao" />
        </div>
      </BottomSheet>
    </Overlay>
  );
}
