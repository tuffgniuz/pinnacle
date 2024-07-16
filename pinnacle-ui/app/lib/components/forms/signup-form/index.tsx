"use client";

import { FC } from "react";

import FormGroup from "../form-group";
import Label from "../label";
import TextInput from "../../data-input/text-input";

const SignupForm: FC = () => {
  return (
    <form action="">
      <FormGroup>
        <Label value="Your name" />
        <TextInput autoComplete="off" placeholder="Enter your name.." />
      </FormGroup>
      <FormGroup>
        <Label value="Your email" />
        <TextInput placeholder="Enter your email..." />
      </FormGroup>
      <FormGroup>
        <Label value="Your password" />
        <TextInput type="password" placeholder="Enter your password..." />
      </FormGroup>
      <FormGroup>
        <Label value="Confirm password" />
        <TextInput type="password" placeholder="Confirm your password..." />
      </FormGroup>
    </form>
  );
};

export default SignupForm;
