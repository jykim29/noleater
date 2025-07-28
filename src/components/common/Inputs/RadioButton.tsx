interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
}

export default function RadioButton({
  id,
  name,
  children,
  ...rest
}: RadioButtonProps) {
  return (
    <label
      className="has-focus-within:outline-focus inline-flex items-center gap-1 has-focus-within:outline-2"
      htmlFor={id}
    >
      <input
        className="peer sr-only"
        type="radio"
        name={name}
        id={id}
        {...rest}
      />
      <div className="border-gray-60 flex h-5 w-5 items-center justify-center rounded-full border-2 peer-not-checked:*:hidden">
        <div className="bg-primary-100 h-2.5 w-2.5 rounded-full"></div>
      </div>
      {children}
    </label>
  );
}
