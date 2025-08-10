import FeedGridItem from './FeedGridItem';

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
