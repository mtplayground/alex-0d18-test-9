import type { Metadata } from "next";

import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pitch } from "@/components/sections/pitch";
import { readPublicEnv } from "@/lib/env";

const pageTitle = "Agent Team for Founders";
const pageDescription =
  "You just talk, we handle the rest. Turn founder conversations into shipped software.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/",
    siteName: pageTitle,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function Home() {
  const { ctaUrl } = readPublicEnv();

  return (
    <>
      <Header ctaUrl={ctaUrl} />
      <main id="main-content" className="bg-background" tabIndex={-1}>
        <Hero ctaUrl={ctaUrl} />
        <Pitch />
        <HowItWorks />
        <CTA ctaUrl={ctaUrl} />
      </main>
      <Footer />
    </>
  );
}
