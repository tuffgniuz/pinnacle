"use client";

import { FC } from "react";

import FormGroup from "../form-group";
import Label from "../label";
import TextInput from "../../data-input/text-input";
import Button from "../../actions/button";

import useRegisterUser from "@/app/lib/hooks/useRegisterUser";

const SignupForm: FC = () => {
  const {
    fullname,
    setFullname,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit,
  } = useRegisterUser();
  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <Label value="Your name" />
        <TextInput
          autoComplete="off"
          placeholder="Enter your name..."
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label value="Your email" />
        <TextInput
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label value="Your password" />
        <TextInput
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label value="Confirm password" />
        <TextInput
          type="password"
          placeholder="Confirm your password..."
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </FormGroup>
      <Button type="submit" value="Signup" fullWidth className="mb-5" />
    </form>
  );
};

export default SignupForm;
