import { FC } from "react";
import Logo from "../lib/components/data-display/logo";
import { LucideGithub, LucideX } from "lucide-react";
import Link from "next/link";
import TextInput from "../lib/components/data-input/text-input";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import AuthHeader from "../lib/components/navigation/auth-header";
import OAuthLinks from "../lib/components/navigation/oauth-links";

const Login: FC = () => {
  return (
    <>
      {/* Header */}
      <AuthHeader />
      {/* Login form */}
      <div className="w-2/6 mx-auto">
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
        <OAuthLinks />
      </div>
    </>
  );
};

export default Login;
