import { ChangeEventHandler, FC } from "react";

const Toggle: FC<{
  id: string;
  checked: boolean | undefined;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
}> = ({ id, checked, onChange }) => {
  return (
    <label
      htmlFor={id}
      className="cursor-pointer border border-accent-dark-500 w-14 h-7 relative rounded-full"
    >
      <input
        id={id}
        checked={checked}
        onChange={onChange}
        type="checkbox"
        className="sr-only peer"
      />
      <span
        className="
          w-2/5 h-4/5 
          bg-accent-dark-500 
          absolute 
          rounded-full 
          left-1 top-1 
          peer-checked:bg-sky_magenta-600
          peer-checked:left-7
          transition-all duration-300 ease-in-out
        "
      />
    </label>
  );
};

export default Toggle;
