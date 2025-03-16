"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
