import styles from "./ModalConfirmarEmail.module.css";

export default function ModalConfirmarEmail({
  codigo,
  tempo,
  expirado,
  onCodigoChange,
  onCodigoKeyDown,
  onConfirmar,
  onReenviar,
  onCancelar,
}) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Confirmar e-mail</h2>
        <p>Digite o código enviado para seu e-mail</p>

        <div className={styles.codigoInputs}>
          {codigo.map((num, index) => (
            <input
              key={index}
              id={`codigo-${index}`}
              type="text"
              maxLength="1"
              value={num}
              onChange={(e) => onCodigoChange(e.target.value, index)}
              onKeyDown={(e) => onCodigoKeyDown(e, index)}
            />
          ))}
        </div>

        <p className={styles.timer}>
          {expirado ? "Código expirado" : `Tempo restante: ${tempo}s`}
        </p>

        <div className={styles.modalActions}>
          {expirado ? (
            <>
              <button onClick={onReenviar}>Reenviar código</button>
              <button onClick={onCancelar}>Cancelar</button>
            </>
          ) : (
            <>
              <button onClick={onConfirmar}>Confirmar</button>
              <button onClick={onCancelar}>Cancelar</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
