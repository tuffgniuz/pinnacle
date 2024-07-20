"use client";
import Image from "next/image";
import { FC, MouseEventHandler } from "react";

const Avatar: FC<{
  size?: number;
  onClick?: MouseEventHandler<HTMLElement> | undefined;
}> = ({ size = 35, onClick }) => {
  return (
    <figure
      className={`cursor-pointer outline outline-1 outline-neutral-light-500 rounded-full overflow-hidden h-[35px] w-[35px]`}
      onClick={onClick}
    >
      <Image
        src="/img/dummy-avatar.jpg"
        alt="user avatar"
        width={size}
        height={size}
        className={`object-fit`}
      />
    </figure>
  );
};

export default Avatar;
