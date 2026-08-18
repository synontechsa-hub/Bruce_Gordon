import { woff2 } from "fonteditor-core";
import type { WasmStatus } from "./types";

let wasmInitPromise: Promise<boolean> | null = null;
let currentStatus: WasmStatus = "uninitialized";
let lastError: string | null = null;

export function getWasmStatus(): WasmStatus {
  if (woff2.isInited && woff2.isInited()) {
    return "ready";
  }
  return currentStatus;
}

export function getWasmLastError(): string | null {
  return lastError;
}

export async function initWoff2Wasm(wasmUrl = "/wasm/woff2.wasm"): Promise<boolean> {
  if (woff2.isInited && woff2.isInited()) {
    currentStatus = "ready";
    return true;
  }

  if (wasmInitPromise && currentStatus === "loading") {
    return wasmInitPromise;
  }

  currentStatus = "loading";
  lastError = null;

  wasmInitPromise = (async () => {
    try {
      if (typeof window === "undefined") {
        await woff2.init();
      } else {
        await woff2.init(wasmUrl);
      }
      currentStatus = "ready";
      return true;
    } catch (err: unknown) {
      currentStatus = "error";
      const message = err instanceof Error ? err.message : String(err);
      lastError = `Failed to initialize WOFF2 WebAssembly module from "${wasmUrl}": ${message}`;
      console.error("[FontForge WASM]", lastError);
      return false;
    }
  })();

  return wasmInitPromise;
}

export function resetWasmState(): void {
  wasmInitPromise = null;
  currentStatus = "uninitialized";
  lastError = null;
}
