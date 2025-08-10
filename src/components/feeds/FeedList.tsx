import FeedItem from './FeedItem';

/**
 * Renders a vertical list of four feed items within a flex column container.
 */
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
