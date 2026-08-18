# BGrafX FontForge — Audit & Remediation Plan

**Status:** Implementation exists; hardening and verification required before treating the tool as production-ready.

**Audit date:** 2026-08-18

**Current route:** `/tools/fontforge`

## Purpose

Gemini implemented the first working version of the BGrafX browser-based font converter. The overall architecture is sensible: Next.js provides the public page and SEO shell, while font parsing, previewing, conversion, WOFF2 WebAssembly work, and downloads remain client-side.

This document records the issues found during the first post-implementation review and defines how they should be corrected. It is deliberately a **hardening plan**, not a redesign request.

Do not expand scope while fixing these items. The immediate goal is to make the existing FontForge implementation technically honest, predictable, safe, testable, and suitable for public use.

---

# Current Architecture Reviewed

The implementation currently includes:

```text
app/tools/fontforge/page.tsx

components/fontforge/
├── Dropzone.tsx
├── FontForgeApp.tsx
├── FontForgeApp.module.css
├── FontForgeGuide.tsx
├── FontInspector.tsx
├── FontPreview.tsx
└── FormatSelector.tsx

lib/fontforge/
├── converter.ts
├── detector.ts
├── previewManager.ts
├── tableParser.ts
├── types.ts
└── wasmLoader.ts

public/wasm/
└── woff2.wasm
```

The implementation also includes a font verification script and site integration through the homepage, sitemap, header/footer/navigation as applicable.

---

# Priority Summary

## P0 — Must be fixed or proven safe before public launch

1. Variable-font messaging claims a deliberate static flattening operation that the current implementation does not prove it performs.
2. “Near-lossless fidelity” is too strong for the current conversion settings and transformation path.
3. OTF output is not true preservation of arbitrary original OpenType/CFF data; the implementation currently writes a TrueType representation for OTF output.
4. Real output files must be validated with representative TTF, OTF/CFF, WOFF, WOFF2, and variable-font fixtures.
5. WOFF2 initialization and failure/retry behavior must be tested in the actual production Next.js/browser environment.

## P1 — Should be fixed before launch

6. Extension/header mismatch is detected but is not surfaced to the user in the current main workflow.
7. Variable-font detection is stronger for raw SFNT TTF/OTF than for compressed WOFF/WOFF2 inputs; the UI must not imply equal confidence across all formats.
8. CFF detection currently begins by assuming every `otf` source has CFF outlines, which is not universally true.
9. Conversion compatibility is described as broadly format-based, but actual fidelity depends on tables/outlines/features in the individual font.
10. Cleanup behavior is structurally present but needs repeat-use verification for preview FontFaces and download Object URLs.

## P2 — Quality / polish

11. Error messaging should distinguish malformed font data, unsupported features, WASM failure, and conversion failure where practical.
12. Browser support messaging should accurately reflect WebAssembly and FontFace requirements.
13. The current FontForge name is a working name only and should be reviewed separately before public branding/SEO is finalized.

---

# Detailed Findings and Fixes

## 1. Variable-font warning is too confident

### Current behavior

The compatibility layer currently says, in effect:

```text
Variable Font: ... In-browser conversion will flatten the font into a static instance;
variable axes will not be preserved.
```

### Problem

“Flatten into a static instance” describes a specific operation: choosing an instance on the variable axes and deliberately generating a static font from that instance.

The current conversion code does not demonstrate an explicit axis-selection/static-instancing pipeline. It parses the font through `fonteditor-core` and writes another representation. If variation tables are not preserved, that is **not necessarily equivalent to correct static instancing**.

A font could instead lose variation behavior, lose tables, use default values, or otherwise be transformed in a way that is library-dependent.

### Required fix

Replace the claim with technically conservative wording, for example:

```text
Variable font detected. Variation axes and related variable-font data may be
lost, altered, or unsupported during conversion. The converted font may no
longer remain variable.
```

Do not use the words “flatten” or “static instance” unless the implementation explicitly selects axis coordinates and generates a verified static instance.

