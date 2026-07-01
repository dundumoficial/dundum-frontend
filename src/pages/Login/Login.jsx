import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import styles from "./Login.module.css";
import logo from "../../assets/img/logo-branco.webp";
import iconeOlho from "../../assets/img/icon-olho.svg";
import iconeOlhoFechado from "../../assets/img/icon-olho-fechado.svg";
import RecuperarSenha from "../../modals/ModalRecuperarSenha/ModalRecuperarSenha.jsx";

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
    <path
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      fill="#FFC107"
    />
    <path
      d="M6.306 14.691l6.571 4.819C14.655 15.108 19.001 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      fill="#FF3D00"
    />
    <path
      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      fill="#4CAF50"
    />
    <path
      d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.021 35.591 44 30.138 44 24c0-1.341-.138-2.65-.389-3.917z"
      fill="#1976D2"
    />
  </svg>
);

const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function Login() {
  const { loginEmail, loginGoogle } = useAuth();
  const navigate = useNavigate();

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [abrirModal, setAbrirModal] = useState(false);
  const [lembrarMe, setLembrarMe] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erros, setErros] = useState({});
  const [loadingEntrar, setLoadingEntrar] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const handleEntrar = async () => {
    const novosErros = {};
    if (!email.trim()) novosErros.email = "O e-mail é obrigatório.";
    else if (!validarEmail(email))
      novosErros.email = "Digite um e-mail válido.";

    if (!senha) novosErros.senha = "A senha é obrigatória.";

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    setErros({});
    setLoadingEntrar(true);
    try {
      await loginEmail(email, senha, lembrarMe);
      navigate("/dashboard");
    } catch (err) {
      setErros({ geral: err.message || "Erro de conexão com o servidor." });
    } finally {
      setLoadingEntrar(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);
    setErros({});
    try {
      await loginGoogle();
      navigate("/dashboard");
    } catch (error) {
      const mensagens = {
        "auth/popup-closed-by-user": "Login cancelado. Tente novamente.",
        "auth/popup-blocked": "Popup bloqueado. Permita popups para este site.",
        "auth/cancelled-popup-request": null,
      };
      const mensagem =
        mensagens[error.code] ?? error.message ?? "Erro ao entrar com Google.";
      if (mensagem) setErros({ geral: mensagem });
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.voltarBtn} onClick={() => navigate("/")}>
          ← Voltar
        </button>
        <img src={logo} alt="Logo DunDum" className={styles.logo} />
      </header>

      <main className={styles.main}>
        <h1 className={styles.titulo}>Acessar ou criar conta</h1>

        <div className={styles.card}>
          <h2 className={styles.subtitulo}>Acesse sua conta</h2>

          <div className={styles.campo}>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              className={`${styles.input} ${erros.email ? styles.inputErro : ""}`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErros((prev) => ({ ...prev, email: "", geral: "" }));
              }}
              autoComplete="email"
              aria-invalid={!!erros.email}
              aria-describedby={erros.email ? "erro-email" : undefined}
            />
            {erros.email && (
              <span id="erro-email" className={styles.erro} role="alert">
                {erros.email}
              </span>
            )}
          </div>

          <div className={styles.campo}>
            <label htmlFor="senha">Senha</label>
            <div className={styles.senhaWrap}>
              <input
                id="senha"
                type={mostrarSenha ? "text" : "password"}
                placeholder="Sua senha"
                className={`${styles.input} ${erros.senha ? styles.inputErro : ""}`}
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                  setErros((prev) => ({ ...prev, senha: "", geral: "" }));
                }}
                autoComplete="current-password"
                aria-invalid={!!erros.senha}
                aria-describedby={erros.senha ? "erro-senha" : undefined}
                onKeyDown={(e) => e.key === "Enter" && handleEntrar()}
              />
              <button
                className={styles.olhoBtn}
                onClick={() => setMostrarSenha(!mostrarSenha)}
                type="button"
                aria-label="Mostrar ou ocultar senha"
              >
                <img
                  src={mostrarSenha ? iconeOlhoFechado : iconeOlho}
                  alt="Ícone de referência para exibir senha"
                  aria-hidden="true"
                />
              </button>
            </div>
            {erros.senha && (
              <span id="erro-senha" className={styles.erro} role="alert">
                {erros.senha}
              </span>
            )}
          </div>

          {erros.geral && (
            <span className={styles.erroGeral} role="alert">
              {erros.geral}
            </span>
          )}

          <div className={styles.rodapeFormulario}>
            <label className={styles.lembrarMe}>
              <input
                type="checkbox"
                checked={lembrarMe}
                onChange={(e) => setLembrarMe(e.target.checked)}
              />
              Lembrar-me
            </label>
            <button
              className={styles.esqueciSenha}
              onClick={() => setAbrirModal(true)}
              type="button"
            >
              Esqueci a senha
            </button>
          </div>

          <button
            className={styles.btnEntrar}
            onClick={handleEntrar}
            disabled={loadingEntrar}
            type="button"
            aria-busy={loadingEntrar}
          >
            {loadingEntrar ? (
              <span className={styles.spinnerBranco} aria-hidden="true" />
            ) : (
              "Entrar"
            )}
          </button>

          <div className={styles.divider}>
            <span>ou</span>
          </div>

          <button
            className={styles.btnGoogle}
            onClick={handleGoogleLogin}
            disabled={loadingGoogle}
            type="button"
            aria-label="Entrar com Google"
            aria-busy={loadingGoogle}
          >
            {loadingGoogle ? (
              <span className={styles.spinner} aria-hidden="true" />
            ) : (
              <GoogleIcon />
            )}
            Entrar com Google
          </button>

          <p className={styles.novoPorAqui}>
            Novo por aqui?{" "}
            <Link to="/cadastro" className={styles.linkCadastro}>
              Crie sua conta
            </Link>
          </p>

          {abrirModal && (
            <RecuperarSenha onClose={() => setAbrirModal(false)} />
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
