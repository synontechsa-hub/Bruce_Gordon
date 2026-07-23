# Implementation Plan - About Section Optimization & SEO Sync

This plan addresses several issues in the "About" section, primarily focusing on mobile readability, SEO consistency, and feature parity between desktop and mobile.

## User Review Required

> [!IMPORTANT]
> - I am proposing to switch the **mobile** About text from an SVG image to standard HTML text. This will use the same `Permanent Marker` font to maintain the aesthetic while ensuring it is readable on all screen sizes.
> - I will sync the "hidden" SEO text with the actual visible content. Currently, they are completely different.

## Open Questions

> [!NOTE]
> - Do you have specific social media icons (SVGs) for the mobile About section, or should I use the same "overlay" approach (which won't work well without a canvas) or generic icons?
> - For now, I will add them as standard links with the signature styling.

## Proposed Changes

### Core Content

#### [MODIFY] [index.html](file:///D:/Coding/Synontech/Websites/Bruce_Gordon/index.html)
- **SEO Sync**: Update the `visually-hidden` div to match the 22-year professional experience text found in the About SVG.
- **Mobile About Section**:
    - Replace `About Screen - Element - Text.svg` with actual `<p>` tags containing the text.
    - Add a new "Socials" block to the mobile section to include LinkedIn, Behance, GitHub, and WhatsApp links (matching desktop).
- **Accessibility**: Update `alt` tags for About section elements.

---

### Styles

#### [MODIFY] [styles.css](file:///D:/Coding/Synontech/Websites/Bruce_Gordon/styles.css)
- **Mobile Text Styling**: Add styles for `.m-about-text` to use `Permanent Marker`, appropriate line-height, and responsive font size.
- **Mobile Socials**: Add styling for social buttons in the mobile About section to match the site's high-contrast, hand-drawn aesthetic.

---

## Verification Plan

### Automated Tests
- N/A (Visual/Content fix)

### Manual Verification
- **Mobile Readability**: Verify the "About" text is clearly legible on small screens (simulated mobile in browser).
- **SEO/Accessibility**: Inspect the `visually-hidden` content and `alt` attributes to ensure they match the visible text.
- **Feature Parity**: Verify social links are now present and working on both mobile and desktop.
- **Visual Consistency**: Ensure the new HTML text on mobile matches the "vibe" of the desktop SVG.
