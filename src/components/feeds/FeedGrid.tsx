import FeedGridItem from './FeedGridItem';

/**
 * Renders a grid of 128 `FeedGridItem` components, each displaying a unique random image.
 *
 * Each item in the grid is assigned a unique `id` and an image sourced from `picsum.photos` with the index as a query parameter to ensure image variation.
 *
 * @returns A React element containing the grid of feed items.
 */
export default function FeedGrid() {
  return (
    <div className="grid grid-cols-3 gap-1">
      {[...Array(128)].map((_, idx) => (
        <FeedGridItem
          key={idx}
          id={idx}
          imgSrc={`https://picsum.photos/300/200?random=${idx}`}
        />
      ))}
    </div>
  );
}
