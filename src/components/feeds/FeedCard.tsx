import { IconWithCount } from '../shared';
import FeedCarousel from './FeedCarousel';
import FeedHeader from './FeedHeader';
import { Badge, ExpandableParagraph } from '../common';
import { formatRelativeTime } from '@/utils';
import { ViewRow } from '@/types/supabase/db.types';

export default function FeedCard({
  data,
}: {
  data: ViewRow<'v_feed_detail_list'>;
}) {
  return (
    <div className="flex flex-col gap-2">
      <FeedHeader
        profile={{
          username: data.username ?? '알 수 없음',
          imgSrc: data.profileImage ?? '/assets/images/default_profile.jpg',
          isFollowed: true,
        }}
      />

      <FeedCarousel paths={data.imagePaths} />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <IconWithCount
            icon={{ src: '/assets/icons/eyes.svg', alt: '조회수' }}
          >
            <span className="text-gray-80">153</span>
          </IconWithCount>
          <IconWithCount
            icon={{ src: '/assets/icons/comment.svg', alt: '댓글수' }}
          >
            <span className="text-gray-80">2</span>
          </IconWithCount>
        </div>
        <span className="text-caption-xs text-gray-60">
          {data.createdAt ? formatRelativeTime(data.createdAt) : '알 수 없음'}
        </span>
      </div>

      <ExpandableParagraph charLimit={50}>
        {data.description ?? ''}
      </ExpandableParagraph>

      <div className="flex items-center gap-1">
        {data.tags &&
          data.tags.map((tag) => (
            <Badge
              key={tag}
              className="bg-primary-100 border-none text-white"
            >{`#${tag}`}</Badge>
          ))}
      </div>
    </div>
  );
}
