import FeedCard from './FeedCard';
import { ViewRow } from '@/types/supabase/db.types';

export default function FeedList({
  feeds,
}: {
  feeds: ViewRow<'v_feed_detail_list'>[];
}) {
  return (
    <div className="flex flex-col gap-8">
      {feeds.map((feed) => (
        <FeedCard key={feed.id} data={feed} />
      ))}
    </div>
  );
}
