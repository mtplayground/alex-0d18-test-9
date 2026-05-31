import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { readPublicEnv } from "@/lib/env";
import "./globals.css";

const { siteUrl } = readPublicEnv();
const siteName = "Agent Team for Founders";
const siteDescription = "You just talk, we handle the rest.";
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: new URL("/opengraph-image", siteUrl).toString(),
  description: siteDescription,
};
const organizationJsonLdScript = JSON.stringify(organizationJsonLd).replace(
  /</g,
  "\\u003c",
);

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteName,
  description: siteDescription,
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: "/",
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationJsonLdScript }}
        />
        {children}
      </body>
    </html>
  );
}
