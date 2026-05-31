import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pitch } from "@/components/sections/pitch";

const ctaUrl = "https://example.com/start";

describe("landing page sections", () => {
  it("renders Hero copy and CTA link", () => {
    render(<Hero ctaUrl={ctaUrl} />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Agent Team for Founders",
      }),
    ).toBeTruthy();
    expect(screen.getByText("You just talk, we handle the rest")).toBeTruthy();
    expect(
      screen.getByText(/planned, shipped, and operated software/i),
    ).toBeTruthy();
    expect(
      screen
        .getByRole("link", { name: /start building/i })
        .getAttribute("href"),
    ).toBe(ctaUrl);
  });

  it("renders Pitch value cards", () => {
    render(<Pitch />);

    expect(
      screen.getByRole("heading", {
        name: "Built for founder-led software delivery",
      }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: "You own the code" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: "End-to-end SDLC" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: "Production-ready & secure" }),
    ).toBeTruthy();
    expect(screen.getByText(/GitHub-native delivery/i)).toBeTruthy();
  });

  it("renders HowItWorks sequence", () => {
    render(<HowItWorks />);

    expect(
      screen.getByText("Planning → Building → Deploying → Operating"),
    ).toBeTruthy();
    for (const step of ["Planning", "Building", "Deploying", "Operating"]) {
      expect(screen.getByRole("heading", { name: step })).toBeTruthy();
    }
  });

  it("renders CTA band copy and link", () => {
    render(<CTA ctaUrl={ctaUrl} />);

    expect(
      screen.getByRole("heading", { name: "Start building today" }),
    ).toBeTruthy();
    expect(screen.getByText(/turn it into shipped software/i)).toBeTruthy();
    expect(
      screen
        .getByRole("link", { name: /start building/i })
        .getAttribute("href"),
    ).toBe(ctaUrl);
  });

  it("renders Footer wordmark, copyright, and optional GitHub link", () => {
    const githubHref = "https://github.com/mtplayground/alex-0d18-test-9";

    render(<Footer year={2026} githubHref={githubHref} />);

    expect(
      screen.getAllByText("Agent Team for Founders").length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByText(
        "Copyright 2026 Agent Team for Founders. All rights reserved.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByRole("link", { name: "GitHub" }).getAttribute("href"),
    ).toBe(githubHref);
  });
});
