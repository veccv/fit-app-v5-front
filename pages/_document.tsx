import { Head, Html, Main, NextScript } from "next/document";
import { cn, fontSans } from "@/lib/utils";

export default function Document() {
  return (
    <Html>
      <Head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
