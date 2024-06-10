"use client";
import Store from "@/Redux/Store";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={Store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
};

export default MainProvider;
