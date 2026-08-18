export interface FontPreviewInstance {
  family: string;
  fontFace: FontFace;
  dispose: () => void;
}

export async function createFontPreview(
  buffer: ArrayBuffer,
  originalFamilyName = "CustomFont"
): Promise<FontPreviewInstance | null> {
  if (typeof window === "undefined" || !("FontFace" in window)) {
    return null;
  }

  // Create unique, non-colliding font family name
  const safeName = originalFamilyName.replace(/[^a-zA-Z0-9_-]/g, "");
  const uniqueFamily = `bg-specimen-${safeName}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 6)}`;

  try {
    // Clone buffer to prevent detached buffer issues if source buffer is transferred or cleared
    const clonedBuffer = buffer.slice(0);
    const fontFace = new FontFace(uniqueFamily, clonedBuffer);

    const loadedFace = await fontFace.load();
    document.fonts.add(loadedFace);

    const dispose = () => {
      try {
        if (document.fonts.has(loadedFace)) {
          document.fonts.delete(loadedFace);
        }
      } catch (err) {
        console.warn("[FontForge Preview] Error disposing font face:", err);
      }
    };

    return {
      family: uniqueFamily,
      fontFace: loadedFace,
      dispose,
    };
  } catch (err) {
    console.warn("[FontForge Preview] Failed to load preview FontFace:", err);
    return null;
  }
}
