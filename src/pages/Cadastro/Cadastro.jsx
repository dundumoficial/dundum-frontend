import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import styles from "./Cadastro.module.css";
import logo from "../../assets/img/logo-branco.webp";
import iconeOlho from "../../assets/img/icon-olho.svg";
import iconeOlhoFechado from "../../assets/img/icon-olho-fechado.svg";
import ModalConfirmarEmail from "../../modals/ModalConfirmarEmail/ModalConfirmarEmail.jsx";

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

const validarEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const senhaForteRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/;

const calcularForca = (senha) => {
  let p = 0;
  if (/[A-Z]/.test(senha)) p++;
  if (/[a-z]/.test(senha)) p++;
  if (/\d/.test(senha)) p++;
  if (/[@$!%*?&.#]/.test(senha)) p++;
  if (senha.length >= 8) p++;
  return p;
};

export default function Cadastro() {
  const { enviarCodigoCadastro, cadastrarComCodigo, loginGoogle } = useAuth();
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [termosAceitos, setTermosAceitos] = useState(false);
  const [forcaSenha, setForcaSenha] = useState(0);
  const [erros, setErros] = useState({});
  const [loadingCodigo, setLoadingCodigo] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [codigo, setCodigo] = useState(["", "", "", "", "", ""]);
  const [tempo, setTempo] = useState(60);
  const [expirado, setExpirado] = useState(false);
  const [erroCodigo, setErroCodigo] = useState("");

  // timer de reenvio
  useEffect(() => {
    if (!mostrarModal) return;
    if (tempo === 0) {
      setExpirado(true);
      return;
    }
    const id = setInterval(() => setTempo((p) => p - 1), 1000);
    return () => clearInterval(id);
  }, [tempo, mostrarModal]);

  const validarFormulario = () => {
    const novosErros = {};
    if (!nome.trim()) novosErros.nome = "O nome é obrigatório";
    else if (nome.length > 50) novosErros.nome = "Máximo de 50 caracteres";

    if (!email.trim()) novosErros.email = "O e-mail é obrigatório";
    else if (!validarEmail(email)) novosErros.email = "E-mail inválido";

    if (!senha) novosErros.senha = "A senha é obrigatória";
    else if (!senhaForteRegex.test(senha))
      novosErros.senha =
        "A senha deve ter no mínimo 8 caracteres, letra maiúscula, minúscula, número e caractere especial";

    if (!confirmarSenha) novosErros.confirmarSenha = "Confirme sua senha";
    else if (senha !== confirmarSenha)
      novosErros.confirmarSenha = "As senhas não coincidem";

    if (!termosAceitos) novosErros.termos = "Você deve aceitar os termos";
    setErros(novosErros);

    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async () => {
    if (!validarFormulario()) return;
    setLoadingCodigo(true);
    try {
      await enviarCodigoCadastro(nome, email);
      setMostrarModal(true);
      setTempo(60);
      setExpirado(false);
      setCodigo(["", "", "", "", "", ""]);
      setErroCodigo("");
    } catch (err) {
      setErros({ geral: err.message || "Erro de conexão com o servidor." });
    } finally {
      setLoadingCodigo(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);
    setErros({});
    try {
      await loginGoogle();
      navigate("/dashboard");
    } catch (error) {
      const msgs = {
        "auth/popup-closed-by-user": "Login cancelado. Tente novamente.",
        "auth/popup-blocked": "Popup bloqueado. Permita popups para este site.",
        "auth/cancelled-popup-request": null,
      };
      const msg =
        msgs[error.code] ?? error.message ?? "Erro ao entrar com Google.";
      if (msg) setErros({ social: msg });
    } finally {
      setLoadingGoogle(false);
    }
  };

  const handleCodigoChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const novo = [...codigo];
    novo[index] = value;
    setCodigo(novo);
    if (value && index < 5)
      document.getElementById(`codigo-${index + 1}`)?.focus();
  };

  const handleCodigoKeyDown = (e, index) => {
    if (e.key === "Backspace" && !codigo[index] && index > 0) {
      document.getElementById(`codigo-${index - 1}`)?.focus();
    }
  };

  const reenviarCodigo = async () => {
    try {
      await enviarCodigoCadastro(nome, email);
      setTempo(120);
      setExpirado(false);
      setCodigo(["", "", "", "", "", ""]);
      setErroCodigo("");
    } catch (err) {
      setErroCodigo(err.message || "Erro ao reenviar código.");
    }
  };

  const confirmarCodigo = async () => {
    const codigoFinal = codigo.join("");
    if (codigoFinal.length < 6) {
      setErroCodigo("Digite o código completo");
      return;
    }

    try {
      await cadastrarComCodigo(nome, email, senha, codigoFinal);
      navigate("/dashboard");
    } catch (err) {
      setErroCodigo(err.message || "Código inválido ou expirado.");
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button
          className={styles.voltarBtn}
          onClick={() => navigate("/login")}
          type="button"
        >
          ← Voltar
        </button>
        <img src={logo} alt="Logo DunDum" className={styles.logo} />
      </header>

      <main className={styles.main}>
        <h1 className={styles.titulo}>Criar conta</h1>

        <div className={styles.card}>
          <h2 className={styles.secaoTitulo}>Crie sua conta</h2>

          {/* Formulário */}
          <div className={styles.grid}>
            <div className={styles.campo}>
              <label htmlFor="cad-nome">Nome</label>
              <input
                id="cad-nome"
                type="text"
                placeholder="Digite seu nome"
                className={styles.input}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                autoComplete="name"
                required
              />
              {erros.nome && <span className={styles.erro}>{erros.nome}</span>}
            </div>
            <div className={styles.campo}>
              <label htmlFor="cad-email">E-mail</label>
              <input
                id="cad-email"
                type="email"
                placeholder="Digite seu e-mail"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
              {erros.email && (
                <span className={styles.erro}>{erros.email}</span>
              )}
            </div>
          </div>

          <div className={styles.grid}>
            <div className={styles.campo}>
              <label htmlFor="cad-senha">Senha</label>
              <div className={styles.senhaWrap}>
                <input
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Sua senha"
                  className={styles.input}
                  value={senha}
                  onChange={(e) => {
                    setSenha(e.target.value);
                    setForcaSenha(calcularForca(e.target.value));
                  }}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className={styles.olhoBtn}
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  aria-label="Mostrar ou ocultar senha"
                >
                  <img
                    src={mostrarSenha ? iconeOlhoFechado : iconeOlho}
                    alt="Ícone para exibir e esconder senha"
                  />
                </button>
              </div>

              {erros.senha && (
                <span className={styles.erro}>{erros.senha}</span>
              )}

              {senha && (
                <>
                  <div className={styles.barraForca}>
                    <div
                      className={styles.forca}
                      style={{
                        width: `${(forcaSenha / 5) * 100}%`,
                        background:
                          forcaSenha <= 2
                            ? "red"
                            : forcaSenha === 3
                              ? "orange"
                              : "green",
                      }}
                    />
                  </div>
                  <span className={styles.forcaTexto}>
                    {forcaSenha <= 2 && "Fraca"}
                    {forcaSenha === 3 && "Média"}
                    {forcaSenha >= 4 && "Forte"}
                  </span>
                </>
              )}
            </div>

            <div className={styles.campo}>
              <label htmlFor="cad-confirmar">Confirmar a senha</label>
              <div className={styles.senhaWrap}>
                <input
                  id="cad-confirmar"
                  type={mostrarConfirmar ? "text" : "password"}
                  placeholder="Confirme sua senha"
                  className={styles.input}
                  value={confirmarSenha}
                  onChange={(e) => {
                    setConfirmarSenha(e.target.value);
                    setErros((p) => ({
                      ...p,
                      confirmarSenha:
                        senha && e.target.value !== senha
                          ? "As senhas não coincidem"
                          : "",
                    }));
                  }}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className={styles.olhoBtn}
                  onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
                  aria-label="Mostrar ou ocultar confirmação de senha"
                >
                  <img
                    src={mostrarConfirmar ? iconeOlhoFechado : iconeOlho}
                    alt="Ícone para exibir e esconder senha"
                  />
                </button>
              </div>

              {erros.confirmarSenha && (
                <span className={styles.erro}>{erros.confirmarSenha}</span>
              )}
            </div>
          </div>

          <div className={styles.divider}>
            <span>ou</span>
          </div>

          <button
            type="button"
            className={styles.btnGoogle}
            onClick={handleGoogleLogin}
            disabled={loadingGoogle}
            aria-label="Continuar com Google"
            aria-busy={loadingGoogle}
          >
            {loadingGoogle ? (
              <span className={styles.spinner} aria-hidden="true" />
            ) : (
              <GoogleIcon />
            )}
            Continuar com Google
          </button>

          {erros.social && (
            <span className={styles.erro} role="alert">
              {erros.social}
            </span>
          )}

          <div className={styles.termos}>
            <input
              type="checkbox"
              id="termos"
              checked={termosAceitos}
              onChange={(e) => setTermosAceitos(e.target.checked)}
              required
            />
            <label htmlFor="termos">
              Concordo com os{" "}
              <Link to="/termoscondicoes" className={styles.termosLink}>
                termos e condições
              </Link>
            </label>
          </div>

          {erros.termos && (
            <span className={styles.erro} role="alert">
              {erros.termos}
            </span>
          )}
          {erros.geral && (
            <span className={styles.erro} role="alert">
              {erros.geral}
            </span>
          )}

          <button
            className={styles.btnCadastrar}
            onClick={handleSubmit}
            disabled={loadingCodigo}
            type="button"
            aria-busy={loadingCodigo}
          >
            {loadingCodigo ? (
              <span className={styles.spinner} aria-hidden="true" />
            ) : (
              "Cadastrar"
            )}
          </button>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Copyright © 2026 DunDum</p>
        <p>Todos os direitos reservados</p>
      </footer>

      {mostrarModal && (
        <ModalConfirmarEmail
          codigo={codigo}
          tempo={tempo}
          expirado={expirado}
          erroCodigo={erroCodigo}
          onCodigoChange={handleCodigoChange}
          onCodigoKeyDown={handleCodigoKeyDown}
          onConfirmar={confirmarCodigo}
          onReenviar={reenviarCodigo}
          onCancelar={() => setMostrarModal(false)}
        />
      )}
    </div>
  );
}
