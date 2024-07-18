import { FC } from "react";

const ProjectList: FC = () => {
  return (
    <div className="mt-10">
      <table className="w-full text-left">
        <thead className="bg-neutral-light dark:bg-background-dark transition-all duration-300 ease-in-out">
          <tr>
            <th className="p-2">Key</th>
            <th className="p-2">Name</th>
            <th className="p-2">Methodology</th>
          </tr>
        </thead>
      </table>
      <tbody></tbody>
    </div>
  );
};

export default ProjectList;
