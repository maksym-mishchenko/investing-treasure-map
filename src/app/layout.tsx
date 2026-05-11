import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Investment Treasure Map",
  description: "A Stranger Things themed investment learning journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${cinzel.variable} ${inter.variable} antialiased min-h-screen relative`}
      >
        <div className="fixed inset-0 bg-black/50 pointer-events-none z-[-1]" />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
