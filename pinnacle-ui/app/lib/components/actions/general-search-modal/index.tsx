import { FC, useEffect, useState } from "react";
import { LucideSearch } from "lucide-react";
import BaseModal from "../../data-display/base-modal";
import TextInput from "../../data-input/text-input";

const GeneralSearchModal: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setShowModal((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="
          flex justify-between 
          w-72
          dark:bg-background-dark
          dark:text-text-dark-700
          outline
          dark:outline-1
          dark:outline-accent-dark-600
          px-4 py-2
          rounded-lg
        "
      >
        <div className="flex items-center gap-2">
          <LucideSearch size={18} />
          <span>Quick search...</span>
        </div>
        <span className="font-medium">Ctrl K</span>
      </button>

      <BaseModal
        show={showModal}
        onClose={() => setShowModal(false)}
        className="w-1/4"
      >
        {/* TextInput to search the database */}
        <TextInput fullWidth outlineNone autoFocus placeholder="Search..." />
        <div className="p-4">
          {/* Render list of up to 5 projects */}
          {/* Render list of up to 5 issues */}
        </div>
      </BaseModal>
    </>
  );
};

export default GeneralSearchModal;
