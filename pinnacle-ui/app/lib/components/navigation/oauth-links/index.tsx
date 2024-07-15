import Link from "next/link";
import { FC } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa6";

const OAuthLinks: FC = () => {
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
              px-4 py-2
            "
        >
          <FaGithub size="18" />
        </Link>
        <Link
          href=""
          className="w-full flex items-center justify-center gap-5 border dark:border-accent-dark-600 rounded-xl px-4 py-2"
        >
          <FaGoogle size="18" />
        </Link>
      </div>
    </>
  );
};

export default OAuthLinks;
