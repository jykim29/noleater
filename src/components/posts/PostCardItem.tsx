import Image from 'next/image';
import Link from 'next/link';
import IconWithCount from '@/components/shared/IconWithCount';
import { formatRelativeTime } from '@/utils';

interface PostCardItemProps {
  postData: {
    id: number;
    category: string;
    author: {
      name: string;
    };
    title: string;
    images: {
      src: string;
    }[];
    views: number;
    comments: number;
    createdAt: string;
  };
}

export default function PostCardItem({
  postData: {
    id,
    category,
    author: { name },
    title,
    images,
    createdAt,
    views,
    comments,
  },
}: PostCardItemProps) {
  return (
    <Link href={`/posts/${id}`}>
      <div className="border-gray-40 flex h-32 w-full items-center gap-4 rounded-lg border px-4 py-4">
        <div className="text-body-sm flex h-full w-full flex-col justify-between">
          <span className="text-gray-60">
            <span className="text-primary-100 mr-3">{category}</span>
            {name} ▪ {formatRelativeTime(createdAt)}
          </span>
          <p className="text-body-md">{title}</p>
          <div className="flex items-center gap-2">
            <IconWithCount
              icon={{ src: '/assets/icons/eyes.svg', alt: '조회수' }}
            >
              <span className="text-gray-80">{views}</span>
            </IconWithCount>
            <IconWithCount
              icon={{ src: '/assets/icons/comment.svg', alt: '댓글수' }}
            >
              <span className="text-gray-80">{comments}</span>
            </IconWithCount>
          </div>
        </div>
        <div className="relative aspect-square w-24 overflow-hidden rounded-sm">
          <Image
            className="object-cover"
            src={`${images[0].src}?random=${id}`}
            fill
            alt=""
          />
        </div>
      </div>
    </Link>
  );
}
