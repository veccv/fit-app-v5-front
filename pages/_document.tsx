import { Head, Main, NextScript } from "next/document";
import "@/styles/globals.css";
import { cn, fontSans } from "@/lib/utils";

export default function Document() {
  return (
    <html lang="en" suppressHydrationWarning>
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
    </html>
  );
}
