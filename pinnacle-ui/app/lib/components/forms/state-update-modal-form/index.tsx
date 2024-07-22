import { State } from "@/app/lib/types/models";
import { FC } from "react";
import BaseModal from "../../data-display/base-modal";
import { LucideX } from "lucide-react";

const StateUpdateModalForm: FC<{
  state: State;
  showModal: boolean;
  onClose: () => void;
}> = ({ state, showModal, onClose }) => {
  return (
    <BaseModal show={showModal} onClose={onClose}>
      <div className="flex items-center justify-center">
        <h1>Edit state options</h1>
        <button>
          <LucideX size={18} />
        </button>
      </div>
    </BaseModal>
  );
};

export default StateUpdateModalForm;
