'use client';

import { useActionState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BottomSheet,
  Button,
  Overlay,
  PasswordInput,
  TextInput,
} from '../common';
import SNSLoginButton from './SNSLoginButton';
import ErrorMessageBox from './ErrorMessageBox';
import { login } from '@/app/(auth)/login/actions';
import { useAuthStore } from '@/contexts';
import { LoginActionState } from '@/types/actionState.interfaces';

const initialActionState: LoginActionState = {
  success: false,
  user: null,
  error: null,
  formData: null,
};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState<
    LoginActionState,
    FormData
  >(login, initialActionState);
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (state.success && state.user) {
      setUser({ user: { ...state.user }, isLoggedIn: true });
      router.push('/home');
    }
  }, [state]);

  return (
    <Overlay>
      <BottomSheet>
        <form className="flex flex-col gap-4" action={formAction}>
          {!state.success && state.error && (
            <ErrorMessageBox>❗ {state.error?.message}</ErrorMessageBox>
          )}
          <TextInput
            className="rounded-md"
            type="email"
            id="email"
            name="email"
            label="이메일 주소"
            placeholder="example@noleater.dev"
            required
            autoComplete="off"
            defaultValue={state.formData?.email}
          />
          <PasswordInput
            className="rounded-md"
            id="password"
            name="password"
            label="비밀번호"
            placeholder="대/소문자, 숫자, 특수문자 포함 8 ~ 20자"
            required
            defaultValue={state.formData?.password}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? '로그인 중' : '로그인'}
          </Button>
        </form>
        <div className="text-body-sm text-gray-60 my-2 flex items-center gap-2">
          <p>아직 회원이 아니신가요?</p>
          <Link className="text-positive underline" href="/register">
            가입하기
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
