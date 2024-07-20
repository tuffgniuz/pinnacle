"use client";
import { FC, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const BaseModal: FC<{
  show?: boolean;
  onClose?: () => void;
  children: ReactNode;
  position?: "centered" | "side-r";
  className?: string | undefined;
}> = ({
  show = false,
  onClose,
  children,
  className,
  position = "centered",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const modalCenteredClasses = "flex justify-center items-center";
  const modalSideRClasses = "flex justify-end items-center";
  const fullscreenClasses = "";
  const positionClass =
    position === "centered"
      ? modalCenteredClasses
      : position === "side-r"
        ? modalSideRClasses
        : "";

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
      className={`z-1000 fixed inset-0 bg-black bg-opacity-50 ${positionClass}`}
    >
      <div
        className={`bg-background-light dark:bg-accent-dark-500 rounded-lg ${position === "side-r" ? "h-screen" : ""} ${className}`}
      >
        {children}
      </div>
    </div>,
    modalRoot,
  );
};

export default BaseModal;
