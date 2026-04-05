import { useState } from "react";
import styles from "./RecuperarSenha.module.css";

export default function RecuperarSenha({ onClose }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email.trim() || !email.includes("@")) {
      setError(true);
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Fechar"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="9" stroke="#111827" strokeWidth="1.5" />
            <path
              d="M7 7l6 6M13 7l-6 6"
              stroke="#111827"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {!submitted ? (
          <>
            <h1 className={styles.title}>Recuperar senha</h1>
            <label className={styles.label} htmlFor="email">
              Informe o e-mail cadastrado
            </label>
            <input
              id="email"
              type="email"
              className={`${styles.input} ${error ? styles.inputError : ""}`}
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(false);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              autoComplete="email"
            />

            {error && (
              <span className={styles.errorText}>E-mail incorreto</span>
            )}

            <button className={styles.btn} onClick={handleSubmit}>
              Continuar
            </button>
          </>
        ) : (
          <div className={styles.success}>
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <circle
                cx="26"
                cy="26"
                r="24"
                fill="#f0fdf4"
                stroke="#16a34a"
                strokeWidth="2"
              />
              <path
                d="M16 26l8 8 12-14"
                stroke="#16a34a"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>
              Enviamos um link de recuperação para
              <br />
              <strong>{email}</strong>
              <br />
              Verifique sua caixa de entrada.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
