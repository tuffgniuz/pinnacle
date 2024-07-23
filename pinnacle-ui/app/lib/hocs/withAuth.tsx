"use client";
import { ComponentType, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/stores/store";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent: ComponentType) => {
  const AuthenticatedComponent = (props: any) => {
    const token = useSelector((state: RootState) => state.auth.token);
    const router = useRouter();

    useEffect(() => {
      if (!token) {
        router.push("/login");
      }
    }, [token, router]);

    if (!token) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
