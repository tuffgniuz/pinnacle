import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { ThemeProvider } from "./lib/context/theme-context";
import "./globals.css";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pinnacle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body
          className={`bg-background-light dark:bg-background-dark text-text-light-100 dark:text-text-dark-900 transition-all duration-300 ease-in-out ${rubik.className}`}
        >
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
