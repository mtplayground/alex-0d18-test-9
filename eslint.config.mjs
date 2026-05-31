import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "next-env.d.ts",
      "package-lock.json",
    ],
  },
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:tailwindcss/recommended",
  ),
  {
    settings: {
      tailwindcss: {
        callees: ["cn", "cva"],
        config: `${__dirname}/tailwind.config.ts`,
      },
    },
    rules: {
      "tailwindcss/no-custom-classname": "off",
    },
  },
];

export default eslintConfig;
