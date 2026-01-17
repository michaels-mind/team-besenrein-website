import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Team Besenrein | Entrümpelung & Umzüge in Nienburg",
  description: "Professionelle Entrümpelung, Umzüge und Haushaltsauflösungen zum Festpreis. Sauber, schnell und diskret.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
