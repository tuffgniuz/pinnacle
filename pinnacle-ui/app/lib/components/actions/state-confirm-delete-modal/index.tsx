import { FC } from "react";
import { State } from "@/app/lib/types/models";
import { LucideX } from "lucide-react";
import useStateDelete from "@/app/lib/hooks/projects/useStateDelete";
import BaseModal from "../../data-display/base-modal";
import Button from "../button";

const StateConfirmDeleteModal: FC<{
  state: State | undefined;
  showModal: boolean;
  onClose: () => void;
}> = ({ state, showModal, onClose }) => {
  const { mutation } = useStateDelete(state?.id);

  const handleConfirmDelete = () => {
    mutation.mutate();
    onClose();
  };

  return (
    <BaseModal show={showModal} onClose={onClose} className="w-1/4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Delete?</h1>
        <button onClick={onClose}>
          <LucideX size={18} />
        </button>
      </div>
      <p className="mb-5 text-text-light-300 dark:text-text-light-700">
        This will permanently delete {state?.name}.
      </p>
      <div onClick={handleConfirmDelete} className="flex justify-end">
        <Button padding="sm" value="Confirm" />
      </div>
    </BaseModal>
  );
};

export default StateConfirmDeleteModal;