### Optional future feature

A genuine variable-font-to-static-font feature could later expose axis controls and use a library/toolchain that explicitly supports instancing. That is outside the scope of this hardening pass.

---

## 2. “Near-lossless fidelity” is not justified

### Current behavior

The compatibility layer labels some paths:

```text
Fully Supported
Standard outline conversion with near-lossless fidelity.
```

### Problem

The parser/writer currently uses options including:

```text
hinting: false
compound2simple: true
```

and some paths deliberately convert through a TrueType representation.

These operations can change representation and may remove or alter data. Even if the visible glyph shapes appear correct, that is not enough to guarantee near-lossless preservation of:

- hinting;
- compound glyph structure;
- OpenType layout tables;
- variation data;
- specialized metadata;
- CFF/CFF2 information;
- other unsupported font tables.

### Required fix

Replace “near-lossless fidelity” with safer wording such as:

```text
Standard conversion path with broad compatibility.
```

or:

```text
Supported for standard font conversion. Advanced font data may not be preserved.
```

The compatibility status may still say “Supported,” but it should not promise lossless or near-lossless transformation unless verified at the table/data level.

---

## 3. OTF output semantics need correction

### Current behavior

For an OTF target, the converter currently maps the write operation to a TTF representation:

```text
const writeType = targetFormat === "otf" ? "ttf" : targetFormat;
```

The UI also notes that OTF output uses TrueType glyph outlines inside an OpenType container.

### Problem

An `.otf` file is not synonymous with “original OpenType font preserved.” OpenType can contain TrueType outlines or CFF/CFF2 PostScript outlines.

The current implementation should therefore not suggest that converting an arbitrary CFF-based OTF source to OTF preserves the original outline technology or advanced tables.

There is also a release-critical verification question: if the writer emits TTF/SFNT bytes while the downloaded filename/MIME type says `.otf`, the generated file must be checked to confirm the resulting binary is a valid OpenType/TrueType-outline font that downstream applications accept under that extension. Extension alone does not make a valid OTF product.

### Required fix

1. Verify the actual binary signature and table structure of generated OTF-target files.
2. Open generated files in representative consumers where possible.
3. If the library does not generate a valid intended OTF representation, mark OTF output unsupported rather than renaming TTF bytes.
4. Keep a visible warning that original CFF/CFF2 outline data may be converted or lost.
5. Never claim original OTF fidelity unless it is actually preserved.

---

## 4. CFF detection is over-broad for OTF

### Current behavior

Metadata extraction initializes:

```text
hasCffOutlines = originalFormat === "otf"
```

and then confirms CFF/CFF2 by checking the SFNT table directory for raw TTF/OTF buffers.

### Problem

Not every font commonly labeled `.otf` necessarily needs to be treated as CFF solely because the extension/container detection is OTF-related. The correct determination should come from actual font tables/outline data whenever possible.

The initial assumption can create warnings that are stronger than the evidence.

### Required fix

Prefer explicit table detection:

```text
CFF 
CFF2
```

for raw SFNT fonts.

If outline technology cannot be determined reliably, use an `unknown`/uncertain state instead of automatically asserting CFF.

The UI can say:

```text
OpenType source detected. Advanced OpenType/CFF data may not be preserved.
```

when certainty is unavailable.

---

## 5. Header/extension mismatch is detected but not shown

### Current behavior

`detectFontFormat()` correctly returns:

```text
isExtensionMismatch
fileExtension
detectedExtension
```

The main `FontForgeApp` currently uses only:

```text
detection.format
```

when continuing into parsing.

### Problem

The implementation plan specifically called for a warning when the extension and binary header disagree. The detector creates the information, but the current main workflow does not surface it.

### Required fix

When `isExtensionMismatch === true`:

- do not silently ignore it;
- show a non-blocking warning if the header is valid and conversion can safely continue;
- make clear that magic bytes/header detection is the source of truth;
- do not rewrite the original uploaded file;
- use the detected format for processing.

Example:

