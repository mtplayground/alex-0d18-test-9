import { cn } from "@/lib/utils";

const footerWordmark = "Agent Team for Founders";

export type FooterProps = Readonly<{
  year?: number;
  githubHref?: string;
  className?: string;
}>;

export function Footer({
  year = new Date().getFullYear(),
  githubHref,
  className,
}: FooterProps) {
  return (
    <footer
      className={cn(
        "border-t border-border bg-background px-6 py-8 lg:px-8",
        className,
      )}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <div>
          <p className="m-0 font-semibold text-foreground">{footerWordmark}</p>
          <p className="mt-2 text-sm">
            Copyright {year} {footerWordmark}. All rights reserved.
          </p>
        </div>
        {githubHref ? (
          <a
            href={githubHref}
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            GitHub
          </a>
        ) : null}
      </div>
    </footer>
  );
}
