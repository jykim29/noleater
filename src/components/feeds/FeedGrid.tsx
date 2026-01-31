import FeedGridItem from './FeedGridItem';
import { ViewRow } from '@/types/supabase/db.types';

export default function FeedGrid({
  feeds,
}: {
  feeds: ViewRow<'v_feed_grid_list'>[];
}) {
  return (
    <div className="grid grid-cols-3 gap-1">
      {feeds.map((feed) => (
        <FeedGridItem key={feed.id} data={feed} />
      ))}
    </div>
  );
}
