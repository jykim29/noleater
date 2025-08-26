'use client';

import { Button } from '@/components/common';
import { Content, Header } from '@/components/layout';
import { createClient } from '@/libs/supabase/client';

export default function SettingsPage() {
  const supabase = createClient();

  const handleClickSignOutButton = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      alert('로그아웃 되었습니다. 초기 페이지로 이동합니다.');
      return (window.location.href = '/');
    }
    return alert('로그아웃 실패. 재시도 부탁');
  };

  return (
    <>
      <Header
        left={{
          href: '/profile/me',
          src: '/assets/icons/arrow_left.svg',
          alt: '뒤로가기',
        }}
      >
        <h1 className="text-heading-xl">설정</h1>
      </Header>
      <Content>
        <ul className="flex flex-col justify-center">
          <li className="border-gray-40 pointer-fine:hover:bg-gray-20 border-b">
            <Button
              className="w-full border-none bg-transparent text-left text-black"
              type="button"
              onClick={handleClickSignOutButton}
            >
              로그아웃
            </Button>
          </li>
        </ul>
      </Content>
    </>
  );
}
