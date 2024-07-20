"use client";
import { FC, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const BaseModal: FC<{
  show?: boolean;
  onClose?: () => void;
  hasCloseButton?: boolean;
  children: ReactNode;
  className?: string | undefined;
}> = ({ show = false, onClose, hasCloseButton, children, className }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && onClose) {
      onClose();
    }
  };

  useEffect(() => {
    let modalRoot = document.getElementById("modal-root");
    if (!modalRoot) {
      modalRoot = document.createElement("div");
      modalRoot.setAttribute("id", "modal-root");
      document.body.appendChild(modalRoot);
    }
  }, []);

  useEffect(() => {
    if (show) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [show]);

  const modalRoot = document.getElementById("modal-root");
  if (!show || !modalRoot) return null;

  return createPortal(
    <div
      ref={ref}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div
        className={`bg-background-light dark:bg-accent-dark-500 rounded-lg ${className}`}
      >
        {children}
        {hasCloseButton && (
          <button onClick={onClose} className="mt-4">
            Close
          </button>
        )}
      </div>
    </div>,
    modalRoot,
  );
};

export default BaseModal;
