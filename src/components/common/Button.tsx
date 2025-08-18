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
        'border-primary-60 disabled:bg-gray-gradient disabled:border-gray-40 text-button-md bg-primary-gradient rounded-xl border px-5 py-2 text-white disabled:cursor-not-allowed pointer-fine:hover:not-disabled:brightness-95',
        newClassName
      )}
      type={buttonType}
      {...rest}
    >
      {children}
    </button>
  );
}
