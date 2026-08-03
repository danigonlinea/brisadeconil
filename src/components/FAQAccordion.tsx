/**
 * FAQAccordion — React island with accessible accordion.
 * Uses aria-expanded + aria-controls pattern.
 */
import { useEffect, useState, useId } from "react";
import { trackEvent } from "../lib/analytics";

interface FAQItem {
  q: string;
  a: string;
  pending?: boolean;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

function FAQItem({
  item,
  id,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  id: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
      <button
        id={`${id}-btn`}
        className="faq-trigger"
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        onClick={onToggle}
        type="button"
      >
        <span className="faq-question" data-i18n={`faq.item.${index}.q`}>
          {item.q}
        </span>
        <span className="faq-chevron" aria-hidden="true">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 250ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-btn`}
        className="faq-panel"
        style={{ display: isOpen ? "block" : "none" }}
      >
        <div className="faq-answer">
          {item.pending ? (
            <span className="faq-pending">
              <span data-i18n={`faq.item.${index}.a`}>
                {item.a.replace(/\[PENDIENTE[^\]]*\]\.\?/, "").trim()}
              </span>{" "}
              <span className="placeholder-badge" data-i18n="faq.pending-badge">
                Pendiente
              </span>
            </span>
          ) : (
            <span data-i18n={`faq.item.${index}.a`}>{item.a}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const baseId = useId();
  const [openIndices, setOpenIndices] = useState<Set<number>>(
    () => new Set(items.map((_, i) => i)),
  );

  useEffect(() => {
    const locale = window.__brisaGetLocale?.();
    if (locale && window.__brisaSetLocale) {
      window.__brisaSetLocale(locale);
    }
  }, []);

  function toggle(i: number) {
    const willOpen = !openIndices.has(i);
    trackEvent("faq_toggle", {
      question: i + 1,
      action: willOpen ? "open" : "close",
    });
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  }

  return (
    <div className="faq-list" role="list">
      {items.map((item, i) => (
        <FAQItem
          key={i}
          item={item}
          index={i}
          id={`${baseId}-faq-${i}`}
          isOpen={openIndices.has(i)}
          onToggle={() => toggle(i)}
        />
      ))}
    </div>
  );
}
