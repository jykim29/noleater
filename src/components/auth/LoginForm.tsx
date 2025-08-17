import Link from 'next/link';
import {
  BottomSheet,
  Button,
  Overlay,
  PasswordInput,
  TextInput,
} from '../common';
import SNSLoginButton from './SNSLoginButton';

export default function LoginForm() {
  return (
    <Overlay>
      <BottomSheet>
        <form className="flex flex-col gap-4" action="">
          <TextInput
            className="rounded-md"
            id="email"
            name="email"
            label="이메일 주소"
            placeholder="example@noleater.dev"
          />
          <PasswordInput
            className="rounded-md"
            id="password"
            name="password"
            label="비밀번호"
            placeholder="8-20자 이내"
          />
          <Button type="submit">로그인</Button>
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
