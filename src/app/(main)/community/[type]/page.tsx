import { BoardPage } from '@/components/pages';
import { notFound } from 'next/navigation';

const allowedTypeList = ['freeboard', 'myrecipe', 'discussion'];

export default async function Board({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  if (!allowedTypeList.includes(type)) notFound();

  return (
    <>
      <BoardPage />
    </>
  );
}
