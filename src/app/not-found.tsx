import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h1>404 페이지를 찾을 수 없습니다!</h1>
      <Link href="/home">홈으로 가기</Link>
    </div>
  );
}
