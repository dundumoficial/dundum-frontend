import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import styles from "./ModalRecuperarSenha.module.css";

export default function ModalRecuperarSenha({ onClose }) {
  const { recuperarSenha } = useAuth();
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [estado, setEstado] = useState("idle");

  async function handleSubmit() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setErro("Informe um e-mail válido.");
      return;
    }

    // bloqueia contas Google
    const dominiosGoogle = ["gmail.com", "googlemail.com"];
    const dominio = email.split("@")[1]?.toLowerCase();
    if (dominiosGoogle.includes(dominio)) {
      setErro(
        'Contas Google não possuem senha cadastrada no DunDum. Faça login com o botão "Continuar com Google".',
      );
      return;
    }

    setEstado("enviando");
    setErro("");

    try {
      await recuperarSenha(email);
      setEstado("enviado");
    } catch (err) {
      setErro(err.message || "Erro ao enviar e-mail. Tente novamente.");
      setEstado("idle");
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-recuperar-titulo"
      >
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Fechar"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="10" cy="10" r="9" stroke="#111827" strokeWidth="1.5" />
            <path
              d="M7 7l6 6M13 7l-6 6"
              stroke="#111827"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {estado !== "enviado" ? (
          <>
            <h2 id="modal-recuperar-titulo" className={styles.title}>
              Recuperar senha
            </h2>

            <label className={styles.label} htmlFor="recuperar-email">
              Informe o e-mail cadastrado
            </label>
            <input
              id="recuperar-email"
              type="email"
              className={`${styles.input} ${erro ? styles.inputError : ""}`}
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErro("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              autoComplete="email"
              aria-invalid={!!erro}
              aria-describedby={erro ? "recuperar-erro" : undefined}
            />

            {erro && (
              <span
                id="recuperar-erro"
                className={styles.errorText}
                role="alert"
              >
                {erro}
              </span>
            )}

            <button
              className={styles.btn}
              onClick={handleSubmit}
              disabled={estado === "enviando"}
              aria-busy={estado === "enviando"}
            >
              {estado === "enviando" ? "Enviando..." : "Continuar"}
            </button>
          </>
        ) : (
          <div className={styles.success}>
            <svg
              width="52"
              height="52"
              viewBox="0 0 52 52"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="26"
                cy="26"
                r="24"
                fill="#fff"
                stroke="#1b1f3b"
                strokeWidth="2"
              />
              <path
                d="M16 26l8 8 12-14"
                stroke="#1b1f3b"
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
