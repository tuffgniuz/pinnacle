import { FC, HTMLInputAutoCompleteAttribute } from "react";

const TextInput: FC<{
  type?: "text" | "search" | "password";
  autoFocus?: boolean;
  autoComplete?: HTMLInputAutoCompleteAttribute | undefined;
  placeholder?: string;
}> = ({ type = "text", autoFocus = false, autoComplete, placeholder }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
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
