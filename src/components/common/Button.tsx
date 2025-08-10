import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

/**
 * Renders a styled button element with customizable type, class names, and additional button attributes.
 *
 * Merges default Tailwind CSS classes with any provided `className` and applies them to the button.
 * The button type defaults to `'button'` if not specified.
 *
 * @param type - The button's behavior type (`'button'`, `'submit'`, or `'reset'`). Defaults to `'button'`.
 * @param className - Additional CSS classes to merge with the default styling.
 * @param children - Content to display inside the button.
 */
export default function Button({
  type: buttonType = 'button',
  className: newClassName,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        'from-primary-100 to-secondary-60 border-primary-60 disabled:from-gray-40 disabled:to-gray-20 disabled:border-gray-40 rounded-xl border bg-linear-0 px-5 py-2 text-white disabled:cursor-not-allowed pointer-fine:hover:not-disabled:brightness-95',
        newClassName
      )}
      type={buttonType}
      {...rest}
    >
      {children}
    </button>
  );
}
