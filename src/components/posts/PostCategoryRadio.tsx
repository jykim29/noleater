import { twMerge } from 'tailwind-merge';

interface PostCategoryRadioProps
  extends React.ComponentPropsWithoutRef<'input'> {
  id: string;
  name: string;
  className?: string;
}

export default function PostCategoryRadio({
  id,
  name,
  className: newClassName = '',
  children,
  ...rest
}: PostCategoryRadioProps) {
  return (
    <label
      htmlFor={id}
      className={twMerge(
        'text-caption-xs! has-checked:bg-primary-gradient has-checked:border-primary-60 bg-gray-gradient border-gray-40 cursor-pointer rounded-full border px-2 py-1.5 text-black has-checked:text-white',
        newClassName
      )}
    >
      <input className="sr-only" type="radio" name={name} id={id} {...rest} />
      {children}
    </label>
  );
}
