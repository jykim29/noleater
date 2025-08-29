import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h1>404 페이지를 찾을 수 없습니다!</h1>
      <Link href={ROUTES.HOME}>홈으로 가기</Link>
    </div>
  );
}
