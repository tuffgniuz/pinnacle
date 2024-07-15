import { FC } from "react";
import Logo from "../lib/components/data-display/logo";
import { LucideGithub, LucideX } from "lucide-react";
import Link from "next/link";
import TextInput from "../lib/components/data-input/text-input";
import { FaGithub, FaGoogle } from "react-icons/fa6";

const Login: FC = () => {
  return (
    <>
      {/* Header */}
      <div className="h-28 flex items-center border-b border-b-accent-dark-500 mb-10">
        <div className="w-3/4 mx-auto flex items-center justify-between">
          <Logo />
          <Link href="/" className="">
            <LucideX />
          </Link>
        </div>
      </div>
      {/* Login form */}
      <div className="w-3/6 mx-auto">
        <h1 className="text-4xl text-center mb-5">Welcome back.</h1>
        <p className="text-center mb-10">
          New to Pinnacle?{" "}
          <Link href="/signup" className="font-semibold underline">
            Sign up
          </Link>
        </p>
        <form className="mb-5">
          <div className="flex flex-col gap-2 mb-5">
            <label>Your email</label>
            <TextInput />
          </div>
          <div className="flex flex-col gap-2 mb-5">
            <label>Password</label>
            <TextInput type="password" />
          </div>
          <button
            className="
              bg-maya_blue
              text-maya_blue-100
              px-4 py-2
              w-full
              rounded-md
            "
          >
            Login
          </button>
        </form>

        {/* OAuth clients authentication */}
        <p className="mb-5">Or continue with</p>

        <div className="flex gap-2">
          <button
            className="
              w-full 
              flex items-center justify-center gap-2 
              border dark:border-accent-dark-500 
              rounded-xl 
              px-4 py-2
            "
          >
            <FaGithub size="18" />
          </button>
          <button className="w-full flex items-center justify-center gap-5 border dark:border-accent-dark-500 rounded-xl px-4 py-2">
            <FaGoogle size="18" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
