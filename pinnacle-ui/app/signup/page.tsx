import { FC } from "react";
import AuthHeader from "../lib/components/navigation/auth-header";
import OAuthLinks from "../lib/components/navigation/oauth-links";
import Link from "next/link";
import SignupForm from "../lib/components/forms/signup-form";

const Signup: FC = () => {
  return (
    <>
      <AuthHeader />
      <div className="w-2/6 mx-auto">
        <div className="px-5">
          <h1 className="text-4xl text-center mb-5">
            Create your Pinnacle account.
          </h1>
          <p className="text-center mb-10">
            Already an account?{" "}
            <Link href="/login" className="font-semibold underline">
              Login
            </Link>
          </p>

          <SignupForm />

          <OAuthLinks />
        </div>
      </div>
    </>
  );
};

export default Signup;
