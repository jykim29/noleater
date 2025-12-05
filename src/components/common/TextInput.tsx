import { twMerge } from 'tailwind-merge';

interface InputProps extends React.ComponentPropsWithRef<'input'> {
  label?: string;
  id: string;
  type?: 'text' | 'email' | 'number' | 'search' | 'tel';
  name: string;
  className?: string;
}

export default function TextInput({
  label,
  id,
  type: inputType = 'text',
  name,
  className: newClassName = '',
  ...rest
}: InputProps) {
  return (
    <label
      className="relative flex w-full flex-col justify-center gap-1"
      htmlFor={id}
    >
      <input
        className={twMerge(
          'peer bg-gray-20 border-gray-40 focus-within:outline-focus w-full border px-4 py-2 not-placeholder-shown:bg-white focus-within:bg-white',
          label && 'mt-[26px]',
          newClassName
        )}
        type={inputType}
        id={id}
        name={name}
        spellCheck={false}
        {...rest}
      />
      {label && (
        <span className="text-body-sm peer-focus-within:text-focus absolute top-0 left-0 peer-focus-within:font-semibold">
          {label}
        </span>
      )}
    </label>
  );
}
