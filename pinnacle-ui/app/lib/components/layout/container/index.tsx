"use client";
import { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Container: FC<{
  children: ReactNode;
  width?: "w-2/6";
  className?: string;
}> = ({ children, width, className }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={`mx-auto ${width} ${className}`}>{children}</div>
    </QueryClientProvider>
  );
};

export default Container;
