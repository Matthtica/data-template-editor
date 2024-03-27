"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
      >
        <QueryClientProvider client={queryClient}>
          <body className={inter.className}>
            {children}
            <Toaster />
          </body>
        </QueryClientProvider>
      </ThemeProvider>
    </html>
  );
}
