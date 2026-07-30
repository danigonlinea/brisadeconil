/**
 * FAQAccordion — React island with accessible accordion.
 * Uses aria-expanded + aria-controls pattern.
 */
import { useState, useId } from 'react';

interface FAQItem {
  q: string;
  a: string;
  pending?: boolean;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

function FAQItem({ item, id, isOpen, onToggle }: {
  item: FAQItem;
  id: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
      <button
        id={`${id}-btn`}
        className="faq-trigger"
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        onClick={onToggle}
        type="button"
      >
        <span className="faq-question">{item.q}</span>
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
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 250ms cubic-bezier(0.16,1,0.3,1)' }}
          >
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
      </button>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-btn`}
        className="faq-panel"
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        <div className="faq-answer">
          {item.pending ? (
            <span className="faq-pending">
              {item.a.replace(/\[PENDIENTE[^\]]*\]\.?/, '').trim()}{' '}
              <span className="placeholder-badge">Pendiente</span>
            </span>
          ) : (
            item.a
          )}
        </div>
      </div>
    </div>
  );
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <div className="faq-list" role="list">
      {items.map((item, i) => (
        <FAQItem
          key={i}
          item={item}
          id={`${baseId}-faq-${i}`}
          isOpen={openIndex === i}
          onToggle={() => toggle(i)}
        />
      ))}
    </div>
  );
}
