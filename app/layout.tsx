import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Reveal from "./reveal";
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
  metadataBase: new URL("https://bareunshanpo.vercel.app"),
  title: {
    default: "바른한포 — 시니어 맞춤 영양제 구독",
    template: "%s | 바른한포",
  },
  description: "식약처 공공데이터 기반 시니어 맞춤 영양제 구독 서비스. 건강 MBTI로 부모님께 딱 맞는 영양제를 추천하고 복용약 안전까지 확인합니다.",
  keywords: ["시니어 영양제", "부모님 영양제", "영양제 구독", "건강기능식품", "식약처", "복용약 확인"],
  openGraph: {
    title: "바른한포 — 시니어 맞춤 영양제 구독",
    description: "식약처 공공데이터 기반, 부모님께 딱 맞는 영양제 구독 서비스",
    url: "https://bareunshanpo.vercel.app",
    siteName: "바른한포",
    locale: "ko_KR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Reveal />
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}