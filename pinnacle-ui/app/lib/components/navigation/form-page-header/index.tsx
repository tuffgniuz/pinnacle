"use client";
import { FC } from "react";
import Link from "next/link";

import { LucideX } from "lucide-react";

import Logo from "../../data-display/logo";
import useCurrentUser from "@/app/lib/hooks/useCurrentUser";

const FormPageHeader: FC<{ title?: string | undefined }> = ({ title }) => {
  const { data: currentUser } = useCurrentUser();
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
          <Logo href={currentUser && "/projects"} />
          {title && <h1 className="text-lg">{title}</h1>}
        </div>
        <Link href={currentUser ? "/projects" : "/"} className="">
          <LucideX />
        </Link>
      </div>
    </header>
  );
};

export default FormPageHeader;
