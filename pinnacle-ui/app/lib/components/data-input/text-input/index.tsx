import {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  HTMLInputAutoCompleteAttribute,
  LegacyRef,
} from "react";

const TextInput: FC<{
  type?: "text" | "search" | "password";
  autoFocus?: boolean;
  autoComplete?: HTMLInputAutoCompleteAttribute | undefined;
  placeholder?: string;
  value?: string | number | readonly string[] | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  className?: string | undefined;
  outlineNone?: boolean;
  padding?: "sm" | "md";
  fullWidth?: boolean;
  ref?: LegacyRef<HTMLInputElement> | undefined;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
}> = ({
  type = "text",
  autoFocus = false,
  autoComplete,
  placeholder,
  value,
  onChange,
  padding = "md",
  className,
  fullWidth,
  outlineNone,
  ref,
  onBlur,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
      ref={ref}
      onBlur={onBlur}
      className={`
        bg-transparent 
        transition-all
        duration-300
        ease-in-out
        rounded-lg
        border-none
        ${outlineNone ? "outline-none" : "outline outline-1 outline-primary-light dark:outline-accent-dark-600"}
        ${padding === "sm" ? "p-2" : padding === "md" ? "p-4" : ""}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    />
  );
};

export default TextInput;
