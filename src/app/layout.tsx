import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import { Footer } from '@/components/layout';
import './globals.css';

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '놀잇터::잇터들을 위한 놀이터',
  description: '잇터들을 위한 놀이터 놀잇터입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${notoSansKR.className} bg-gray-40 min-h-screen w-full antialiased`}
      >
        <div className="relative mx-auto min-h-screen w-full max-w-md min-w-xs bg-white">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
