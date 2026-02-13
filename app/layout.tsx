import type { Metadata } from "next";
import "./globals.css";

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
    </html>
  );
}
