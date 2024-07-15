"use client";
import { FC } from "react";

import { useTheme } from "@/app/lib/context/theme-context";
import { LucideMoon, LucideSun } from "lucide-react";

const ThemeToggleButton: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        dark:bg-accent-dark-500
        bg-accent-light-300
        rounded-md
        p-2
        transition-all
        duration-300
        ease-in-out
      "
    >
      {theme === "dark" ? (
        <LucideSun color="#d4d8dc" />
      ) : (
        <LucideMoon color="#eff0f2" />
      )}
    </button>
  );
};

export default ThemeToggleButton;
