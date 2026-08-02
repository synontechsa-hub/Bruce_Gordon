import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  globalIgnores([
    ".next/**", "node_modules/**", ".artifacts/**", "assets/**", "concept_art/**",
    "cape-and-blade/**", "Forma-website/**", "NexusAI-website/**", "onyx-and-ivy/**",
    "origin-root/**", "Solstice-website/**", "Vela-website/**", "veloce-systems/**",
    "*.html", "script.js"
  ])
]);
