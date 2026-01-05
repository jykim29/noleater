import PostCardItem from './PostCardItem';

interface PostCardListProps {
  posts: {
    boardId: string | null;
    boardSlug: string | null;
    categoryId: string | null;
    categoryName: string | null;
    createdAt: string | null;
    id: string | null;
    imagePath: string | null;
    profileImage: string | null;
    title: string | null;
    userId: string | null;
    username: string | null;
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
