import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GOO Delivery",
  description: "Livraison rapide, moderne et fiable au Cameroun.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
