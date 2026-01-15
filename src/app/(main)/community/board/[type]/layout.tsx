import { notFound } from 'next/navigation';
import { getBoardMetadata } from '@/api/board/getBoardConfig';
import { createClient } from '@/libs/supabase/server';

export default async function BoardLayout({
  params,
  children,
}: {
  params: Promise<{ type: string }>;
  children: React.ReactNode;
}) {
  const { type } = await params;
  const supabase = await createClient();
  const boardMetadata = await getBoardMetadata(supabase, type);
  if (!boardMetadata) notFound();
  return <>{children}</>;
}
