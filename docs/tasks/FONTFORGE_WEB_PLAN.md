# BGrafX FontForge Web App Plan

## Goal

Create a lightweight, browser-based font conversion tool that lives directly inside the BGrafX website.

The tool should be useful to designers, simple to use, visually consistent with BGrafX, and require no server-side font processing. Font files should remain on the user's device whenever technically possible.

## Why This Fits BGrafX

Font conversion is directly relevant to graphic design and web design, so the tool belongs naturally on the BGrafX site rather than feeling like unrelated software.

It also gives visitors a practical reason to return to BGrafX even when they are not currently looking to hire a designer.

## Recommended Stack

- **React** for the interface
- **TypeScript** for application logic and type safety
- Existing **Next.js** BGrafX project as the host application
- Browser File APIs for loading and downloading fonts
- A client-side font library such as `fonteditor-core`, `opentype.js`, or another suitable library confirmed during implementation
- No Python backend for the web version
- No server-side file storage

The existing Python/PyQt6 desktop converter can remain separate. The web tool is a browser-native implementation rather than a direct port of the desktop application.

## Initial Supported Workflow

1. User opens the FontForge page on BGrafX.
2. User drags a font file into the converter or chooses a file manually.
3. The browser reads the file locally.
4. The app detects the source font format.
5. The user selects an available output format.
6. Conversion happens in the browser.
7. The converted font is downloaded immediately.
8. The original and converted font data are released from memory after the operation.

## Target Formats

Initial formats to investigate and support where reliable:

- TTF
- OTF
- WOFF
- WOFF2

Not every conversion direction should be enabled automatically. We must verify what the chosen browser library can safely read and write before exposing a conversion option.

For example, OTF/CFF handling may have limitations depending on the library. Unsupported or unreliable conversions should be disabled rather than producing broken font files.

## UI Concept

The page should stay extremely simple.

### Hero

**BGrafX FontForge**

Convert fonts directly in your browser.

Your font files stay on your device.

### Converter Panel

- Drag-and-drop area
- Browse button
- Detected source format
- Font name/family information if available
- Output format selector
- Convert button
- Download button/result state
- Clear/reset button

### Supporting Information

Below the converter:

- Supported formats
- Privacy explanation
- Basic usage instructions
- Font licensing reminder
- Small BGrafX services/contact CTA

## Design Direction

The tool should use the existing BGrafX visual identity rather than look like a separate generic web utility.

Use:

- Existing BGrafX typography
- Existing colour system
- Existing button styles
- Existing spacing/layout conventions
- Existing responsive behaviour
- Subtle BGrafX urban/spray-paint character where appropriate

The actual converter area should remain clean and readable. Functionality is more important than decorative treatment inside the working panel.

## Privacy Positioning

One of the tool's strongest features should be that conversion happens locally in the browser.

Suggested message:

> Your fonts stay on your device. BGrafX does not upload or store your font files.

This statement must only be used once we have verified that the final implementation truly performs all conversion client-side.

## Licensing Note

Include a short notice reminding users that converting a font does not change its licence and that they should only convert fonts they are permitted to modify or use in the desired format.

## Site Integration

Add a new **Tools** area to BGrafX.

Suggested structure:

```text
BGrafX
├── Home
├── Services
├── Work / Portfolio
├── Tools
│   └── FontForge
└── Contact
```

The homepage can later include a small **Free Design Tools** section linking to FontForge.

Do not build a large tools portal yet. FontForge should be Tool #1, but the structure should allow additional tools to be added later without redesigning the navigation.

## Possible Future BGrafX Tools

Ideas only, not part of the initial FontForge scope:

- Image resizer
- DPI / print-size calculator
- Aspect-ratio calculator
- RGB / HEX / CMYK helper
- Colour palette utility

## Implementation Phases

### Phase 1: Technical Proof of Concept

- Test candidate font libraries in the browser.
- Confirm reliable read/write support for TTF, OTF, WOFF and WOFF2.
- Verify client-side conversion on real font files.
- Confirm downloaded files open correctly in common font tools/applications.
- Decide the exact supported conversion matrix.

### Phase 2: Converter Component

- Build drag-and-drop input.
- Add format detection.
- Add output-format selection.
- Implement conversion.
- Implement generated-file download.
- Add errors and unsupported-format handling.
- Ensure temporary browser objects are cleaned up.

### Phase 3: BGrafX Integration

- Create the FontForge route/page.
- Apply BGrafX branding and responsive layout.
- Add Tools navigation.
- Add homepage/card link if appropriate.
- Add privacy and licensing copy.

### Phase 4: QA

Test:

- Chrome
- Edge
- Firefox
- Mobile browser behaviour where practical
- Small fonts
- Large font families/files
- Invalid files
- Renamed/non-font files
- Unsupported conversions
- Repeated conversions in one session

Verify that no font data is transmitted to BGrafX servers.

### Phase 5: Release

- Final visual polish
- Accessibility pass
- Basic SEO metadata
- Analytics event for tool usage without collecting font contents
- Deploy through the existing BGrafX/Vercel workflow

## Definition of Done

FontForge v1 is complete when a visitor can:

1. Open the tool from BGrafX.
2. Drop in a supported font.
3. See its detected format.
4. Choose a valid target format.
5. Convert it entirely in the browser.
6. Download a working converted font.
7. Do all of this without creating an account or uploading the font to a server.

## Important Principle

Keep version 1 small.

The purpose of FontForge is to solve one annoying designer problem extremely well: **quickly converting a font into another useful format without leaving BGrafX or installing another application.**
