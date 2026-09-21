import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pratik Janrao & Associates | Chartered Accountants, Pune",
  description: "Audit, taxation, GST, accounting and business advisory services for businesses in India and Dubai.",
  icons: {
    icon: "/favicon-pja.svg",
    shortcut: "/favicon-pja.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
