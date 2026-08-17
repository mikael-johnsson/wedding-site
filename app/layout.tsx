import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "Bernozzi Wedding",
  description: "Bröllopssida för Olivia och Simon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
