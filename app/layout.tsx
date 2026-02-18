import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: "SunEdge IT Solution Pvt. Ltd. | Enterprise Software, IT Services & Hardware",
  description: "SunEdge IT Solution Private Limited is a DPIIT-recognized startup delivering reliable IT services, enterprise software solutions, and high-performance computer hardware products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jakarta.className}>{children}</body>
    </html>
  );
}
