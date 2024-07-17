import { NextPage } from "next";

import Link from "next/link";
import AuthHeader from "../lib/components/navigation/auth-header";
import OAuthLinks from "../lib/components/navigation/oauth-links";
import LoginForm from "../lib/components/forms/login-form";
import Container from "../lib/components/layout/container";

const Login: NextPage = () => {
  return (
    <>
      <AuthHeader />
      <Container width="w-2/6">
        <h1 className="text-4xl text-center font-semibold mb-5">
          Welcome back.
        </h1>

        <p className="text-center text-text-light-300 dark:text-text-light-500 mb-10">
          New to Pinnacle?{" "}
          <Link href="/signup" className="font-semibold underline">
            Sign up
          </Link>
        </p>

        <LoginForm />

        <div className="my-5">
          <Link href="" className="underline underline-offset-4">
            Forgot your password?
          </Link>
        </div>

        <OAuthLinks />
      </Container>
    </>
  );
};

export default Login;
