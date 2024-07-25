import { FC } from "react";
import BaseModal from "../../data-display/base-modal";
import { Project } from "@/app/lib/types/models";
import Button from "../button";
import useProjectDelete from "@/app/lib/hooks/projects/useProjectDelete";

const ProjectConfirmDeleteModal: FC<{
  project: Project;
  showModal: boolean;
  onClose: () => void;
}> = ({ project, showModal, onClose }) => {
  const { handleDelete, errorMsg } = useProjectDelete(project);

  const handleDeleteOnClick = () => {
    onClose();
    handleDelete();
  };

  return (
    <BaseModal show={showModal} onClose={onClose} className="w-1/4 p-6">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-medium">Delete Project?</h1>
      </div>
      <p className="text-text-light-300 mb-5">
        Once you hit delete, your project will be gone forever, like a bug-free
        codebase in the wild.
      </p>
      <div className="flex justify-end">
        <Button
          onClick={handleDeleteOnClick}
          padding="sm"
          value="Confirm delete"
        />
      </div>
    </BaseModal>
  );
};

export default ProjectConfirmDeleteModal;
