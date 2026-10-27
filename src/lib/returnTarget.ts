/**
 * Remembers which Home section the visitor came from, so that going back
 * (via the "Indietro" button or the browser's back button) lands on that
 * section instead of the top of the page. Kept in sessionStorage so it
 * survives reloads of the detail page but not new tabs.
 */
const KEY = "home-return-target";

export function setReturnTarget(id: string) {
  try {
    sessionStorage.setItem(KEY, id);
  } catch {
    /* storage unavailable (private mode): back will simply land on top */
  }
}

export function peekReturnTarget(): string | null {
  try {
    return sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function clearReturnTarget() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
