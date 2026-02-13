import type { Metadata } from "next";
import "./globals.css";

import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "SunEdge IT Solution | Futuristic Technology Partner",
  description:
    "Premium futuristic corporate technology website for SunEdge IT Solution."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
