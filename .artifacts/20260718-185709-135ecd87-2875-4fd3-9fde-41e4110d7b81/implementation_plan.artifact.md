# Implementation Plan - Restructure and Custom 404

This plan outlines the restructure of the About section, the addition of a new Philosophy section, and the creation of a custom 404 page for the upcoming Pricing section.

## User Review Required

> [!IMPORTANT]
> - I am setting the "Pricing" links to `404.html` for now, as requested.
> - I am estimating the positional coordinates for the Philosophy section clickable overlay.
> - The 404 page will use the site's signature fonts (`Road Rage`, `Permanent Marker`) and floating cloud/heart animations to stay on-brand.

## Proposed Changes

### Core Content

#### [NEW] [404.html](file:///D:/Coding/Synontech/Websites/Bruce_Gordon/404.html)
- Create a nice 404 page with a "Lost in the Clouds" theme.
- Use `Hero Screen - Element - Cloud.svg` and `Hero Screen - Element - Heart.svg` with floating animations.
- Include a "BACK TO HOME" button.

#### [index.html](file:///D:/Coding/Synontech/Websites/Bruce_Gordon/index.html)
- **Nav**: Add "Pricing" link pointing to `404.html`.
- **About**:
    - Desktop: Replace layers with `About Screen - Element - Text.svg` and `About Screen - Element - About.svg`.
    - Mobile: Replace section content with new assets/layout (if applicable) or a simplified version of the revamp.
- **Philosophy Section [NEW]**:
    - Add under Work section.
    - Desktop: Use 1920x1080 canvas with `Philosophy Screen - Element - Philosophy.svg` and the 5 Card assets.
    - Mobile: Use a grid layout for the 5 Card assets.
    - Add overlay to Card 3 ("Fair Pricing") linking to `404.html`.
- **Footer**: Add "Pricing" link pointing to `404.html`.

#### [side-projects.html](file:///D:/Coding/Synontech/Websites/Bruce_Gordon/side-projects.html)
- Add "Pricing" to the navigation menu (pointing to `404.html`).

---

### Styles and Assets

#### [styles.css](file:///D:/Coding/Synontech/Websites/Bruce_Gordon/styles.css)
- Add styles for `.philosophy-section` and its responsive behavior.
- Add positional styles for the Philosophy card overlays.
- Add styles for the `404-page` container and animations.

---

## Verification Plan

### Manual Verification
- **Visual Inspection**: Ensure the new About and Philosophy sections look correct on both desktop and mobile.
- **Responsive Test**: Verify the transition between desktop canvas and mobile native layouts.
- **Link Check**: Verify all "Pricing" links lead to the custom 404 page.
- **404 Page**: Check the animations and "Back to Home" button on the 404 page.
