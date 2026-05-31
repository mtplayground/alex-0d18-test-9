import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pitch } from "@/components/sections/pitch";
import { readPublicEnv } from "@/lib/env";

export default function Home() {
  const { ctaUrl } = readPublicEnv();

  return (
    <>
      <main className="bg-background">
        <Hero ctaUrl={ctaUrl} />
        <Pitch />
        <HowItWorks />
        <CTA ctaUrl={ctaUrl} />
      </main>
      <Footer />
    </>
  );
}
