"use client";
import { FC } from "react";
import Image from "next/image";

import { useTheme } from "@/app/lib/context/theme-context";
import Link from "next/link";

const Logo: FC<{ size?: number }> = ({ size = 35 }) => {
  const { theme } = useTheme();

  return theme === "dark" ? (
    <Link href="/">
      <Image
        src="/icons/pinnacle-light.svg"
        alt="logo"
        width={size}
        height={size}
      />
    </Link>
  ) : (
    <Link href="/">
      <Image src="/icons/pinnacle.svg" alt="logo" width="35" height="35" />
    </Link>
  );
};

export default Logo;
