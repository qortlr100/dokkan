import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DRAGONBALL Z 폭렬격전",
  description: "드래곤볼 독칸 배틀의 카드 정보를 확인할 수 있는 웹사이트입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <nav className="bg-blue-600 text-white">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-xl font-bold">DRAGONBALL Z 폭렬격전</Link>
              <div className="space-x-4">
                <Link href="/cards" className="hover:text-blue-200">카드</Link>
                <Link href="/categories" className="hover:text-blue-200">카테고리</Link>
                <Link href="/admin" className="hover:text-blue-200">관리자</Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
