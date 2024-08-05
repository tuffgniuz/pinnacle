import { FC, ReactNode } from "react";

const ToolTip: FC<{ children: ReactNode; tooltip?: string }> = ({
  children,
  tooltip,
}) => {
  return (
    <div className="group relative inline-block">
      {children}
      <span
        className="
          bg-carolina_blue-500
          text-text-dark-100
          invisible group-hover:visible 
          opacity-0 group-hover:opacity-100 
          transition-all 
          duration-100
          ease-in-out
          rounded-lg 
          absolute 
          z-50
          top-full p-6 mt-2
        "
      >
        {tooltip}
      </span>
    </div>
  );
};

export default ToolTip;
