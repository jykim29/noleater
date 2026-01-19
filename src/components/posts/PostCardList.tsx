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
      {posts.length > 0 ? (
        posts.map((item, idx) => {
          return (
            <PostCardItem
              key={item.id ?? `${item.boardSlug ?? 'post'}-${idx}`}
              postData={item}
            />
          );
        })
      ) : (
        <p className="text-heading-lg m-5 text-center text-gray-600">
          표시할 내용이 없습니다.
        </p>
      )}
    </div>
  );
}
