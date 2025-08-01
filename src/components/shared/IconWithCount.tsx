import Image from 'next/image';

interface IconWithCountProps extends React.PropsWithChildren {
  icon: { src: string; alt: string };
}

export default function IconWithCount({ icon, children }: IconWithCountProps) {
  return (
    <div className="flex items-center gap-1">
      <div className="relative h-6 w-6">
        <Image className="object-contain" src={icon.src} fill alt={icon.alt} />
      </div>
      {children}
    </div>
  );
}
