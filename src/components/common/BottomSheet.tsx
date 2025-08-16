'use client';

export default function BottomSheet({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="absolute bottom-0 w-full rounded-t-2xl bg-white shadow-lg">
      <div className="flex h-6 w-full items-center justify-center">
        <span className="bg-gray-40 h-1 w-14 rounded-full"></span>
      </div>
      <div className="px-12 pt-4 pb-7">{children}</div>
    </div>
  );
}
