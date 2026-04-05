import { useState } from "react";
import styles from "./NovaSenha.module.css";

function EyeIcon({ open }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

export default function NovaSenha() {
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(true);

  const validate = () => {
    const errs = {};
    if (!senha) errs.senha = "Informe a nova senha.";
    else if (senha.length < 6) errs.senha = "A senha deve ter ao menos 6 caracteres.";
    if (!confirmar) errs.confirmar = "Confirme sua senha.";
    else if (senha !== confirmar) errs.confirmar = "As senhas não coincidem.";
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const handleClose = () => setVisible(false);

  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={handleClose} aria-label="Fechar">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="9" stroke="#111827" strokeWidth="1.5" />
            <path d="M7 7l6 6M13 7l-6 6" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {!submitted ? (
          <>
            <h1 className={styles.title}>Nova senha</h1>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="senha">Senha</label>
              <div className={styles.inputWrap}>
                <input
                  id="senha"
                  type={showSenha ? "text" : "password"}
                  className={`${styles.input} ${errors.senha ? styles.inputError : ""}`}
                  placeholder="Sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
                <button className={styles.eyeBtn} onClick={() => setShowSenha((v) => !v)} aria-label="Mostrar senha" type="button">
                  <EyeIcon open={showSenha} />
                </button>
              </div>
              {errors.senha && <p className={styles.errorMsg}>{errors.senha}</p>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="confirmar">Confirmar senha</label>
              <div className={styles.inputWrap}>
                <input
                  id="confirmar"
                  type={showConfirmar ? "text" : "password"}
                  className={`${styles.input} ${errors.confirmar ? styles.inputError : ""}`}
                  placeholder="Confirme sua senha"
                  value={confirmar}
                  onChange={(e) => setConfirmar(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
                <button className={styles.eyeBtn} onClick={() => setShowConfirmar((v) => !v)} aria-label="Mostrar confirmação" type="button">
                  <EyeIcon open={showConfirmar} />
                </button>
              </div>
              {errors.confirmar && <p className={styles.errorMsg}>{errors.confirmar}</p>}
            </div>

            <button className={styles.btn} onClick={handleSubmit}>Confirmar</button>
          </>
        ) : (
          <div className={styles.success}>
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <circle cx="26" cy="26" r="24" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
              <path d="M16 26l8 8 12-14" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p>
              Senha alterada com <strong>sucesso!</strong><br />
              Você já pode fazer login com a nova senha.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}