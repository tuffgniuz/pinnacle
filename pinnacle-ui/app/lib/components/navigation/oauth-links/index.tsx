"use client";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa6";

import { getGithubAuthorizationUrl } from "@/app/lib/actions";

const OAuthLinks: FC = () => {
  // const [githubAuthUrl, setGithubAuthUrl] = useState<string>("");
  //
  // useEffect(() => {
  //   (async () => {
  //     const url = await getGithubAuthorizationUrl();
  //     setGithubAuthUrl(url);
  //   })();
  // }, []);

  return (
    <>
      <p className="mb-5">Or continue with</p>

      <div className="flex gap-2">
        <Link
          href=""
          className="
              w-full 
              flex items-center justify-center gap-2 
              border dark:border-accent-dark-600 
              rounded-xl 
              p-4
            "
        >
          <span className="bg-neutral-light-500 text-text-light-100 rounded-full p-1">
            <FaGithub size="18" />
          </span>
        </Link>
        <Link
          href={`${process.env.PUBLIC_NEXT_API_URL}/auth/github/authorize`}
          className="
            w-full 
            flex items-center justify-center gap-5 
            border dark:border-accent-dark-600 
            rounded-xl p-2"
        >
          <span className="bg-neutral-light-500 text-text-light-100 rounded-full p-1">
            <FaGoogle size="18" />
          </span>
        </Link>
      </div>
    </>
  );
};

export default OAuthLinks;
