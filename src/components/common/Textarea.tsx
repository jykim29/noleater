import { twMerge } from 'tailwind-merge';

interface TextareaProps extends React.ComponentPropsWithoutRef<'textarea'> {
  label?: string;
  id: string;
  name: string;
  className?: string;
}

export default function Textarea({
  label = '',
  id,
  name,
  className: newClassName = '',
  children,
  ...rest
}: TextareaProps) {
  return (
    <label className="relative flex w-full flex-col justify-center gap-1">
      <textarea
        className={twMerge(
          'peer bg-gray-20 border-gray-40 focus-within:outline-focus h-40 w-full resize-none border px-4 py-4 not-placeholder-shown:bg-white focus-within:bg-white',
          label && 'mt-[26px]',
          newClassName
        )}
        name={name}
        id={id}
        {...rest}
      >
        {children}
      </textarea>
      {label && (
        <span className="text-body-sm peer-focus-within:text-focus absolute top-0 left-0 peer-focus-within:font-semibold">
          {label}
        </span>
      )}
    </label>
  );
}
