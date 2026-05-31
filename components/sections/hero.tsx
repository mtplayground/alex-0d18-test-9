import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { readPublicEnv } from "@/lib/env";
import { cn } from "@/lib/utils";

export type HeroProps = Readonly<{
  ctaUrl?: string;
  className?: string;
}>;

export function Hero({
  ctaUrl = readPublicEnv().ctaUrl,
  className,
}: HeroProps) {
  return (
    <section
      aria-labelledby="hero-title"
      className={cn(
        "relative overflow-hidden bg-background px-6 py-20 sm:py-24 lg:px-8 lg:py-28",
        className,
      )}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="max-w-3xl">
          <h1
            id="hero-title"
            className="max-w-4xl text-5xl font-semibold leading-none text-foreground sm:text-6xl lg:text-7xl"
          >
            Agent Team for Founders
          </h1>
          <p className="mt-6 text-2xl font-medium leading-tight text-foreground sm:text-3xl">
            You just talk, we handle the rest
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            Turn founder conversations into planned, shipped, and operated
            software without handoffs or ceremony.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href={ctaUrl}>
                Start building
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="grid rounded-lg border border-border bg-panel p-5 shadow-panel"
        >
          <div className="grid gap-4">
            <div className="rounded-md border border-border bg-background p-4">
              <p className="m-0 text-sm font-semibold text-foreground">
                You talk
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Share goals, blockers, and decisions in plain language.
              </p>
            </div>
            <div className="rounded-md bg-primary p-4 text-primary-foreground">
              <p className="m-0 text-sm font-semibold">We handle the rest</p>
              <p className="mt-2 text-sm leading-6 text-primary-foreground/80">
                The work moves from conversation to shipped software.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
