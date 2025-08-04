import { twMerge } from 'tailwind-merge';
import { ProfileImage } from '../common';
import formatRelativeTime from '@/utils/formatRelativeTime';

interface CommentItemProps {
  isMe: boolean;
  data: {
    profile: {
      id: string;
      imgSrc?: string;
      username: string;
    };
    content: string;
    createdAt: string;
  };
}

export default function CommentItem({
  isMe,
  data: {
    profile: { imgSrc, username },
    content,
    createdAt,
  },
}: CommentItemProps) {
  return (
    <div className={twMerge('flex w-full gap-2', isMe && 'flex-row-reverse')}>
      <ProfileImage
        className="mt-3 h-10 w-10"
        src={imgSrc}
        username={username}
      />
      <div
        className={twMerge(
          'flex w-full flex-col gap-1',
          isMe ? 'items-end' : 'items-start'
        )}
      >
        <div
          className={twMerge(
            'text-gray-60 flex items-center gap-2',
            isMe && 'flex-row-reverse'
          )}
        >
          <span className={twMerge(isMe ? 'text-primary-100' : 'text-black')}>
            {isMe ? '나' : username}
          </span>
          <span>▪</span>
          <time className="text-body-sm" dateTime={createdAt}>
            {formatRelativeTime(createdAt)}
          </time>
        </div>
        <p
          className={twMerge(
            'rounded-lg px-2 py-2',
            isMe ? 'bg-tertiary-30' : 'bg-gray-20'
          )}
        >
          {content}
        </p>
      </div>
    </div>
  );
}
