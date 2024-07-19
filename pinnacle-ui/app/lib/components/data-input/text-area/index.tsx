import { ChangeEventHandler, FC } from "react";

const TextArea: FC<{
  placeholder?: string | undefined;
  autoFocus?: boolean;
  value?: string | number | readonly string[] | undefined;
  onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined;
  className?: string | undefined;
}> = ({ placeholder, value, autoFocus, onChange, className }) => {
  return (
    <textarea
      placeholder={placeholder}
      autoFocus={autoFocus}
      autoComplete="off"
      value={value}
      onChange={onChange}
      className={`
        bg-transparent 
        outline outline-1
        dark:outline-accent-dark-600 
        rounded-lg 
        p-4
        ${className}
      `}
      rows={5}
    />
  );
};

export default TextArea;
