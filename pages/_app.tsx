import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import FitContext from "@/context/FitContext";
import NavBar from "@/components/NavBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <FitContext>
        <NavBar>
          <Component {...pageProps} />
        </NavBar>
      </FitContext>
    </ChakraProvider>
  );
}
