import type { LucideIcon } from "lucide-react";
import { GitBranch, ShieldCheck, Workflow } from "lucide-react";

import { cn } from "@/lib/utils";

type ValueProposition = Readonly<{
  title: string;
  detail: string;
  Icon: LucideIcon;
}>;

export const valuePropositions: readonly ValueProposition[] = [
  {
    title: "You own the code",
    detail:
      "GitHub-native delivery keeps source, history, and handoff under your control.",
    Icon: GitBranch,
  },
  {
    title: "End-to-end SDLC",
    detail:
      "Coverage runs from plan → operate, connecting strategy, implementation, deployment, and follow-through.",
    Icon: Workflow,
  },
  {
    title: "Production-ready & secure",
    detail:
      "Architecture, defaults, and review habits are shaped around reliability, least privilege, and safe delivery.",
    Icon: ShieldCheck,
  },
];

export type PitchProps = Readonly<{
  className?: string;
}>;

export function Pitch({ className }: PitchProps) {
  return (
    <section
      aria-labelledby="pitch-title"
      className={cn("bg-background px-6 py-16 sm:py-20 lg:px-8", className)}
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="m-0 text-sm font-semibold uppercase tracking-normal text-muted">
            Value proposition
          </p>
          <h2
            id="pitch-title"
            className="mt-3 text-3xl font-semibold leading-tight text-foreground sm:text-4xl"
          >
            Built for founder-led software delivery
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {valuePropositions.map(({ title, detail, Icon }) => (
            <article
              key={title}
              className="rounded-lg border border-border bg-panel p-6 shadow-sm"
            >
              <div className="grid size-11 place-items-center rounded-md bg-primary text-primary-foreground">
                <Icon aria-hidden="true" className="size-5" />
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-foreground">
                {title}
              </h3>
              <p className="mt-4 text-base leading-7 text-muted">{detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
