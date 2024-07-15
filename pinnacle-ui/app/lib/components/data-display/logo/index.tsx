"use client";
import { FC } from "react";
import Image from "next/image";

import { useTheme } from "@/app/lib/context/theme-context";

const Logo: FC = () => {
  const { theme } = useTheme();

  return theme === "dark" ? (
    <Image src="/icons/pinnacle-light.svg" alt="logo" width="35" height="35" />
  ) : (
    <Image src="/icons/pinnacle.svg" alt="logo" width="35" height="35" />
  );
};

export default Logo;
