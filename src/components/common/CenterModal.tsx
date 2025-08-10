export default function CenterModal({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="absolute top-1/2 left-1/2 w-[90%] min-w-xs -translate-1/2 rounded-2xl bg-white px-3 py-4">
      {children}
    </div>
  );
}
