import { ChangeEventHandler, FC } from "react";

const Toggle: FC<{
  checked: boolean | undefined;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
}> = ({ checked, onChange }) => {
  return (
    <label
      htmlFor="check"
      className="cursor-pointer border border-accent-dark-500 w-20 h-10 relative rounded-full"
    >
      <input
        checked={checked}
        onChange={onChange}
        type="checkbox"
        id="check"
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
          peer-checked:left-11
          transition-all duration-300 ease-in-out
        "
      />
    </label>
  );
};

export default Toggle;
