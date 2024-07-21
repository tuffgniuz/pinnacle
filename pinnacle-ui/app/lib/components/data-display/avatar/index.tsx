"use client";
import Image from "next/image";
import { FC, MouseEventHandler } from "react";

const Avatar: FC<{
  size?: number;
  onClick?: MouseEventHandler<HTMLElement> | undefined;
  className?: string | undefined;
}> = ({ size = 50, onClick, className }) => {
  return (
    <div
      className={`cursor-pointer rounded-full overflow-hidden drop-shadow-lg ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/img/dummy-avatar.jpg"
        alt="user avatar"
        width={size}
        height={size}
        className="rounded-full"
        onClick={onClick}
      />
    </div>
  );
};

export default Avatar;
