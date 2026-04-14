import styles from "./ModalBase.module.css";

export function Modal({ titulo, children, onClose, onVoltar }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.headerLeft}>
            {onVoltar && (
              <button
                className={styles.modalClose}
                onClick={onVoltar}
                aria-label="Voltar"
              >
                ←
              </button>
            )}
            <h2 className={styles.modalTitulo}>{titulo}</h2>
          </div>

          <button
            className={styles.modalClose}
            onClick={onClose}
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
