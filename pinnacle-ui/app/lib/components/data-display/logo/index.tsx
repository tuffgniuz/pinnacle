"use client";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";

import { useTheme } from "@/app/lib/context/theme-context";

const Logo: FC<{ size?: number; href?: Url }> = ({ size = 35, href = "/" }) => {
  const { theme } = useTheme();

  return theme === "dark" ? (
    <Link href={href}>
      <Image
        src="/icons/pinnacle-light.svg"
        alt="logo"
        width={size}
        height={size}
      />
    </Link>
  ) : (
    <Link href={href}>
      <Image src="/icons/pinnacle.svg" alt="logo" width="35" height="35" />
    </Link>
  );
};

export default Logo;
