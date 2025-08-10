import formatRelativeTime from '@/utils/formatRelativeTime';
import { IconWithCount } from '../shared';
import FeedCarousel from './FeedCarousel';
import FeedHeader from './FeedHeader';
import { Badge, ExpandableParagraph } from '../common';

const dummyText =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque recusandae beatae expedita. Porro explicabo labore voluptates incidunt nihil doloremque obcaecati suscipit corporis expedita amet, minima, cumque, ipsam quo nobis aspernatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque recusandae beatae expedita. Porro explicabo labore voluptates incidunt nihil doloremque obcaecati suscipit corporis expedita amet, minima, cumque, ipsam quo nobis aspernatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque recusandae beatae expedita. Porro explicabo labore voluptates incidunt nihil doloremque obcaecati suscipit corporis expedita amet, minima, cumque, ipsam quo nobis aspernatur! Lorem ';

/**
 * Renders a feed item displaying a user profile, carousel, view and comment counts, timestamp, expandable post content, and tags.
 *
 * Composes several UI components to present a static example of a social feed post with hardcoded data.
 *
 * @returns The feed item React element.
 */
export default function FeedItem() {
  return (
    <div className="flex flex-col gap-2">
      <FeedHeader
        profile={{
          username: '푸른바다',
          imgSrc: 'https://picsum.photos/80/80',
          isFollowed: true,
        }}
      />

      <FeedCarousel />

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
          {formatRelativeTime('2025-08-01T17:46:12')}
        </span>
      </div>

      <ExpandableParagraph charLimit={50}>{dummyText}</ExpandableParagraph>

      <div className="flex items-center gap-1">
        <Badge className="bg-primary-100 border-none text-white">#태그1</Badge>
        <Badge className="bg-primary-100 border-none text-white">#태그2</Badge>
        <Badge className="bg-primary-100 border-none text-white">#태그3</Badge>
      </div>
    </div>
  );
}
