import { useEffect, useRef } from "react";
import styles from "./ModalBase.module.css";

export function Modal({
  titulo,
  tituloId,
  children,
  onClose,
  onVoltar,
  maxWidth,
}) {
  const modalRef = useRef(null);
  const anteriorFocoRef = useRef(null);

  useEffect(() => {
    anteriorFocoRef.current = document.activeElement;

    document.body.style.overflow = "hidden";

    const focavel = modalRef.current?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    focavel?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      anteriorFocoRef.current?.focus();
    };
  }, [onClose]);

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={tituloId ?? "modal-titulo"}
    >
      <div
        ref={modalRef}
        className={styles.modal}
        style={maxWidth ? { maxWidth } : undefined}
      >
        <div className={styles.modalHeader}>
          <div className={styles.headerLeft}>
            {onVoltar && (
              <button
                className={styles.modalClose}
                onClick={onVoltar}
                aria-label="Voltar"
              >
                <span aria-hidden="true">←</span>
              </button>
            )}
            {titulo && (
              <h2
                id={tituloId ?? "modal-titulo"}
                className={styles.modalTitulo}
              >
                {titulo}
              </h2>
            )}
          </div>

          <button
            className={styles.modalClose}
            onClick={onClose}
            aria-label="Fechar modal"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
