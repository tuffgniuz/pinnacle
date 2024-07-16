import { FC, ReactNode } from "react";

const FormGroup: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={`flex flex-col gap-3 mb-10 ${className}`}>{children}</div>
  );
};

export default FormGroup;
