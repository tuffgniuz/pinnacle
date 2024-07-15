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
        outline-1 
        outline-accent-dark-500
        focus:outline-neutral-dark-200
        transition-all
        duration-300
        ease-in-out
        rounded-md 
        p-2
      "
    />
  );
};

export default TextInput;
