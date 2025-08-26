'use client';

import Link from 'next/link';

export default function ErrorPage() {
  return (
    <div>
      <h1>에러가 발생했습니다.</h1>
      <Link className="text-positive underline" href="/">
        홈으로 가기
      </Link>
    </div>
  );
}
