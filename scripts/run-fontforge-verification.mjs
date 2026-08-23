import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const outputDirectory = mkdtempSync(join(projectRoot, ".fontforge-verify-"));
const sources = [
  "scripts/verify-all-fonts.ts",
  "lib/fontforge/converter.ts",
  "lib/fontforge/detector.ts",
  "lib/fontforge/tableParser.ts",
  "lib/fontforge/types.ts",
  "lib/fontforge/wasmLoader.ts",
];

try {
  execFileSync(
    process.execPath,
    [
      "node_modules/typescript/bin/tsc",
      "--ignoreConfig",
      "--outDir",
      outputDirectory,
      "--module",
      "commonjs",
      "--target",
      "es2020",
      "--moduleResolution",
      "node",
      "--ignoreDeprecations",
      "6.0",
      "--esModuleInterop",
      "--skipLibCheck",
      "--lib",
      "es2020,dom",
      "--types",
      "node",
      ...sources,
    ],
    { cwd: projectRoot, stdio: "inherit" }
  );

  execFileSync(process.execPath, [join(outputDirectory, "scripts", "verify-all-fonts.js")], {
    cwd: projectRoot,
    stdio: "inherit",
  });
} finally {
  if (existsSync(outputDirectory)) {
    rmSync(outputDirectory, { recursive: true, force: true });
  }
}
