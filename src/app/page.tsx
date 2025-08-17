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
          className="border-primary-60 text-button-md bg-primary-gradient rounded-full border px-5 py-2 text-white pointer-fine:hover:brightness-95"
          href="/login"
        >
          입장하기
        </Link>
      </main>
    </AnimatedBackground>
  );
}
