import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export default function Button({
  type: buttonType = 'button',
  className: newClassName,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        'from-primary-100 to-secondary-60 border-primary-60 disabled:from-gray-40 disabled:to-gray-20 disabled:border-gray-40 rounded-xl border bg-linear-0 px-5 py-2 text-white disabled:cursor-not-allowed pointer-fine:hover:not-disabled:brightness-105',
        newClassName
      )}
      type={buttonType}
      {...rest}
    >
      {children}
    </button>
  );
}
