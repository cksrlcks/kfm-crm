import localFont from "next/font/local";
import { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "KFM CRM",
  description: "한국유체기계 고객관리시스템",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
