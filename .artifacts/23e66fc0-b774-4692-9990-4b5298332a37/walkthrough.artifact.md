# Walkthrough - Site-Wide Mobile Optimization & Standardisation

I have performed a comprehensive mobile audit and refactored key sections across the entire website to ensure superior readability, accessibility, and consistency on all devices.

## Changes Made

### 1. Enhanced Readability (Mobile)
- **Services & Philosophy**: Replaced static SVG cards in `index.html` with dynamic HTML/CSS components. Titles now use the `Permanent Marker` font, and body text is crisp and searchable.
- **Pricing Refactor**: Converted SVG-based price lists in `pricing.html` to high-contrast HTML lists. This ensures prices are legible even on small screens.
- **Adaptive Sizing**: Utilized CSS classes with consistent padding and shadows to maintain the "high-contrast" design language across all mobile sections.

### 2. Critical Bug Fixes
- **HTML Cleanup**: Fixed a broken HTML structure in `pricing.html` where a missing closing tag and stray character were causing layout issues in the footer.
- **Z-Index Tuning**: Refined the mobile navigation drawer to prevent layering conflicts with page content.

### 3. Site-Wide Standardisation
- **Unified Footers**: Standardised the footer logic across all 5 pages (`index`, `pricing`, `cnc`, `side-projects`, `404`).
- **Copyright Sync**: Implemented a universal script and ID system (`footer-year`) to ensure the current year is automatically updated correctly on every page.

### 4. Technical Optimisation
- **SEO & Accessibility**: By switching from SVGs to HTML text, the content is now fully readable by screen readers and indexed by search engines.
- **Performance**: Removed several large SVG files from the mobile load path, resulting in faster initial rendering.

## Verification Results

### Manual Verification
- [x] **Legibility**: Tested all pages at 375px width (iPhone SE size); all text is clear and readable.
- [x] **Navigation**: Mobile drawer opens, closes, and links correctly to all sub-pages and anchors.
- [x] **Functionality**: Verified that "Fair Pricing" and other interactive cards work as intended on mobile.
- [x] **Integrity**: Confirmed that the `pricing.html` footer error is resolved.

> [!TIP]
> The site now uses a hybrid approach: beautiful SVG canvases for desktop users and lightning-fast, readable HTML components for mobile users.
