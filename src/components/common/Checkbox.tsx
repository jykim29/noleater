interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
}

export default function Checkbox({
  id,
  name,
  children,
  ...rest
}: CheckboxProps) {
  return (
    <label
      className="pointer-fine:has-focus-within:outline-focus inline-flex items-center gap-1 pointer-fine:has-focus-within:outline-2"
      htmlFor={id}
    >
      <input
        className="peer sr-only"
        type="checkbox"
        name={name}
        id={id}
        {...rest}
      />
      <div className="border-gray-60 peer-checked:bg-primary-100 inline-block h-5 w-5 rounded-sm border-2 peer-checked:border-0 peer-checked:bg-[url(/assets/icons/check.svg)] peer-checked:bg-center peer-checked:bg-no-repeat"></div>
      {children}
    </label>
  );
}
