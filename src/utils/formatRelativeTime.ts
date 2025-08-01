export default function formatRelativeTime(createdAt: number | string): string {
  if (
    typeof createdAt === 'string' &&
    Number.isNaN(new Date(createdAt).getTime())
  )
    throw new Error(
      'formatRelativeTime함수가 받는 문자열의 형식이 잘못되었습니다.'
    );
  const milliSeconds = new Date().getTime() - new Date(createdAt).getTime();
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  const years = days / 365;
  return `${Math.floor(years)}년 전`;
}
