import type { LucideIcon } from "lucide-react";
import { ClipboardList, Code2, Rocket, Settings2 } from "lucide-react";

import { cn } from "@/lib/utils";

type HowItWorksStep = Readonly<{
  title: string;
  detail: string;
  Icon: LucideIcon;
}>;

export const howItWorksSteps: readonly HowItWorksStep[] = [
  {
    title: "Planning",
    detail: "Clarify the goal, constraints, and the next useful slice.",
    Icon: ClipboardList,
  },
  {
    title: "Building",
    detail:
      "Turn the plan into working product code with clear handoff points.",
    Icon: Code2,
  },
  {
    title: "Deploying",
    detail: "Prepare the release path and ship the completed change.",
    Icon: Rocket,
  },
  {
    title: "Operating",
    detail:
      "Keep the shipped work observable, maintainable, and ready to evolve.",
    Icon: Settings2,
  },
];

export type HowItWorksProps = Readonly<{
  className?: string;
}>;

export function HowItWorks({ className }: HowItWorksProps) {
  return (
    <section
      aria-labelledby="how-it-works-title"
      className={cn("bg-background px-6 py-16 sm:py-20 lg:px-8", className)}
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="m-0 text-sm font-semibold uppercase tracking-normal text-muted">
            Planning → Building → Deploying → Operating
          </p>
          <h2
            id="how-it-works-title"
            className="mt-3 text-3xl font-semibold leading-tight text-foreground sm:text-4xl"
          >
            How It Works
          </h2>
        </div>

        <ol className="mt-10 grid gap-4 md:grid-cols-4">
          {howItWorksSteps.map(({ title, detail, Icon }, index) => (
            <li
              key={title}
              className="relative rounded-lg border border-border bg-panel p-6 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="grid size-11 place-items-center rounded-md bg-primary text-primary-foreground">
                  <Icon aria-hidden="true" className="size-5" />
                </div>
                <span className="text-sm font-semibold text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-foreground">
                {title}
              </h3>
              <p className="mt-4 text-base leading-7 text-muted">{detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
