import { FC } from "react";
import { Issue } from "@/app/lib/types/models";
import { getRgbaColor } from "@/app/lib/utils";

const IssueLabels: FC<{
  issue: Issue | undefined;
  className?: string | undefined;
}> = ({ issue, className }) => {
  return (
    <div className={`flex flex-wrap gap-2 -m-1 ${className}`}>
      {issue?.labels?.length ? (
        issue?.labels?.length > 0 &&
        issue?.labels?.map((label) => (
          <span
            className="border rounded-lg px-4 py-1"
            style={{
              borderColor: label.color,
              backgroundColor: getRgbaColor(label.color, 0.3),
            }}
          >
            <p className="font-semibold" style={{ color: label.color }}>
              {label.name}
            </p>
          </span>
        ))
      ) : (
        <p>No labels</p>
      )}
    </div>
  );
};

export default IssueLabels;
