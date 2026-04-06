import React, { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const SectionDetailModal = ({ isOpen, section, onClose }) => {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !dialogRef.current) return undefined;

    const dialog = dialogRef.current;

    const getFocusableElements = () =>
      Array.from(dialog.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
        (element) =>
          !element.hasAttribute("disabled") &&
          element.getAttribute("aria-hidden") !== "true",
      );

    const focusableElements = getFocusableElements();
    const initialFocusTarget =
      focusableElements[0] || closeButtonRef.current || dialog;

    initialFocusTarget.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const currentFocusableElements = getFocusableElements();
      if (!currentFocusableElements.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const firstElement = currentFocusableElements[0];
      const lastElement =
        currentFocusableElements[currentFocusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    dialog.addEventListener("keydown", handleKeyDown);

    return () => {
      dialog.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, section]);

  if (!isOpen || !section) return null;

  return (
    <div className="section-detail-backdrop" onClick={onClose}>
      <div
        ref={dialogRef}
        className="section-detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`section-detail-title-${section.id}`}
        onClick={(event) => event.stopPropagation()}
        tabIndex={-1}
      >
        <div className="section-detail-header">
          <div>
            <p className="section-detail-kicker">Learn More</p>
            <h2
              id={`section-detail-title-${section.id}`}
              className="section-detail-title"
            >
              {section.title}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="section-detail-close"
            onClick={onClose}
            aria-label={`Close ${section.title} details`}
          >
            Close
          </button>
        </div>

        <div className="section-detail-body">
          <p className="section-detail-intro">{section.intro}</p>

          {section.body.map((block, index) => {
            if (block.type === "list") {
              return (
                <section
                  key={`${section.id}-list-${index}`}
                  className="section-detail-group"
                >
                  <h3 className="section-detail-group-title">{block.title}</h3>
                  <ul className="section-detail-list">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              );
            }

            return (
              <p
                key={`${section.id}-paragraph-${index}`}
                className="section-detail-paragraph"
              >
                {block.content}
              </p>
            );
          })}
        </div>

        <div className="section-detail-footer">
          <button type="button" className="section-detail-action" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionDetailModal;
