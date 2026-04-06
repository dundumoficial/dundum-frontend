import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NovaSenha.module.css";
import logo from "../../assets/img/logo-branco.webp";
import iconeOlho from "../../assets/img/icon-olho.svg";
import iconeOlhoFechado from "../../assets/img/icon-olho-fechado.svg";

export default function NovaSenha() {
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!senha) errs.senha = "Informe a nova senha.";
    else if (senha.length < 6)
      errs.senha = "A senha deve ter ao menos 6 caracteres.";

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

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <img src={logo} alt="Logo DunDum" className={styles.logo} />
      </header>

      <main className={styles.main}>
        <h1 className={styles.titulo}>Redefinir senha</h1>

        <div className={styles.card}>
          {!submitted ? (
            <>
              <h2 className={styles.subtitulo}>Crie uma nova senha</h2>

              <div className={styles.campo}>
                <label htmlFor="senha">Nova senha</label>
                <div className={styles.senhaWrap}>
                  <input
                    id="senha"
                    type={showSenha ? "text" : "password"}
                    placeholder="Sua nova senha"
                    className={`${styles.input} ${errors.senha ? styles.inputError : ""}`}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  />
                  <button
                    className={styles.olhoBtn}
                    onClick={() => setShowSenha((v) => !v)}
                    type="button"
                    aria-label="Mostrar ou ocultar senha"
                  >
                    <img
                      src={showSenha ? iconeOlhoFechado : iconeOlho}
                      alt="Ícone para exibir senha"
                    />
                  </button>
                </div>
                {errors.senha && (
                  <p className={styles.errorMsg}>{errors.senha}</p>
                )}
              </div>

              <div className={styles.campo}>
                <label htmlFor="confirmar">Confirmar senha</label>
                <div className={styles.senhaWrap}>
                  <input
                    id="confirmar"
                    type={showConfirmar ? "text" : "password"}
                    placeholder="Confirme sua nova senha"
                    className={`${styles.input} ${errors.confirmar ? styles.inputError : ""}`}
                    value={confirmar}
                    onChange={(e) => setConfirmar(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  />
                  <button
                    className={styles.olhoBtn}
                    onClick={() => setShowConfirmar((v) => !v)}
                    type="button"
                    aria-label="Mostrar ou ocultar confirmação"
                  >
                    <img
                      src={showConfirmar ? iconeOlhoFechado : iconeOlho}
                      alt="Ícone para exibir senha"
                    />
                  </button>
                </div>
                {errors.confirmar && (
                  <p className={styles.errorMsg}>{errors.confirmar}</p>
                )}
              </div>

              <button className={styles.btnEntrar} onClick={handleSubmit}>
                Confirmar
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
              <p className={styles.successTexto}>
                Senha alterada com <strong>sucesso!</strong>
                <br />
                Você já pode fazer login com a nova senha.
              </p>
              <button
                className={styles.btnEntrar}
                onClick={() => navigate("/login")}
              >
                Ir para o login
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Copyright © 2026 DunDum</p>
        <p>Todos os direitos reservados</p>
      </footer>
    </div>
  );
}
