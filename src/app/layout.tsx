import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import { AuthContextProvider, ModalContextProvider } from '@/contexts';
import getUserProfile from '@/api/auth/getUserProfile';
import { AuthStoreState } from '@/types';
import './globals.css';

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '놀잇터::잇터들을 위한 놀이터',
  description: '잇터들을 위한 놀이터 놀잇터입니다.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const result = await getUserProfile();
  const initialValue = result.success
    ? { user: result.data, isLoggedIn: true }
    : undefined;
  return (
    <html lang="ko">
      <body
        className={`${notoSansKR.className} bg-gray-40 min-h-dvh w-full antialiased`}
      >
        <div className="mobile-width relative mx-auto min-h-dvh w-full bg-white">
          <AuthContextProvider initialValue={initialValue}>
            <ModalContextProvider>{children}</ModalContextProvider>
          </AuthContextProvider>
        </div>
        <div id="modal"></div>
      </body>
    </html>
  );
}
