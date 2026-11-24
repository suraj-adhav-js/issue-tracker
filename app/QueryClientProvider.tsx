"use client"
import {QueryClient, QueryClientProvider as TanStackQueryClientProvider} from "@tanstack/react-query"
import { PropsWithChildren } from "react";

const queryClient = new QueryClient();

const QueryClientProvider = ({children}: PropsWithChildren) => {
  return (
    <TanStackQueryClientProvider client={queryClient}>
        {children}
    </TanStackQueryClientProvider>
  )
}

export default QueryClientProvider