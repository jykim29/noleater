import { twMerge } from 'tailwind-merge';

interface GridItemProps {
  className?: string;
}

export default function GridItem({
  className: newClassName,
  children,
}: React.PropsWithChildren<GridItemProps>) {
  return (
    <div className={twMerge('bg-gray-40 aspect-square w-full', newClassName)}>
      {children}
    </div>
  );
}
