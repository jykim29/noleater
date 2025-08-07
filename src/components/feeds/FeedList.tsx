import FeedItem from './FeedItem';

export default function FeedList() {
  return (
    <div className="flex flex-col gap-8">
      <FeedItem />
      <FeedItem />
      <FeedItem />
      <FeedItem />
    </div>
  );
}
