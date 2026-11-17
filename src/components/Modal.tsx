"use client";

import { useTranslations } from "next-intl";
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  labelledBy?: string;
}

const Modal = ({ isOpen, onClose, children, labelledBy }: ModalProps) => {
  const t = useTranslations("common");
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      opener?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div className="loom loom-modal" role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
      <div className="loom-modal__scrim" onClick={onClose} aria-hidden="true" />
      <div className="loom-modal__panel">
        <button ref={closeRef} type="button" onClick={onClose} aria-label={t("close")} className="loom-modal__close">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
