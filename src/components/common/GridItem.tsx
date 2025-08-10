import { twMerge } from 'tailwind-merge';

interface GridItemProps {
  className?: string;
}

/**
 * Renders a square grid item container with default styling, allowing additional Tailwind CSS classes and custom content.
 *
 * @param className - Additional Tailwind CSS classes to merge with the default styles
 * @returns A `div` element styled as a square grid item containing the provided children
 */
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
