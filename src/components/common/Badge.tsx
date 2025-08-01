import { twMerge } from 'tailwind-merge';

interface BadgeProps<T extends React.ElementType> {
  as?: T;
  className?: string;
}

export default function Badge<T extends React.ElementType = 'span'>({
  as,
  className: newClassName = '',
  children,
  ...rest
}: BadgeProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof BadgeProps<T>>) {
  const Component = as || 'span';
  return (
    <Component
      className={twMerge(
        'text-caption-xs! rounded-full border border-black px-2 py-1.5',
        newClassName
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
