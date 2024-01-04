import "@/styles/globals.css";
import type { AppProps } from "next/app";
import FitContext from "@/context/FitContext";

export function App({ Component, pageProps }: AppProps) {
  return (
    <FitContext>
      <Component {...pageProps} />
    </FitContext>
  );
}

export default App;
