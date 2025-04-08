import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import NextAuthProvider from "./context/AuthProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WAEC Recruitment System",
  description: "WAEC Recruitment System(WRS) is an internal web application for recruiting workers into the Council",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > <Toaster position="top-right" richColors />
        <NextAuthProvider>

          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

            {children}
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
