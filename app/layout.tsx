import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Breadcrumb - Leave a trail of why",
  description: "A dead-simple tool to log decisions with context. For the 'why did we do this?' moment 6 months later.",
  openGraph: {
    title: "Breadcrumb - Leave a trail of why",
    description: "A dead-simple tool to log decisions with context. For the 'why did we do this?' moment 6 months later.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-[#e5e5e5]`}
      >
        {children}
      </body>
    </html>
  );
}
