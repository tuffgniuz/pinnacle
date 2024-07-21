"use client";
import { FC, MouseEventHandler } from "react";
import { LucideX } from "lucide-react";
import { Url } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/navigation";

import Logo from "../../data-display/logo";

const FormPageHeader: FC<{
  href?: Url;
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
  title?: string | undefined;
}> = ({ href, onClick, title }) => {
  const router = useRouter();
  return (
    <header
      className="
        h-28 
        flex items-center 
        border-b 
        border-b-accent-light-900 
        dark:border-b-accent-dark-400
        mb-14
      "
    >
      <div className="w-4/6 mx-auto flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Logo href={href ? `${href}` : "/projects"} onClick={onClick} />
          {title && <h1 className="text-lg">{title}</h1>}
        </div>
        <button
          onClick={() => router.back()}
          className="hover:bg-neutral-light dark:hover:bg-neutral-light-100 p-2 rounded-full transition-all duration-300 ease-in-out"
        >
          <LucideX />
        </button>
      </div>
    </header>
  );
};

export default FormPageHeader;
