import { NextPage } from "next";

import Container from "@/app/lib/components/layout/container";
import Link from "next/link";
import Logo from "@/app/lib/components/data-display/logo";

const SignupSucces: NextPage = () => {
  return (
    <Container width="w-2/6">
      <div className="h-screen flex flex-col items-center justify-center">
        <Logo size={250} />
        <h1 className="text-4xl font-semibold text-centered mb-5">
          You've successfully registered.
        </h1>
        <p className="mb-5">An email has been send for verification.</p>
        <Link href="/login" className="underline underline-offset-2">
          Go to login
        </Link>
      </div>
    </Container>
  );
};

export default SignupSucces;
