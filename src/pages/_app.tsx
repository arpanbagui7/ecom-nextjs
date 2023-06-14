import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "@/styles/globals.css";
import "antd/dist/reset.css";
import { useState, createContext } from "react";
import { ICart, IContext } from "@/Interface";

export const Context = createContext<IContext>({});

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const [currentMenu, setCurrentMenu] = useState("home");
  const [cartItem, setCartItem] = useState<ICart>({});
  return (
    <Context.Provider
      value={{ currentMenu, setCurrentMenu, cartItem, setCartItem }}>
      <QueryClientProvider client={queryClient}>
        {" "}
        <Component {...pageProps} />
      </QueryClientProvider>
    </Context.Provider>
  );
}
