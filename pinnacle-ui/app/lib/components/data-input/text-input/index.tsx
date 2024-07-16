import { ChangeEventHandler, FC, HTMLInputAutoCompleteAttribute } from "react";

const TextInput: FC<{
  type?: "text" | "search" | "password";
  autoFocus?: boolean;
  autoComplete?: HTMLInputAutoCompleteAttribute | undefined;
  placeholder?: string;
  value?: string | number | readonly string[] | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}> = ({
  type = "text",
  autoFocus = false,
  autoComplete,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
      className="
        bg-transparent 
        outline 
        outline-2 
        dark:outline-accent-dark-600
        outline-primary-light
        transition-all
        duration-300
        ease-in-out
        rounded-lg
        p-4
      "
    />
  );
};

export default TextInput;
