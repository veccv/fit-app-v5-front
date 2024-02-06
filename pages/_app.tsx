import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import FitContext from "@/context/FitContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <FitContext>
        <Component {...pageProps} />
      </FitContext>
    </ChakraProvider>
  );
}
