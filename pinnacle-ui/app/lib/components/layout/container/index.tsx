import { FC, ReactNode } from "react";

const Container: FC<{
  children: ReactNode;
  width?: "w-2/6" | "w-3/6" | "w-4/6";
  className?: string;
}> = ({ children, width, className }) => {
  return <div className={`mx-auto ${width} ${className}`}>{children}</div>;
};

export default Container;
