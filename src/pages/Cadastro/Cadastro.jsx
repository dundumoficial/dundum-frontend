import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Cadastro.module.css";
import logo from "../../assets/img/logo-branco.webp";
import iconeOlho from "../../assets/img/icon-olho.svg";
import iconeOlhoFechado from "../../assets/img/icon-olho-fechado.svg";
import ModalConfirmarEmail from "../../modals/ModalConfirmarEmail/ModalConfirmarEmail.jsx";

export default function Cadastro() {
  const navigate = useNavigate();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [termosAceitos, setTermosAceitos] = useState(false);
  const [forcaSenha, setForcaSenha] = useState(0);
  const [erros, setErros] = useState({});
  const [mostrarModal, setMostrarModal] = useState(false);
  const [codigo, setCodigo] = useState(["", "", "", "", "", ""]);
  const [tempo, setTempo] = useState(60);
  const [expirado, setExpirado] = useState(false);

  const calcularForcaSenha = (senha) => {
    let pontos = 0;

    if (/[A-Z]/.test(senha)) pontos++;
    if (/[a-z]/.test(senha)) pontos++;
    if (/\d/.test(senha)) pontos++;
    if (/[@$!%*?&.#]/.test(senha)) pontos++;
    if (senha.length >= 8) pontos++;

    return pontos;
  };

  const handleSubmit = () => {
    if (validarFormulario()) {
      setMostrarModal(true);
      setTempo(60);
      setExpirado(false);

      console.log("Enviar código para o email...");
    }
  };

  const validarEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const senhaForte = (senha) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/.test(
      senha,
    );
  };

  const validarFormulario = () => {
    let novosErros = {};

    if (!nome.trim()) {
      novosErros.nome = "O nome é obrigatório";
    } else if (nome.length > 50) {
      novosErros.nome = "Máximo de 50 caracteres";
    }

    if (!email.trim()) {
      novosErros.email = "O E-mail é obrigatório";
    } else if (!validarEmail(email)) {
      novosErros.email = "E-mail inválido";
    }

    if (!senha) {
      novosErros.senha = "A senha é obrigatória";
    } else if (!senhaForte(senha)) {
      novosErros.senha =
        "A senha deve ter no mínimo 8 caracteres, letra maiúscula, letra minúscula, número e caractere especial";
    }

    if (!confirmarSenha) {
      novosErros.confirmarSenha = "Confirme sua senha";
    } else if (senha !== confirmarSenha) {
      novosErros.confirmarSenha = "As senhas não coincidem";
    }

    if (!termosAceitos) {
      novosErros.termos = "Você deve aceitar os termos";
    }

    setErros(novosErros);

    return Object.keys(novosErros).length === 0;
  };

  useEffect(() => {
    if (!mostrarModal) return;

    if (tempo === 0) {
      setExpirado(true);
      return;
    }

    const interval = setInterval(() => {
      setTempo((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [tempo, mostrarModal]);

  const handleCodigoChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const novoCodigo = [...codigo];
    novoCodigo[index] = value;
    setCodigo(novoCodigo);

    if (value && index < 5) {
      document.getElementById(`codigo-${index + 1}`).focus();
    }
  };

  const handleCodigoKeyDown = (e, index) => {
    if (e.key === "Backspace" && !codigo[index] && index > 0) {
      document.getElementById(`codigo-${index - 1}`).focus();
    }
  };

  const reenviarCodigo = () => {
    setTempo(60);
    setExpirado(false);
    setCodigo(["", "", "", "", "", ""]);

    console.log("Reenviando código...");
  };

  const confirmarCodigo = () => {
    const codigoFinal = codigo.join("");

    if (codigoFinal.length < 6) {
      alert("Digite o código completo");
      return;
    }

    console.log("Código digitado:", codigoFinal);

    // validar com backend
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.voltarBtn} onClick={() => navigate(-1)}>
          ← Voltar
        </button>
        <img src={logo} alt="Logo DunDum" className={styles.logo} />
      </header>

      <main className={styles.main}>
        <h1 className={styles.titulo}>Criar conta</h1>

        <div className={styles.card}>
          <h2 className={styles.secaoTitulo}>Crie sua conta</h2>

          <div className={styles.grid}>
            <div className={styles.campo}>
              <label>Nome*</label>
              <input
                type="text"
                placeholder="Digite seu nome"
                className={styles.input}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
              {erros.nome && <span className={styles.erro}>{erros.nome}</span>}
            </div>
            <div className={styles.campo}>
              <label>E-mail*</label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {erros.email && (
                <span className={styles.erro}>{erros.email}</span>
              )}
            </div>
          </div>

          <div className={styles.grid}>
            <div className={styles.campo}>
              <label>Senha*</label>
              <div className={styles.senhaWrap}>
                <input
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Sua senha"
                  className={styles.input}
                  value={senha}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSenha(value);

                    const novaForca = calcularForcaSenha(value);
                    setForcaSenha(novaForca);

                    setErros((prev) => ({
                      ...prev,
                      senha:
                        value && !senhaForte(value)
                          ? "A senha deve ter no mínimo 8 caracteres, letra maiúscula, letra minúscula, número e caractere especial"
                          : "",
                    }));
                  }}
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
              <label>Confirmar a senha*</label>
              <div className={styles.senhaWrap}>
                <input
                  type={mostrarConfirmar ? "text" : "password"}
                  placeholder="Confirme sua senha"
                  className={styles.input}
                  value={confirmarSenha}
                  onChange={(e) => {
                    const value = e.target.value;
                    setConfirmarSenha(value);

                    setErros((prev) => ({
                      ...prev,
                      confirmarSenha:
                        senha && value !== senha
                          ? "As senhas não coincidem"
                          : "",
                    }));
                  }}
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
              <Link to="#" className={styles.termosLink}>
                termos e condições
              </Link>
            </label>
          </div>
          {erros.termos && <span className={styles.erro}>{erros.termos}</span>}

          <button className={styles.btnCadastrar} onClick={handleSubmit}>
            Cadastrar
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
