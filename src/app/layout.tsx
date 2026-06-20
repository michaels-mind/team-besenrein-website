import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/common/Navbar";

const mulish = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Team Besenrein | Entrümpelung & Umzüge in Nienburg",
  description:
    "Professionelle Entrümpelung, Umzüge und Haushaltsauflösungen zum Festpreis. Sauber, schnell und diskret.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className={mulish.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}