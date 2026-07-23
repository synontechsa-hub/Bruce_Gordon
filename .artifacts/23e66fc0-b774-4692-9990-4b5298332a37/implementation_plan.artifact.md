# Implementation Plan - Site-Wide Mobile Optimization Audit

This plan addresses several responsiveness and readability issues found across all pages of the website to ensure a premium experience on mobile devices.

## User Review Required

> [!IMPORTANT]
> - **Pricing Section**: I am proposing to switch the mobile pricing lists from SVG images to HTML lists. This is critical because the text in the current SVGs is too small to read on phones.
> - **Services & Philosophy Cards**: I will also refactor these into HTML components on mobile for better accessibility and clarity.
> - **Bug Fix**: I found broken HTML code in the mobile section of `pricing.html` that needs immediate fixing.

## Proposed Changes

### 1. `index.html` Optimization
- **Services Section (Mobile)**: Replace the 4 card SVGs with HTML/CSS cards using `Permanent Marker` font for titles and clean body text.
- **Philosophy Section (Mobile)**: Replace the 5 philosophy card SVGs with HTML/CSS components.
- **Visual Consistency**: Ensure all mobile section titles use the signature SVG headings consistently.

### 2. `pricing.html` Refactor
- **Fix Broken HTML**: Close the dangling `div` and fix the syntax error near the footer.
- **HTML Pricing Lists**: Replace `Pricing Screen - Element - Text - Graphic Design.svg` and `Web Design.svg` with actual HTML `<ul>` lists on mobile. This ensures users can actually see the prices.
- **Disclaimer**: Convert the disclaimer SVG to a styled HTML block.

### 3. Site-Wide Consistency
- **Unified Footers**: Synchronize the footer logic across `index.html`, `pricing.html`, `cnc.html`, and `side-projects.html`.
- **Copyright Script**: Use a single consistent ID (`footer-year`) and script across all pages for the automatic year update.

### 4. `styles.css` Updates
- Add shared classes for mobile cards (`m-feature-card`) and lists to avoid code duplication.
- Refine z-index for mobile navigation to prevent overlap issues.

---

## Verification Plan

### Manual Verification
- **Pricing Readability**: Verify that all prices are easily readable on a standard mobile screen size.
- **Card Layouts**: Check that Services and Philosophy cards stack correctly on mobile.
- **Bug Fix Check**: Ensure `pricing.html` no longer has rendering artifacts in the footer.
- **Link Integrity**: Test navigation between all pages on mobile.
