import Container from "@/app/lib/components/layout/container";
import { NextPage } from "next";

const SignupSucces: NextPage = () => {
  return (
    <Container width="w-2/6">
      <h1 className="text-4xl text-centered">
        You've successfully registered.
      </h1>
    </Container>
  );
};

export default SignupSucces;
