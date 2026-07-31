# Fix Mobile UI Scaling Issues (Philosophy Section & Footer)

Address issues where the "Philosophy" heading and footer buttons appear extremely small on mobile devices.

## User Review Required

> [!IMPORTANT]
> I will be creating several new SVG assets in `assets/mobile_elements/` by cropping the existing desktop full-canvas SVGs. This is necessary because the current assets have large amounts of transparent padding designed for a 1920x1080/400 canvas, which causes them to scale down into "specks" on small screens.

## Proposed Changes

### Assets

#### [NEW] [element_philosophy.svg](file:///D:/Coding/Synontech/Websites/Bruce_Gordon/assets/mobile_elements/philosophy_screen/element_philosophy.svg)
- Cropped version of the Philosophy heading SVG for mobile use.

#### [NEW] [btn_pricing.svg](file:///D:/Coding/Synontech/Websites/Bruce_Gordon/assets/mobile_elements/footer/btn_pricing.svg)
- Cropped version of the Pricing button for the footer.

#### [NEW] [btn_contact.svg](file:///D:/Coding/Synontech/Websites/Bruce_Gordon/assets/mobile_elements/footer/btn_contact.svg)
- Cropped version of the Contact button for the footer.

#### [NEW] [btn_patreon.svg](file:///D:/Coding/Synontech/Websites/Bruce_Gordon/assets/mobile_elements/footer/btn_patreon.svg)
- Cropped version of the Patreon button for the footer.

#### [NEW] [btn_cnc_work.svg](file:///D:/Coding/Synontech/Websites/Bruce_Gordon/assets/mobile_elements/footer/btn_cnc_work.svg)
- Cropped version of the CNC Work button for the footer.

---

### Components

#### [MODIFY] [index.html](file:///D:/Coding/Synontech/Websites/Bruce_Gordon/index.html)
- Update Philosophy section heading to use the new `assets/mobile_elements/philosophy_screen/element_philosophy.svg`.
- Update Footer to use mobile-specific assets from `assets/mobile_elements/footer/` for all buttons.

#### [MODIFY] [pricing.html](file:///D:/Coding/Synontech/Websites/Bruce_Gordon/pricing.html)
- Update Footer to use mobile-specific assets.

#### [MODIFY] [projects.html](file:///D:/Coding/Synontech/Websites/Bruce_Gordon/projects.html)
- Update Footer to use mobile-specific assets.

#### [MODIFY] [side-projects.html](file:///D:/Coding/Synontech/Websites/Bruce_Gordon/side-projects.html)
- Update Footer to use mobile-specific assets.

#### [MODIFY] [cnc.html](file:///D:/Coding/Synontech/Websites/Bruce_Gordon/cnc.html)
- Update Footer to use mobile-specific assets.

---

### Styles

#### [MODIFY] [styles.css](file:///D:/Coding/Synontech/Websites/Bruce_Gordon/styles.css)
- Adjust `.m-section-title-img` or specific overrides if needed to ensure the new Philosophy SVG scales correctly.
- Ensure footer button classes handle the new SVGs properly (may need to adjust `width` or `max-width` since the source files no longer have 1920px padding).

## Verification Plan

### Manual Verification
- Visual inspection of the "Philosophy" heading on mobile.
- Visual inspection of all footer buttons on mobile.
- Ensure buttons remain centered and properly sized.
- Check that hover/active states still feel natural.
