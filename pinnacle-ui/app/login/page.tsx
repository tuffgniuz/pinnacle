import { FC } from "react";

import Link from "next/link";
import TextInput from "../lib/components/data-input/text-input";
import AuthHeader from "../lib/components/navigation/auth-header";
import OAuthLinks from "../lib/components/navigation/oauth-links";

const Login: FC = () => {
  return (
    <>
      {/* Header */}
      <AuthHeader />
      {/* Login form */}
      <div className="w-2/6 mx-auto">
        <h1 className="text-4xl text-center font-semibold mb-5">
          Welcome back.
        </h1>
        <p className="text-center text-text-light-300 dark:text-text-light-500 mb-10">
          New to Pinnacle?{" "}
          <Link href="/signup" className="font-semibold underline">
            Sign up
          </Link>
        </p>
        <form className="mb-5">
          <div className="flex flex-col gap-3 mb-5">
            <label className="text-text-light-300">Your email</label>
            <TextInput placeholder="Enter your email..." />
          </div>
          <div className="flex flex-col gap-3 mb-10">
            <label className="text-text-light-300">Password</label>
            <TextInput type="password" placeholder="Enter you password" />
          </div>
          <button
            className="
              bg-neutral-light-500
              dark:bg-text-dark
              text-text-light-100
              font-semibold
              p-4
              w-full
              rounded-lg
            "
          >
            Login
          </button>
        </form>

        <div className="my-5">
          <Link href="" className="underline underline-offset-4">
            Forgot your password?
          </Link>
        </div>

        {/* OAuth clients authentication */}
        <OAuthLinks />
      </div>
    </>
  );
};

export default Login;
