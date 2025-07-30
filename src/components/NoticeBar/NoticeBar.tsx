'use client';

import Link from 'next/link';
import Image from 'next/image';
import VerticalMarquee from '@/components/common/Marquee/VerticalMarquee';
import mockData from '@/data/notice.json';

export default function NoticeBar() {
  return (
    <div className="bg-tertiary-60 flex h-8 items-center gap-3 rounded-xl px-3">
      <Image
        src="/assets/icons/speaker_phone.svg"
        width={16}
        height={16}
        alt="공지사항"
      />
      <VerticalMarquee
        width="100%"
        height="36px"
        duration={2000}
        direction="upward"
      >
        {mockData.data.map(({ id, title, url, createdAt }) => (
          <VerticalMarquee.Item key={id}>
            <div className="flex w-full items-center justify-between">
              <Link
                className="pointer-fine:hover:text-focus pointer-fine:hover:underline"
                href={url}
              >
                {title}
              </Link>
              <span className="text-gray-80">
                {new Date(createdAt).toLocaleDateString()}
              </span>
            </div>
          </VerticalMarquee.Item>
        ))}
      </VerticalMarquee>
    </div>
  );
}
