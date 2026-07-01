import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import styles from "./NovaSenha.module.css";
import logo from "../../assets/img/logo-branco.webp";
import iconeOlho from "../../assets/img/icon-olho.svg";
import iconeOlhoFechado from "../../assets/img/icon-olho-fechado.svg";

const REQUISITOS = [
  { regex: /.{8,}/, label: "Mínimo 8 caracteres" },
  { regex: /[A-Z]/, label: "Uma letra maiúscula" },
  { regex: /[a-z]/, label: "Uma letra minúscula" },
  { regex: /[0-9]/, label: "Um número" },
  { regex: /[^A-Za-z0-9]/, label: "Um caractere especial" },
];

function validarSenha(senha) {
  return REQUISITOS.map((r) => ({ ...r, ok: r.regex.test(senha) }));
}

export default function NovaSenha() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [estado, setEstado] = useState("verificando");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  const requisitos = validarSenha(senha);
  const senhaValida = requisitos.every((r) => r.ok);
  const senhasIguais = senha === confirmar && confirmar.length > 0;

  useEffect(() => {
    if (!token) {
      setEstado("erro");
      setErro(
        "Link inválido ou expirado. Solicite um novo e-mail de recuperação.",
      );
      return;
    }

    setEstado("pronto");
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!senhaValida) {
      setErro("A senha não atende aos requisitos mínimos.");
      return;
    }
    if (!senhasIguais) {
      setErro("As senhas não coincidem.");
      return;
    }

    setEnviando(true);
    setErro("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/redefinir-senha`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, senha }),
        },
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erro ao redefinir senha");
      }

      setEstado("sucesso");
    } catch (err) {
      setErro(
        err.message || "Não foi possível redefinir a senha. Tente novamente.",
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <img src={logo} alt="Logo DunDum" className={styles.logo} />
      </header>

      <main className={styles.main}>
        <h1 className={styles.titulo}>Redefinir senha</h1>

        <div className={styles.card}>
          {estado === "verificando" && (
            <div className={styles.centralized}>
              <div
                className={styles.spinner}
                aria-label="Verificando link..."
                role="status"
              />
              <p className={styles.textoSecundario}>
                Verificando seu link de recuperação…
              </p>
            </div>
          )}

          {estado === "erro" && (
            <div className={styles.centralized}>
              <div className={styles.erroIcone} aria-hidden="true">
                ✕
              </div>
              <p className={styles.subtitulo}>Link inválido</p>
              <p className={styles.textoSecundario}>{erro}</p>
              <Link to="/login" className={styles.btnEntrar}>
                Solicitar novo link
              </Link>
            </div>
          )}

          {estado === "pronto" && (
            <>
              <h2 className={styles.subtitulo}>Crie uma nova senha</h2>
              <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <div className={styles.campo}>
                  <label htmlFor="nova-senha">Nova senha</label>
                  <div className={styles.senhaWrap}>
                    <input
                      id="nova-senha"
                      type={mostrarSenha ? "text" : "password"}
                      placeholder="Sua nova senha"
                      className={`${styles.input} ${senha.length > 0 && !senhaValida ? styles.inputError : ""}`}
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      autoComplete="new-password"
                      aria-describedby="requisitos-senha"
                      aria-invalid={senha.length > 0 && !senhaValida}
                      required
                    />
                    <button
                      className={styles.olhoBtn}
                      onClick={() => setMostrarSenha((v) => !v)}
                      type="button"
                      aria-label={
                        mostrarSenha ? "Ocultar senha" : "Mostrar senha"
                      }
                    >
                      <img
                        src={mostrarSenha ? iconeOlhoFechado : iconeOlho}
                        alt="Ícone para exibir senha"
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  <ul
                    id="requisitos-senha"
                    className={styles.requisitos}
                    aria-label="Requisitos de senha"
                  >
                    {requisitos.map((r) => (
                      <li
                        key={r.label}
                        className={`${styles.requisito} ${r.ok ? styles.requisitoOk : ""}`}
                        aria-label={`${r.label}: ${r.ok ? "atendido" : "pendente"}`}
                      >
                        <span aria-hidden="true">{r.ok ? "✓" : "○"}</span>
                        {r.label}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.campo}>
                  <label htmlFor="confirmar-senha">Confirmar senha</label>
                  <div className={styles.senhaWrap}>
                    <input
                      id="confirmar-senha"
                      type={mostrarSenha ? "text" : "password"}
                      placeholder="Confirme sua nova senha"
                      className={`${styles.input} ${confirmar.length > 0 && !senhasIguais ? styles.inputError : ""}`}
                      value={confirmar}
                      onChange={(e) => setConfirmar(e.target.value)}
                      autoComplete="new-password"
                      aria-invalid={confirmar.length > 0 && !senhasIguais}
                      required
                    />
                    <button
                      className={styles.olhoBtn}
                      onClick={() => setMostrarSenha((v) => !v)}
                      type="button"
                      aria-label={
                        mostrarSenha ? "Ocultar senha" : "Mostrar senha"
                      }
                    >
                      <img
                        src={mostrarSenha ? iconeOlhoFechado : iconeOlho}
                        alt="Ícone para exibir senha"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  {confirmar.length > 0 && !senhasIguais && (
                    <p className={styles.errorMsg} role="alert">
                      As senhas não coincidem
                    </p>
                  )}
                </div>

                {erro && (
                  <p className={styles.errorMsg} role="alert">
                    {erro}
                  </p>
                )}

                <button
                  type="submit"
                  className={styles.btnEntrar}
                  disabled={enviando || !senhaValida || !senhasIguais}
                  aria-busy={enviando}
                >
                  {enviando ? "Salvando..." : "Confirmar"}
                </button>
              </form>
            </>
          )}

          {estado === "sucesso" && (
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
