import CommentItem from './CommentItem';

interface CommentListProps {
  data: {
    profile: {
      id: string;
      imgSrc: string;
      username: string;
    };
    id: string;
    content: string;
    createdAt: string;
  }[];
}

export default function CommentList({ data }: CommentListProps) {
  return (
    <div className="flex flex-col gap-3">
      {data.map((item) => {
        return (
          <CommentItem
            key={item.id}
            data={item}
            isMe={item.profile.id === '08890c6e-8564-40ca-bc14-01c1f08c8847'}
          />
        );
      })}
    </div>
  );
}
