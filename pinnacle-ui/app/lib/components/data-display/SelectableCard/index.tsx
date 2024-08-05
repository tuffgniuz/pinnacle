import { FC, MouseEventHandler, ReactNode } from "react";
import { LucideCheckCircle } from "lucide-react";
import Card from "../card";

interface SelectableCardProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLDivElement>;
  padding: "sm" | "md" | "lg";
  isSelected: boolean;
}

const SelectableCard: FC<SelectableCardProps> = ({
  children,
  onClick,
  padding,
  isSelected,
}) => {
  return (
    <Card
      onClick={onClick}
      padding={padding}
      className={`
        relative
        cursor-pointer
        outline outline-1
        hover:outline-sky_magenta
        hover:bg-opacity-10
        dark:hover:bg-opacity-10
        hover:bg-sky_magenta
        dark:hover:bg-sky_magenta
        dark:hover:outline-sky_magenta
        transition-all duration-300 ease-in-out ${
          isSelected
            ? "outline-sky_magenta dark:outline-sky_magenta bg-sky_magenta dark:bg-sky_magenta bg-opacity-10 dark:bg-opacity-10"
            : "outline-transparent"
        }`}
    >
      {isSelected && (
        <span className="absolute -top-2 -right-2 transition-all duration-300 ease-in-out">
          <LucideCheckCircle size={18} color="#ae759f" />
        </span>
      )}
      {children}
    </Card>
  );
};

export default SelectableCard;