```text
File extension mismatch
This file is named .woff, but its binary header identifies it as TTF.
FontForge will treat it as TTF.
```

If a mismatched structure creates uncertainty or the parser rejects it, fail safely.

---

## 6. Variable-font inspection confidence differs by input format

### Current behavior

The custom table parser inspects raw SFNT table directories for TTF/OTF buffers and looks for variation tables such as:

```text
fvar
gvar
HVAR
VVAR
```

This is useful for uncompressed SFNT sources.

### Problem

WOFF and WOFF2 are compressed container formats. The original raw uploaded buffer is not laid out like a normal SFNT table directory in the same way the custom raw-directory parser expects.

The parsed `fonteditor-core` object may expose useful information, but the custom variable-table inspection currently has its strongest evidence only for raw TTF/OTF inputs.

### Required fix

Make detection confidence explicit internally.

Possible model:

```text
variableStatus:
- detected
- notDetected
- unknown
```

or store a metadata confidence/source field.

Do not display “not variable” merely because variation tables could not be inspected in a compressed source.

If `fonteditor-core` exposes reliable variation-table information after WOFF/WOFF2 decompression, use that. Otherwise display an uncertainty note rather than a false negative.

---

## 7. Compatibility should be data-aware, not only format-aware

### Current behavior

The converter evaluates compatibility primarily from source format, target format, variable status, and CFF status.

### Problem

Two fonts with the same extension can have very different feature sets. A basic static TTF and a complex OpenType font containing advanced shaping tables are not equally safe conversion candidates.

### Required fix

Keep the matrix simple for users, but base warnings on detected features where practical.

Potential warning categories:

- variable font data;
- CFF/CFF2 outlines;
- hinting loss;
- unsupported/unknown advanced tables;
- conversion through TTF representation;
- WOFF2 WASM dependency.

Do not promise exact table preservation unless tested.

The user-facing statuses should remain understandable:

```text
Supported
Supported with warnings
Unavailable / unsupported
```

---

## 8. WOFF2 WASM lifecycle requires production verification

### Current behavior

`wasmLoader.ts` uses a cached promise and tracks:

```text
uninitialized
loading
ready
error
```

The client app pre-initializes WOFF2 on mount.

This is a sound design direction.

### Remaining risks to verify

- `/wasm/woff2.wasm` resolves correctly after production deployment;
- Next.js static asset handling returns the expected binary;
- repeated calls reuse initialized state;
- failed initialization does not leave the UI permanently confused;
- retry/reload behavior is understandable;
- WOFF2 input and WOFF2 output both behave correctly;
- direct navigation to `/tools/fontforge` works after a cold browser load;
- no conversion is attempted while WASM is unavailable.

### Required fix

If testing reveals that a failed initialization cannot be retried without reloading, add an explicit retry action that resets the loader state and reinitializes.

Do not quietly downgrade WOFF2 conversion to another format.

---

## 9. Resource cleanup is implemented but must be stress-tested

### Current behavior

`FontForgeApp` tracks and cleans:

- active preview FontFace;
- active download Object URL;
- active font instance reference;
- preview family state.

Cleanup occurs on reset and component unmount, and old download URLs are revoked before generating a new conversion.

### Positive assessment

This is substantially better than a naive browser implementation.

### Remaining verification

Test repeated cycles such as:

```text
Upload A
→ preview
→ convert
→ convert again
→ reset
→ upload B
→ convert
→ replace
→ repeat 20+ times
```

Confirm:

- old FontFaces disappear from `document.fonts`;
- object URLs are revoked;
- preview family names do not collide;
- previous font previews do not affect the new font;
- downloads still work before their URL is revoked;
- no obvious unbounded browser memory growth occurs.

Do not prematurely revoke the current successful download URL before the user can use it.

---

## 10. Preview fallback behavior must remain isolated

### Requirement

The preview must never alter global BGrafX typography or CSS variables.

Verify that:

