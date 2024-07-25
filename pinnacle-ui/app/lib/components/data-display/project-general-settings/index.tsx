import { FC, useState } from "react";
import { Project } from "@/app/lib/types/models";
import ProjectConfirmDeleteModal from "../../actions/project-confirm-delete-modal";
import ProjectUpdateForm from "../../forms/project-update-form";
import Card from "../card";

const ProjectGeneralSettings: FC<{ project: Project | undefined }> = ({
  project,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      <h1 className="text-2xl mb-10 dark:text-text-dark-700">General</h1>

      <ProjectUpdateForm project={project} />

      <h2 className="text-xl dark:text-text-dark-700 mb-5">
        Project Termination
      </h2>
      <Card className="outline outline-1 outline-light_red">
        <div className="mb-5">
          <h3 className="font-semibold mb-3">Delete this project</h3>
          <p>
            Once you hit delete, your project will be gone forever, like a
            bug-free codebase in the wild. 🐞
          </p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => setShowModal(true)}
            className="w-32 p-2 rounded-md text-light_red bg-accent-dark-300"
          >
            Delete
          </button>
        </div>
      </Card>
      <ProjectConfirmDeleteModal
        project={project}
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default ProjectGeneralSettings;
