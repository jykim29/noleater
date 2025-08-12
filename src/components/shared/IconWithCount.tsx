import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface IconWithCountProps extends React.PropsWithChildren {
  icon: { src: string; alt: string; size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' };
}

const sizeVariant = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-10 h-10',
};

export default function IconWithCount({ icon, children }: IconWithCountProps) {
  return (
    <div className="flex items-center gap-1">
      <div
        className={twMerge(
          'relative',
          icon.size ? sizeVariant[icon.size] : sizeVariant.sm
        )}
      >
        <Image
          className="object-contain"
          src={icon.src}
          fill
          sizes="100vw"
          alt={icon.alt}
        />
      </div>
      {children}
    </div>
  );
}
