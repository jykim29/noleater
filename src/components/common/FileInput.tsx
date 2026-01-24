import { twMerge } from 'tailwind-merge';

interface FileInputProps extends React.ComponentPropsWithRef<'input'> {
  id: string;
  name: string;
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export default function FileInput({
  id,
  name,
  className: newClassName = '',
  ref,
  ...rest
}: FileInputProps) {
  return (
    <label
      className={twMerge(
        'border-gray-40 bg-gray-20 block h-20 w-20 cursor-pointer rounded-2xl border-2 bg-[url(/assets/icons/plus.svg)] bg-center bg-no-repeat has-disabled:cursor-not-allowed has-not-disabled:pointer-fine:hover:brightness-95',
        newClassName
      )}
    >
      <input
        className="sr-only"
        type="file"
        name={name}
        id={id}
        ref={ref}
        {...rest}
      />
    </label>
  );
}