- every temporary FontFace uses a unique generated family;
- failure to load a font leaves the rest of the page intact;
- clearing/replacing the font removes the old face;
- preview text falls back safely if `FontFace` is unsupported or rejects the binary.

No uploaded font should ever be registered under a common family name that could collide with the site UI.

---

## 11. Privacy claim must match actual network behavior

### Current claim

FontForge is presented as 100% browser-side/private.

### Requirement

This claim is valuable and should remain, but it creates a strict implementation contract.

Font-related information must not be transmitted through:

- API routes;
- server actions;
- Vercel functions;
- analytics event payloads;
- error-reporting payloads;
- third-party APIs;
- external font-processing services.

This includes:

- original font bytes;
- converted font bytes;
- ArrayBuffers;
- glyph information;
- font names/metadata derived from the uploaded font, unless the user explicitly chooses to transmit them in a future feature.

Loading the static application and bundled `/wasm/woff2.wasm` asset is compatible with the privacy claim.

### Required verification

Use browser DevTools Network while uploading, previewing, and converting fonts. Confirm no font-derived request leaves the browser.

---

## 12. Error categories should be clearer

### Current behavior

Most parser/converter errors are safely caught and shown rather than crashing the entire page. This is good.

### Improvement

Where practical, distinguish:

```text
Unsupported file type
Corrupt/truncated font
Unsupported font collection
WOFF2 module unavailable
Font parsed but requested output is unsupported
Conversion failed
Preview failed
```

The tool should remain human-readable and should never expose a giant raw JS/WASM stack trace to normal users.

Developer logging may retain additional context without logging font data.

---

## 13. Font collection handling is correctly rejected and should remain explicit

### Current behavior

`ttcf` collections are rejected with a clear message.

### Assessment

This is correct for v1.0 of the browser tool. Supporting TTC/OTC collections would introduce face selection and output semantics that are outside the current scope.

### Required action

Keep collections unsupported for now. Add them to documentation/FAQ as explicitly unsupported rather than allowing users to think the upload failed mysteriously.

---

## 14. The 20 MB limit is reasonable but must be enforced before parsing

### Current behavior

The app checks file size before reading/parsing through the converter workflow.

### Assessment

Good.

### Required verification

Test:

- 0-byte file;
- just below 20 MB;
- exactly 20 MB where practical;
- just above 20 MB.

Oversized files must be rejected before WASM/font parsing begins.

---

## 15. Download output must be validated as a font, not only as a Blob

### Current behavior

The converter creates a Blob with format-appropriate MIME type, sanitized filename, and Object URL.

### Problem

A Blob existing successfully does not prove that the font bytes inside it represent a valid, usable font of the claimed target format.

### Required verification

For every supported conversion path:

1. create the output;
2. inspect its magic/header where applicable;
3. parse the generated output again using the converter/parser where possible;
4. load it through `FontFace` in the browser;
5. visually verify representative glyphs;
6. open representative downloads in desktop tooling where practical.

If a target cannot consistently pass round-trip validation, mark that target/path unsupported.

---

# Specific Test Matrix

Use real, legally testable fixture fonts.

## Input fixtures

At minimum:

- static TTF;
- static OTF with CFF/CFF2 outlines;
- OpenType font with TrueType outlines if available;
- WOFF;
- WOFF2;
- variable TTF;
- variable WOFF2 if available;
- malformed/truncated font;
- valid font with deliberately incorrect extension;
- TTC/OTC collection;
- 0-byte file;
- file over 20 MB.

## Conversion paths

Validate every path the UI claims to support, including:

```text
TTF  → WOFF
TTF  → WOFF2
TTF  → OTF target
OTF  → TTF
OTF  → WOFF
OTF  → WOFF2
WOFF → TTF
WOFF → WOFF2
WOFF2 → TTF
WOFF2 → WOFF
```

Do not infer success merely because one conversion path works.

Same-format conversion should remain unavailable unless a future optimization/repackaging feature is intentionally added.

---

# Automated Verification

Run the existing project checks after fixes:

```bash
npm run typecheck
npm run lint
npm run build
```

