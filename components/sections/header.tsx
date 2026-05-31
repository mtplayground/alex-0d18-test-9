import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const wordmark = "Agent Team for Founders";

export type HeaderProps = Readonly<{
  ctaUrl: string;
  className?: string;
}>;

export function Header({ ctaUrl, className }: HeaderProps) {
  return (
    <header
      className={cn(
        "border-b border-border bg-background px-6 py-4 lg:px-8",
        className,
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-foreground"
        >
          Skip to content
        </a>
        <Link
          href="/"
          aria-label={`${wordmark} home`}
          className="min-w-0 text-base font-semibold text-foreground underline-offset-4 hover:underline"
        >
          {wordmark}
        </Link>
        <Button asChild size="sm">
          <a href={ctaUrl}>Start building</a>
        </Button>
      </div>
    </header>
  );
}
