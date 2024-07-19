import { useState, useEffect, useRef, FocusEventHandler } from "react";

const useToggleElement = <T extends HTMLElement>() => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useRef<T>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsVisible(false);
    }
  };

  const handleBlur: FocusEventHandler = (event) => {
    if (!ref.current?.contains(event.relatedTarget as Node)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible]);

  return { isVisible, setIsVisible, ref, handleBlur };
};

export default useToggleElement;
