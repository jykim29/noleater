import { twMerge } from 'tailwind-merge';

interface AnimatedBackgroundProps {
  className?: string;
}

export default function AnimatedBackground({
  className: newClassName,
  children,
}: React.PropsWithChildren<AnimatedBackgroundProps>) {
  return (
    <div
      className={twMerge(
        'bg-secondary-30 before:animate-move-grid relative z-0 h-dvh w-full before:absolute before:-z-[1] before:h-dvh before:w-full before:bg-[url(/assets/images/foods_background.png)] before:bg-size-[200px_200px] before:bg-repeat before:opacity-60',
        newClassName
      )}
    >
      {children}
    </div>
  );
}
