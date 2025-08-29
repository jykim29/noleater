import { twMerge } from 'tailwind-merge';

export default function ErrorMessageBox({
  className: newClassName,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={twMerge(
        'text-body-sm! text-negative border-negative bg-tertiary-30 self-start rounded-sm border p-0.5',
        newClassName
      )}
    >
      {children}
    </p>
  );
}
