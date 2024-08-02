import { FC } from "react";
import { Issue } from "@/app/lib/types/models";
import { getRgbaColor } from "@/app/lib/utils";
import { LucideTag } from "lucide-react";

const IssueLabels: FC<{
  issue: Issue | undefined;
  className?: string | undefined;
}> = ({ issue, className }) => {
  if (issue?.labels?.length === 0) {
    return null;
  }

  const handleClick = () => {
    console.log("Label clicked");
  };

  return (
    <div className={`flex flex-wrap gap-2 -m-1 ${className}`}>
      {issue?.labels?.length &&
        issue?.labels?.length > 0 &&
        issue?.labels?.map((label) => (
          <button
            onClick={handleClick}
            className="flex items-center gap-2 border rounded-lg px-2"
            style={{
              background: getRgbaColor(label.color, 0.15),
              borderColor: label.color,
            }}
          >
            <LucideTag size={14} style={{ color: label.color }} />
            <p className="font-medium" style={{ color: label.color }}>
              {label.name}
            </p>
          </button>
        ))}
    </div>
  );
};

export default IssueLabels;
