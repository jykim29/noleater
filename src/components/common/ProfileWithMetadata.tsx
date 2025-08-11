import ProfileImage from './ProfileImage';
import IconWithCount from '../shared/IconWithCount';

interface ProfileSetProps {
  profile: {
    imgSrc: string;
    username: string;
  };
  metadata?: {
    views?: number;
    comments?: number;
    like?: number;
  };
}

export default function ProfileWithMetadata({
  profile: { imgSrc, username },
  metadata,
}: ProfileSetProps) {
  return (
    <div className="flex items-center gap-3">
      <ProfileImage src={imgSrc} username={username} />
      <div>
        <span>{username}</span>
        {metadata && (
          <div className="flex items-center gap-2">
            {metadata.views && (
              <IconWithCount
                icon={{ src: '/assets/icons/eyes.svg', alt: '조회수' }}
              >
                <span className="text-gray-80">{metadata.views}</span>
              </IconWithCount>
            )}
            {metadata.comments && (
              <IconWithCount
                icon={{ src: '/assets/icons/comment.svg', alt: '댓글수' }}
              >
                <span className="text-gray-80">{metadata.comments}</span>
              </IconWithCount>
            )}
            {metadata.like && (
              <IconWithCount
                icon={{ src: '/assets/icons/thumbs_up.svg', alt: '좋아요 수' }}
              >
                <span className="text-gray-80">{metadata.like}</span>
              </IconWithCount>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
