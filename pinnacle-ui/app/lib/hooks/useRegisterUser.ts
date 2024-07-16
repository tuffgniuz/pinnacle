import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { registerUser } from "../actions";

const useRegisterUser = () => {
  const router = useRouter();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const mutation = useMutation({
    mutationFn: () => {
      return registerUser(fullname, email, password);
    },
    onSuccess: () => {
      router.push("/signup/success");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Passwords do not match!");
      return;
    }
    mutation.mutate();
  };

  return {
    fullname,
    setFullname,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit,
    ...mutation,
  };
};

export default useRegisterUser;
