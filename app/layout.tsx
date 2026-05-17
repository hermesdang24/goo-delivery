import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");
const title = "GOO Delivery | Livraison rapide au Cameroun";
const description =
  "GOO Delivery livre repas, courses, colis, documents et besoins professionnels au Cameroun. Plus rapide. Plus simple. Toujours là.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "GOO Delivery",
  keywords: [
    "GOO Delivery",
    "livraison Cameroun",
    "livraison repas",
    "livraison colis",
    "livraison WhatsApp",
  ],
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "GOO Delivery",
    type: "website",
    locale: "fr_CM",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GOO Delivery - Plus rapide. Plus simple. Toujours là.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#22c55e",
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