import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginUser } from "../actions";
import { loginSuccess } from "../stores/authSlice";
import { FormEvent } from "react";

interface LoginCredentials {
  username: string;
  password: string;
}

const useLoginUser = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: ({ username, password }: LoginCredentials) =>
      loginUser(username, password),
    onSuccess: (data) => {
      const { access_token } = data;
      dispatch(loginSuccess({ token: access_token }));
      router.push("/projects");
    },
    onError: (error) => {
      console.log(error.message);
      throw new Error(error.message);
    },
  });

  const handleSubmit = (e: FormEvent, username: string, password: string) => {
    e.preventDefault();
    mutation.mutate({ username, password });
  };

  return { handleSubmit, ...mutation };
};

export default useLoginUser;
