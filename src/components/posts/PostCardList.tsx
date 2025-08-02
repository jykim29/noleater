import PostCardItem from './PostCardItem';

interface PostCardListProps {
  posts: {
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
    href: string;
    createdAt: string;
  }[];
}

export default function PostCardList({ posts }: PostCardListProps) {
  return (
    <div className="flex flex-col gap-2">
      {posts.map((item) => {
        return <PostCardItem key={item.id} postData={item} />;
      })}
    </div>
  );
}
