import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { ThemeProvider } from "./lib/context/theme-context";
import ReduxProvider from "./lib/components/wrappers/redux-provider";
import QueryClientContainer from "./lib/components/wrappers/query-client-container";
import { ToastContainer } from "react-toastify";

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
    <QueryClientContainer>
      <ReduxProvider>
        <ThemeProvider>
          <html lang="en">
            <body
              className={`
                bg-background-light 
                dark:bg-accent-dark-500 
                text-text-light-100 
                dark:text-text-dark-900 
                transition-all duration-300 ease-in-out 
                ${rubik.className}`}
            >
              {children}
              <ToastContainer position="top-left" className="z-1000" />
            </body>
          </html>
        </ThemeProvider>
      </ReduxProvider>
    </QueryClientContainer>
  );
}
