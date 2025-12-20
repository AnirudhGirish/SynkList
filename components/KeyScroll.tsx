// ./components/KeyScroll,tsx
"use client";
import { useEffect } from "react";

type Props = {
  amountPx?: number;
  disabled?: boolean;
};

function isInteractive(el: Element | null): boolean {
  if (!el || !(el instanceof HTMLElement)) return false;
  if (el.isContentEditable) return true;

  const tag = el.tagName;
  if (["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(tag)) return true;
  if (tag === "A") return true;

  if (
    el.closest(
      'input,textarea,select,button,a,[contenteditable=""],[contenteditable="true"],[role="button"],[role="link"],[role="switch"],[role="checkbox"],[role="menuitem"],[role="tab"]'
    )
  ) {
    return true;
  }
  return false;
}

export default function KeyScroller({ amountPx, disabled = false }: Props) {
  useEffect(() => {
    if (disabled) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return;
      if (e.altKey || e.ctrlKey || e.metaKey) return;

      const target = e.target as Element | null;
      if (isInteractive(target)) return;

      const fallback = Math.max(200, Math.round(window.innerHeight * 0.25));
      const step = amountPx ?? fallback;

      switch (e.key) {
        case " ":
        case "Spacebar":
          e.preventDefault();
          window.scrollBy({
            top: (e.shiftKey ? -1 : 1) * step,
            left: 0,
            behavior: "smooth",
          });
          break;

        case "PageDown":
          e.preventDefault();
          window.scrollBy({ top: step, left: 0, behavior: "smooth" });
          break;

        case "PageUp":
          e.preventDefault();
          window.scrollBy({ top: -step, left: 0, behavior: "smooth" });
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [amountPx, disabled]);

  return null;
}
