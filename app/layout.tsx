"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { TemplateStorageProvider } from "@/context/TemplateStorageContext";

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
        <body className={inter.className}>
          <QueryClientProvider client={queryClient}>
            <TemplateStorageProvider>
              {children}
            </TemplateStorageProvider>
          </QueryClientProvider>
          <Toaster />
        </body>
      </ThemeProvider>
    </html>
  );
}
