import { FC } from "react";
import { Issue } from "@/app/lib/types/models";

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
            className="border rounded-lg px-2"
            style={{
              borderColor: label.color,
            }}
          >
            <p className="font-semibold" style={{ color: label.color }}>
              {label.name}
            </p>
          </button>
        ))}
    </div>
  );
};

export default IssueLabels;