Run the FontForge-specific verification script if it remains in the project and ensure its fixtures are valid and legally distributable/testable.

Where possible, add focused unit tests for:

- magic-byte detection;
- TTC rejection;
- extension mismatch reporting;
- filename sanitization;
- compatibility warnings;
- variable-font metadata states;
- WOFF2 loader state transitions;
- same-format rejection;
- output header validation.

---

# Browser Verification

Test at least Chromium-based desktop plus one additional browser engine where practical.

Mandatory browser checks:

- direct route load;
- client hydration;
- dropzone upload;
- keyboard-only upload;
- drag/drop;
- preview editing;
- preview size slider;
- format selection;
- conversion status announcement;
- successful download;
- reset;
- repeated file replacement;
- malformed file handling;
- mobile/narrow layout;
- WOFF2 cold-load initialization;
- privacy/network inspection.

---

# Accessibility Acceptance

Confirm:

- drag/drop is not the only upload path;
- upload is keyboard accessible;
- format controls are keyboard accessible;
- focus states are visible;
- errors use an accessible alert/status mechanism;
- conversion progress/success/failure is announced;
- slider has an accessible name and current value;
- buttons do not rely only on iconography;
- warning text has sufficient contrast and is not conveyed by colour alone.

---

# Recommended Fix Order

## Pass 1 — Truthful behavior and messaging

1. Correct variable-font warning.
2. Remove “near-lossless fidelity.”
3. Correct CFF/OTF detection semantics.
4. Surface extension mismatch warnings.
5. Clarify variable detection uncertainty for compressed formats.

## Pass 2 — Output correctness

6. Validate OTF target behavior.
7. Round-trip validate all target outputs.
8. Mark unreliable paths unsupported.
9. Make compatibility warnings reflect actual supported behavior.

## Pass 3 — Runtime hardening

10. Verify WOFF2 WASM cold start, failure, and retry.
11. Stress-test preview/Object URL cleanup.
12. Improve user-facing error categories.
13. Verify privacy claim through network inspection.

## Pass 4 — QA and production readiness

14. Run full fixture matrix.
15. Run TypeScript/lint/build checks.
16. Run browser/accessibility checks.
17. Recheck metadata, canonical route, sitemap, and public copy after the working product name is finalized.

---

# Scope Control

During this remediation pass, do **not** add:

- server-side font processing;
- file uploads;
- databases;
- authentication;
- accounts;
- cloud storage;
- batch font conversion;
- TTC/OTC face extraction;
- variable-axis instancing controls;
- font editing;
- glyph editing;
- kerning editors;
- font-subsetting UI;
- unrelated website redesigns.

Those can be future features if justified.

---

# Definition of Done

FontForge is ready for public use when:

- [ ] variable-font messaging is technically accurate;
- [ ] no “lossless” or “near-lossless” claim exceeds verified behavior;
- [ ] OTF target output has been proven valid or removed/disabled;
- [ ] CFF/CFF2 warnings are based on reliable evidence where possible;
- [ ] extension/header mismatch is surfaced to users;
- [ ] variable-font uncertainty on compressed formats is handled honestly;
- [ ] every advertised conversion path passes real fixture testing;
- [ ] generated files round-trip parse/load successfully;
- [ ] WOFF2 WASM works after a cold production load;
- [ ] WOFF2 failure is handled cleanly;
- [ ] repeated conversions do not leave obvious preview/Object URL leaks;
- [ ] malformed fonts fail safely without crashing the page;
- [ ] TTC/OTC rejection remains clear;
- [ ] 20 MB limit is correctly enforced before parsing;
- [ ] no uploaded or derived font data leaves the browser;
- [ ] keyboard/accessibility workflow is verified;
- [ ] `npm run typecheck` passes;
- [ ] `npm run lint` passes;
- [ ] `npm run build` passes;
- [ ] production browser smoke tests pass.

The guiding rule for this release is:

> **Do not promise more fidelity than the conversion engine can prove.**
