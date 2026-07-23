# Implementation Plan - About Section Decorative Elements

This plan outlines the integration of remaining decorative SVG elements into the "About" section to match the full design mock-up.

## User Review Required

> [!IMPORTANT]
> - I am adding 6 new decorative SVG layers to the desktop "About" canvas.
> - These elements will be layered behind the main text and buttons to ensure readability and interactivity are preserved.
> - I will check if any of these are suitable for the mobile layout, although the current mobile layout is intentionally cleaner/text-focused.

## Proposed Changes

### Core Content

#### [MODIFY] [index.html](file:///D:/Coding/Synontech/Websites/Bruce_Gordon/index.html)
- **About Canvas**: Add the following elements as new layers:
    - `About Screen - Element - BG.svg` (Decorative vector background overlay)
    - `About Screen - Element - Profile.svg` (Character/Portrait element)
    - `About Screen - Element - Side Profile.svg` (Secondary portrait element)
    - `About Screen - Element - Tablet.svg` (Tech/Design element)
    - `About Screen - Element - Pencil.svg` (Design element)
    - `About Screen - Element - Code.svg` (Development element)

### Styles

#### [MODIFY] [styles.css](file:///D:/Coding/Synontech/Websites/Bruce_Gordon/styles.css)
- **Z-Index Management**: Ensure proper stacking order so that the decorative elements don't obscure text or clickable buttons.
- **Float Animations (Optional)**: If applicable, add subtle floating animations to tech elements (Pencil, Tablet, Code) to match the Hero section's vibe.

---

## Verification Plan

### Manual Verification
- **Visual Alignment**: Confirm that all elements appear in their intended positions according to the mock-up.
- **Readability**: Ensure the main "About" text remains easy to read against the new background elements.
- **Interactivity**: Verify that social buttons and portfolio links are still clickable and not covered by the new layers.
