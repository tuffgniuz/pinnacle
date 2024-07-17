"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/stores/store";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent = (props: any) => {
    const token = useSelector((state: RootState) => state.auth.token);
    const router = useRouter();

    useEffect(() => {
      console.log("token: ", token);
      if (!token) {
        router.push("/login");
      }
    }, [token, router]);

    if (!token) {
      return null; // Or you can return a loading spinner or some placeholder
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
