import { FC, ReactNode } from "react";

const FormGroup: FC<{
  children: ReactNode;
  flexDirection?: "row" | "col";
  className?: string;
}> = ({ children, className, flexDirection = "col" }) => {
  const flexStyle =
    flexDirection === "col" ? "flex-col" : flexDirection === "row" ? "" : "";

  return (
    <div className={`flex ${flexStyle} gap-3 mb-5 ${className}`}>
      {children}
    </div>
  );
};

export default FormGroup;
