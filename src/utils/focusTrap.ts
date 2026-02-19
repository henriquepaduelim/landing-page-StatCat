const focusableSelectors = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
];

export const createFocusTrap = (container: HTMLElement, onClose: () => void) => {
  const getFocusable = () =>
    Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors.join(","))).filter(
      (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
    );

  const focusables = getFocusable();
  const initialFocus = focusables[0];
  if (initialFocus) {
    initialFocus.focus();
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const items = getFocusable();
    if (items.length === 0) {
      return;
    }

    const first = items[0];
    const last = items[items.length - 1];
    if (!first || !last) {
      return;
    }
    const active = document.activeElement as HTMLElement | null;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  document.addEventListener("keydown", handleKeydown);

  return () => {
    document.removeEventListener("keydown", handleKeydown);
  };
};
