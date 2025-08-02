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
        'text-caption-xs! has-checked:from-primary-100 has-checked:to-secondary-60 has-checked:border-primary-60 from-gray-40 to-gray-20 border-gray-40 cursor-pointer rounded-full border bg-linear-0 px-2 py-1.5 text-black has-checked:text-white',
        newClassName
      )}
    >
      <input className="sr-only" type="radio" name={name} id={id} {...rest} />
      {children}
    </label>
  );
}
