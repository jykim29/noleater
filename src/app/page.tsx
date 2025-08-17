import Image from 'next/image';
import Link from 'next/link';
import AnimatedBackground from '@/components/landing/AnimatedBackground';

export default async function Landing() {
  return (
    <AnimatedBackground>
      <main className="flex h-full w-full flex-col items-center justify-center gap-32">
        <Image
          src="https://placehold.jp/150x150.png"
          width={150}
          height={150}
          alt="놀잇터 로고"
        />
        <Link
          className="from-primary-100 to-secondary-60 border-primary-60 disabled:from-gray-40 disabled:to-gray-20 disabled:border-gray-40 text-button-md rounded-full border bg-linear-0 px-5 py-2 text-white disabled:cursor-not-allowed pointer-fine:hover:not-disabled:brightness-95"
          href="/login"
        >
          입장하기
        </Link>
      </main>
    </AnimatedBackground>
  );
}
