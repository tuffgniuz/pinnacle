import { FC } from "react";

const Label: FC<{ value: string; className?: string }> = ({
  value,
  className,
}) => {
  return <label className={`text-text-light-300 ${className}`}>{value}</label>;
};

export default Label;
