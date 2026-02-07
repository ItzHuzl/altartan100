import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Altartan 100",
  description: "Монголын алдартнуудын boost рейтинг"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="mn">
      <body>
        <header className="header">
          <h1>⭐ Altartan 100</h1>
          <nav>
            <Link href="/">Рейтинг</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/admin">Админ</Link>
          </nav>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
