import { AuthErrorCode } from '@/types/api';

interface ErrorCodes {
  auth: Partial<Record<AuthErrorCode, string>>;
}

export const errorMessages: ErrorCodes = {
  auth: {
    email_address_invalid: '유효하지않은 이메일 주소입니다.',
    email_exists: '가입된 이메일 주소가 이미 존재합니다.',
    email_not_confirmed: '이메일 주소가 확인되지 않았습니다.',
    invalid_credentials: '이메일 주소 또는 비밀번호가 올바르지 않습니다.',
    signup_disabled: '현재 회원가입이 불가능한 상태입니다.',
    user_already_exists: '이미 가입된 정보가 존재합니다.',
    user_not_found: '유저 정보를 찾을 수 없습니다.',
    not_checked_agreement: '약관에 동의하지 않았습니다.',
    not_match_password: '입력한 두 비밀번호가 일치하지 않습니다.',
    incorrect_password_pattern: '비밀번호 규칙에 맞지 않습니다.',
    invalid_email_pattern: '이메일 주소 형식이 올바르지 않습니다.',
  },
};
