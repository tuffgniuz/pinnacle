import {
  FC,
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputAutoCompleteAttribute,
  LegacyRef,
} from "react";

const TextInput: FC<{
  type?: "text" | "search" | "password" | "number";
  autoFocus?: boolean;
  autoComplete?: HTMLInputAutoCompleteAttribute | undefined;
  placeholder?: string;
  value?: string | number | readonly string[] | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  className?: string | undefined;
  outlineNone?: boolean;
  padding?: "sm" | "md" | "none";
  rounded?: "sm" | "md" | "lg" | "none";
  backgroundColor?: string;
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
  rounded = "lg",
  backgroundColor = "bg-transparent",
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
        transition-all
        duration-300
        ease-in-out
        ${backgroundColor}
        ${rounded === "sm" ? "rounded-sm" : rounded === "md" ? "rounded-md" : rounded == "lg" ? "rounded-lg" : rounded === "none" ? "" : ""}
        ${outlineNone ? "outline-none" : "outline outline-1 outline-primary-light dark:outline-accent-dark-600"}
        ${padding === "sm" ? "p-2" : padding === "md" ? "p-4" : padding === "none" ? "" : ""}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    />
  );
};

export default TextInput;
