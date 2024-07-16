import { FC } from "react";

import Link from "next/link";
import TextInput from "../lib/components/data-input/text-input";
import AuthHeader from "../lib/components/navigation/auth-header";
import OAuthLinks from "../lib/components/navigation/oauth-links";
import Button from "../lib/components/actions/button";
import Label from "../lib/components/forms/label";
import FormGroup from "../lib/components/forms/form-group";

const Login: FC = () => {
  return (
    <>
      <AuthHeader />

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

        {/* Login form */}
        <form className="mb-5">
          <FormGroup>
            <Label value="Your email" />
            <TextInput placeholder="Enter your email..." />
          </FormGroup>
          <FormGroup>
            <Label value="Your password" />
            <TextInput type="password" placeholder="Enter you password" />
          </FormGroup>
          <Button value="Login" fullWidth />
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
