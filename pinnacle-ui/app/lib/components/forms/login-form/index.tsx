"use client";
import { FC, useState } from "react";

import FormGroup from "../form-group";
import Label from "../label";
import TextInput from "../../data-input/text-input";
import Button from "../../actions/button";
import useLoginUser from "@/app/lib/hooks/useLoginUser";

const LoginForm: FC = () => {
  const { handleSubmit } = useLoginUser();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <form onSubmit={(e) => handleSubmit(e, email, password)} className="mb-5">
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
          placeholder="Enter you password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>
      <Button type="submit" value="Login" fullWidth />
    </form>
  );
};

export default LoginForm;
