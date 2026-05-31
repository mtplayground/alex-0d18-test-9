import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { readPublicEnv } from "@/lib/env";
import { cn } from "@/lib/utils";

export type CTAProps = Readonly<{
  ctaUrl?: string;
  className?: string;
}>;

export function CTA({ ctaUrl = readPublicEnv().ctaUrl, className }: CTAProps) {
  return (
    <section
      aria-labelledby="cta-title"
      className={cn(
        "bg-primary px-6 py-16 text-primary-foreground lg:px-8",
        className,
      )}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <h2
            id="cta-title"
            className="text-3xl font-semibold leading-tight sm:text-4xl"
          >
            Start building today
          </h2>
          <p className="mt-4 text-lg leading-8 text-primary-foreground/80">
            Bring the next product conversation and turn it into shipped
            software.
          </p>
        </div>
        <Button
          asChild
          variant="secondary"
          size="lg"
          className="w-full md:w-auto"
        >
          <a href={ctaUrl}>
            Start building
            <ArrowRight aria-hidden="true" />
          </a>
        </Button>
      </div>
    </section>
  );
}

export { CTA as CtaBand };
