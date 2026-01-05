import Image from 'next/image';
import Link from 'next/link';
import IconWithCount from '@/components/shared/IconWithCount';
import { formatRelativeTime } from '@/utils';
import { getPublicURL } from '@/api/storage/getPublicURL';

interface PostCardItemProps {
  postData: {
    boardId: string | null;
    boardSlug: string | null;
    categoryId: string | null;
    categoryName: string | null;
    createdAt: string | null;
    id: string | null;
    imagePath: string | null;
    profileImage: string | null;
    title: string | null;
    userId: string | null;
    username: string | null;
  };
}

export default function PostCardItem({
  postData: {
    id,
    boardSlug,
    categoryName,
    title,
    imagePath,
    username,
    createdAt,
  },
}: PostCardItemProps) {
  return (
    <Link href={`${boardSlug}/${id}`}>
      <div className="border-gray-40 flex h-32 w-full items-center gap-4 rounded-lg border px-4 py-4">
        <div className="text-body-sm flex h-full w-full flex-col justify-between">
          <span className="text-gray-60">
            <span className="text-primary-100 mr-3">{categoryName}</span>
            {username} ▪ {formatRelativeTime(createdAt as string)}
          </span>
          <p className="text-body-md">{title}</p>
          <div className="flex items-center gap-2">
            <IconWithCount
              icon={{ src: '/assets/icons/eyes.svg', alt: '조회수' }}
            >
              <span className="text-gray-80">9999</span>
            </IconWithCount>
            <IconWithCount
              icon={{ src: '/assets/icons/comment.svg', alt: '댓글수' }}
            >
              <span className="text-gray-80">9999</span>
            </IconWithCount>
          </div>
        </div>
        <div className="relative aspect-square w-24 overflow-hidden rounded-sm">
          {imagePath && (
            <Image
              className="object-cover"
              src={getPublicURL(imagePath)}
              fill
              alt=""
            />
          )}
        </div>
      </div>
    </Link>
  );
}
