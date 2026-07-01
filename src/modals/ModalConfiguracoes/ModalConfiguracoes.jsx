import { useState, useRef, useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Circle, useMap } from "react-leaflet";
import { Modal } from "../ModalBase/ModalBase.jsx";
import { api } from "../../services/api.js";
import { useTema } from "../../contexts/ThemeContext.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import styles from "./ModalConfiguracoes.module.css";
import iconeCadeado from "../../assets/img/dashboard/icon-cadeado.svg";
import iconeOlho from "../../assets/img/icon-olho.svg";
import iconeOlhoFechado from "../../assets/img/icon-olho-fechado.svg";

// Sub-modal: Conta
function ConfigConta({ onClose, onVoltar }) {
  const { usuario, atualizarUsuario, alterarSenha, logout } = useAuth();
  const [nome, setNome] = useState(usuario?.nome ?? "");
  const [email, setEmail] = useState(usuario?.email ?? "");
  const [editandoEmail, setEditandoEmail] = useState(false);
  const [modoEmail, setModoEmail] = useState("idle");
  const [codigoEmail, setCodigoEmail] = useState("");
  const [countdownEmail, setCountdownEmail] = useState(0);
  const countdownEmailRef = useRef(null);
  const [erroEmail, setErroEmail] = useState("");
  const [emailVerificado, setEmailVerificado] = useState(false);
  const [telefone, setTelefone] = useState(usuario?.telefone ?? "");
  const [temTelefone] = useState(!!usuario?.telefone);
  const [confirmarRemoverTel, setConfirmarRemoverTel] = useState(false);
  const [modoTelefone, setModoTelefone] = useState(
    usuario?.telefone ? "salvo" : "idle",
  );
  const [codigoSMS, setCodigoSMS] = useState("");
  const [enviandoSMS, setEnviandoSMS] = useState(false);
  const [erroSMS, setErroSMS] = useState("");
  const [countdown, setCountdown] = useState(0);
  const countdownRef = useRef(null);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [errSenha, setErrSenha] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erroGeral, setErroGeral] = useState("");
  const [fotoPreview, setFotoPreview] = useState(usuario?.foto ?? null);
  const [fotoArquivo, setFotoArquivo] = useState(null);
  const [uploadandoFoto, setUploadandoFoto] = useState(false);
  const inputFotoRef = useRef(null);
  const [confirmarDeletar, setConfirmarDeletar] = useState(false);
  const [deletando, setDeletando] = useState(false);

  const ehContaGoogle = usuario?.temSenha === false;

  // limpa o interval ao desmontar
  useEffect(() => {
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
      if (countdownEmailRef.current) clearInterval(countdownEmailRef.current);
    };
  }, []);

  function iniciarCountdown() {
    setCountdown(120);
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function iniciarCountdownEmail() {
    setCountdownEmail(120);

    countdownEmailRef.current = setInterval(() => {
      setCountdownEmail((prev) => {
        if (prev <= 1) {
          clearInterval(countdownEmailRef.current);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  }

  function handleSelecionarFoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    // valida tipo e tamanho (máx 5 MB)
    if (!file.type.startsWith("image/")) {
      setErroGeral("Selecione um arquivo de imagem válido.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErroGeral("A imagem deve ter no máximo 5 MB.");
      return;
    }

    setFotoArquivo(file);
    setFotoPreview(URL.createObjectURL(file));
    setErroGeral("");
  }

  async function handleSalvarFoto() {
    if (!fotoArquivo) return true;
    setUploadandoFoto(true);

    try {
      const formData = new FormData();
      formData.append("foto", fotoArquivo);

      const data = await api.upload("/users/foto", formData);
      await atualizarUsuario({ foto: data.url });
      setFotoArquivo(null);
      setSucesso("Foto atualizada com sucesso!");
      setTimeout(() => setSucesso(""), 2500);
      return true;
    } catch (err) {
      setErroGeral(err.message || "Erro ao enviar foto.");
      return false;
    } finally {
      setUploadandoFoto(false);
    }
  }

  async function handleRemoverFoto() {
    setUploadandoFoto(true);
    setErroGeral("");
    try {
      await api.delete("/users/foto");
      await atualizarUsuario({ foto: null });
      setFotoPreview(null);
      setFotoArquivo(null);
      setSucesso("Foto removida.");
      setTimeout(() => setSucesso(""), 2500);
    } catch (err) {
      setErroGeral(err.message || "Erro ao remover foto.");
    } finally {
      setUploadandoFoto(false);
    }
  }

  async function handleEnviarCodigoEmail() {
    const emailAtual = (usuario?.email || "").trim().toLowerCase();

    const emailNovo = email.trim().toLowerCase();

    if (emailNovo === emailAtual) {
      setErroEmail("Este e-mail já está cadastrado.");
      return;
    }

    try {
      await api.post("/users/enviar-codigo", {
        nome: usuario.nome,
        email: emailNovo,
      });

      setModoEmail("aguardando_codigo");
      setErroEmail("");

      if (countdownEmailRef.current) {
        clearInterval(countdownEmailRef.current);
      }

      iniciarCountdownEmail();
    } catch (err) {
      setErroEmail(err.message || "Erro ao enviar código.");
    }
  }

  async function handleVerificarCodigoEmail() {
    try {
      await api.post("/users/email/verificar", {
        email: email.trim().toLowerCase(),
        codigo: codigoEmail,
      });

      clearInterval(countdownEmailRef.current);
      setCountdownEmail(0);

      setEmailVerificado(true);
      setModoEmail("verificado");
    } catch (err) {
      setErroEmail(err.message || "Código inválido.");
    }
  }

  function aplicarMascaraTelefone(valor) {
    const nums = valor.replace(/\D/g, "").slice(0, 11);
    if (nums.length <= 2) return `(${nums}`;
    if (nums.length <= 6) return `(${nums.slice(0, 2)}) ${nums.slice(2)}`;
    if (nums.length <= 10)
      return `(${nums.slice(0, 2)}) ${nums.slice(2, 6)}-${nums.slice(6)}`;
    return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7)}`;
  }

  async function handleEnviarCodigo() {
    if (!telefone.trim()) {
      setErroSMS("Informe o telefone.");
      return;
    }

    const telefoneAtual = (usuario?.telefone || "").replace(/\D/g, "");
    const telefoneNovo = telefone.replace(/\D/g, "");

    if (telefoneAtual === telefoneNovo) {
      setErroSMS("Este telefone já está cadastrado.");
      return;
    }

    setEnviandoSMS(true);
    setErroSMS("");
    try {
      await api.post("/users/telefone/enviar-codigo", { telefone });
      setModoTelefone("aguardando_codigo");
      setCodigoSMS("");
      if (countdownRef.current) clearInterval(countdownRef.current);
      iniciarCountdown();
    } catch (err) {
      setErroSMS(err.message || "Erro ao enviar código.");
    } finally {
      setEnviandoSMS(false);
    }
  }

  async function handleVerificarCodigo() {
    if (!codigoSMS.trim()) {
      setErroSMS("Informe o código.");
      return;
    }
    setEnviandoSMS(true);
    setErroSMS("");
    try {
      await api.post("/users/telefone/verificar", { codigo: codigoSMS });
      const telefoneFormatado = telefone.replace(/\D/g, "");
      await atualizarUsuario({
        telefone: telefoneFormatado.startsWith("55")
          ? `+${telefoneFormatado}`
          : `+55${telefoneFormatado}`,
      });
      clearInterval(countdownRef.current);
      setCountdown(0);
      setModoTelefone("verificado");
      setErroSMS("");
    } catch (err) {
      setErroSMS(err.message || "Código incorreto.");
    } finally {
      setEnviandoSMS(false);
    }
  }

  async function handleSalvar() {
    setErrSenha("");
    setErroGeral("");

    const nomeTrimado = nome.trim();
    if (!nomeTrimado) {
      setErroGeral("O nome não pode ficar vazio.");
      return;
    }

    if (!ehContaGoogle && !email.trim()) {
      setErroGeral("O e-mail não pode ficar vazio.");
      return;
    }

    const emailAtual = (usuario?.email || "").trim().toLowerCase();
    const emailNovo = email.trim().toLowerCase();

    if (!ehContaGoogle && emailNovo !== emailAtual && !emailVerificado) {
      setErroGeral(
        "Confirme o código enviado para o novo e-mail antes de salvar.",
      );
      return;
    }

    if (novaSenha || confirmarSenha || senhaAtual) {
      if (!senhaAtual) {
        setErrSenha("Informe a senha atual.");
        return;
      }

      if (novaSenha.length < 8) {
        setErrSenha("A nova senha deve ter no mínimo 8 caracteres.");
        return;
      }

      if (novaSenha !== confirmarSenha) {
        setErrSenha("As senhas não coincidem.");
        return;
      }
    }

    if (fotoArquivo) {
      await handleSalvarFoto();
      if (erroGeral) return;
    }

    const telefoneLimpo = telefone.replace(/\D/g, "");
    const telefoneAtualLimpo = (usuario?.telefone ?? "").replace(/\D/g, "");
    if (telefoneAtualLimpo && !telefoneLimpo) {
      setConfirmarRemoverTel(true);
      return;
    }

    if (
      telefoneLimpo &&
      telefoneLimpo !== telefoneAtualLimpo &&
      modoTelefone !== "verificado"
    ) {
      setErroGeral("Verifique o novo telefone antes de salvar.");
      return;
    }

    setSalvando(true);
    try {
      const dadosPerfil = {};
      if (nomeTrimado !== (usuario?.nome ?? "")) dadosPerfil.nome = nomeTrimado;

      if (
        !ehContaGoogle &&
        email.trim().toLowerCase() !==
          (usuario?.email ?? "").trim().toLowerCase()
      ) {
        dadosPerfil.email = email.trim();
      }

      if (Object.keys(dadosPerfil).length > 0) {
        await atualizarUsuario(dadosPerfil);
      }

      // altera senha se campos preenchidos
      if (senhaAtual && novaSenha) {
        await alterarSenha(senhaAtual, novaSenha);
        setSenhaAtual("");
        setNovaSenha("");
        setConfirmarSenha("");
      }

      setSucesso("Dados salvos com sucesso!");
      setTimeout(() => setSucesso(""), 2500);
    } catch (err) {
      const msg = err.message || "Erro ao salvar dados.";
      if (msg.toLowerCase().includes("senha")) setErrSenha(msg);
      else setErroGeral(msg);
    } finally {
      setSalvando(false);
    }
  }

  async function handleDeletarConta() {
    setDeletando(true);
    setErroGeral("");
    try {
      await api.delete("/users/conta");
      await logout();
    } catch (err) {
      setErroGeral(err.message || "Erro ao encerrar conta.");
      setConfirmarDeletar(false);
    } finally {
      setDeletando(false);
    }
  }

  const iniciais = usuario?.nome?.charAt(0).toUpperCase() ?? "?";

  return (
    <Modal titulo="Conta" onClose={onClose} onVoltar={onVoltar}>
      <div className={styles.modalConteudo}>
        <p className={styles.prefSecaoTitulo}>Foto de perfil</p>
        <div className={styles.fotoPerfilWrap}>
          <div
            className={styles.fotoPerfilAvatar}
            onClick={() => !uploadandoFoto && inputFotoRef.current?.click()}
            title="Clique para alterar a foto"
          >
            {fotoPreview ? (
              <img
                src={fotoPreview}
                alt="Foto de perfil"
                className={styles.fotoPerfilImg}
              />
            ) : (
              <span className={styles.fotoPerfilIniciais}>{iniciais}</span>
            )}
            <div className={styles.fotoPerfilOverlay}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
          </div>
          <div className={styles.fotoPerfilAcoes}>
            <button
              type="button"
              className={styles.btnSecundario}
              onClick={() => inputFotoRef.current?.click()}
              disabled={uploadandoFoto}
            >
              {uploadandoFoto
                ? "Enviando..."
                : fotoArquivo
                  ? "Trocar imagem"
                  : "Alterar foto"}
            </button>
            {fotoPreview && (
              <button
                type="button"
                className={styles.btnPerigo}
                onClick={handleRemoverFoto}
                disabled={uploadandoFoto}
              >
                Remover foto
              </button>
            )}
            {fotoArquivo && (
              <span className={styles.infoTexto}>
                Nova foto selecionada. Será salva ao clicar em "Salvar
                alterações".
              </span>
            )}
          </div>
          <input
            ref={inputFotoRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleSelecionarFoto}
          />
        </div>
        <hr className={styles.modalDivider} />
        <p className={styles.prefSecaoTitulo}>Informações pessoais</p>
        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel}>Nome completo</label>
          <input
            className={styles.editarPetInput}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel}>E-mail</label>
          <div className={styles.emailLinha}>
            <input
              className={styles.editarPetInput}
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailVerificado(false);
                setModoEmail("idle");
                setCodigoEmail("");
                setErroEmail("");
              }}
              disabled={ehContaGoogle || !editandoEmail}
            />

            {!ehContaGoogle && !editandoEmail && (
              <button
                type="button"
                className={styles.btnCancelar}
                onClick={() => setEditandoEmail(true)}
              >
                Alterar
              </button>
            )}

            {!ehContaGoogle && editandoEmail && (
              <button
                type="button"
                className={styles.btnSalvar}
                onClick={handleEnviarCodigoEmail}
                disabled={!email.trim()}
              >
                Verificar e-mail
              </button>
            )}
          </div>

          {ehContaGoogle && (
            <span className={styles.telefoneCountdown}>
              O e-mail é gerenciado pela sua conta Google.
            </span>
          )}

          {!ehContaGoogle && modoEmail === "aguardando_codigo" && (
            <div className={styles.codigoWrap}>
              <div className={styles.codigoLinha}>
                <input
                  className={styles.editarPetInput}
                  type="text"
                  value={codigoEmail}
                  onChange={(e) =>
                    setCodigoEmail(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Código recebido por e-mail"
                  maxLength={6}
                />

                <button
                  type="button"
                  className={styles.btnSalvar}
                  onClick={handleVerificarCodigoEmail}
                  disabled={codigoEmail.length < 6}
                >
                  Confirmar
                </button>
              </div>

              <div className={styles.telefoneCountdown}>
                {countdownEmail > 0 ? (
                  <span>
                    Código expira em <strong>{countdownEmail}s</strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    className={styles.reenviarCodigo}
                    onClick={handleEnviarCodigoEmail}
                  >
                    Reenviar código
                  </button>
                )}
              </div>
            </div>
          )}

          {!ehContaGoogle && modoEmail === "verificado" && (
            <span className={styles.sucessoTexto}>✓ E-mail verificado</span>
          )}

          {erroEmail && <span className={styles.erroTexto}>{erroEmail}</span>}
        </div>
        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel}>Telefone</label>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              className={styles.editarPetInput}
              type="tel"
              value={telefone}
              onChange={(e) => {
                setTelefone(aplicarMascaraTelefone(e.target.value));
                setModoTelefone("idle");
                setErroSMS("");
                if (countdownRef.current) clearInterval(countdownRef.current);
                setCountdown(0);
              }}
              placeholder="(11) 99999-9999"
              maxLength={15}
              disabled={modoTelefone === "verificado"}
            />

            {modoTelefone === "salvo" && (
              <>
                <button
                  type="button"
                  className={styles.btnCancelar}
                  style={{ whiteSpace: "nowrap", padding: "0 16px" }}
                  onClick={() => setModoTelefone("idle")}
                >
                  Alterar
                </button>
                <button
                  type="button"
                  className={styles.btnPerigo}
                  style={{ whiteSpace: "nowrap", padding: "0 16px" }}
                  onClick={() => setConfirmarRemoverTel(true)}
                >
                  Remover
                </button>
              </>
            )}

            {modoTelefone === "idle" && (
              <button
                type="button"
                className={styles.btnSalvar}
                style={{ whiteSpace: "nowrap", padding: "0 16px" }}
                onClick={handleEnviarCodigo}
                disabled={enviandoSMS || !telefone.trim()}
              >
                {enviandoSMS
                  ? "Enviando..."
                  : temTelefone
                    ? "Verificar novo"
                    : "Verificar"}
              </button>
            )}

            {modoTelefone === "verificado" && (
              <span
                style={{
                  color: "green",
                  alignSelf: "center",
                  fontSize: 13,
                  whiteSpace: "nowrap",
                }}
              >
                ✓ Verificado
              </span>
            )}
          </div>

          {modoTelefone === "aguardando_codigo" && (
            <div style={{ marginTop: 8 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  className={styles.editarPetInput}
                  type="text"
                  maxLength={6}
                  value={codigoSMS}
                  onChange={(e) =>
                    setCodigoSMS(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Código de 6 dígitos"
                />
                <button
                  type="button"
                  className={styles.btnSalvar}
                  style={{ whiteSpace: "nowrap", padding: "0 16px" }}
                  onClick={handleVerificarCodigo}
                  disabled={enviandoSMS || codigoSMS.length < 6}
                >
                  {enviandoSMS ? "..." : "Confirmar"}
                </button>
              </div>

              <div className={styles.telefoneCountdown}>
                {countdown > 0 ? (
                  <span>
                    Código expira em <strong>{countdown}s</strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    className={styles.reenviarCodigo}
                    onClick={handleEnviarCodigo}
                    disabled={enviandoSMS}
                  >
                    Reenviar código
                  </button>
                )}
              </div>
            </div>
          )}
          {confirmarRemoverTel && (
            <div className={styles.confirmacaoRemover}>
              <p>Deseja remover o telefone cadastrado?</p>
              <button
                className={styles.btnSalvar}
                onClick={async () => {
                  try {
                    await api.delete("/users/telefone");
                    await atualizarUsuario({ telefone: null });
                    setTelefone("");
                    setModoTelefone("idle");
                    setConfirmarRemoverTel(false);
                    setSucesso("Telefone removido com sucesso!");
                    setTimeout(() => setSucesso(""), 2500);
                  } catch (err) {
                    setErroGeral(err.message || "Erro ao remover telefone.");
                    setConfirmarRemoverTel(false);
                  }
                }}
              >
                Sim, remover
              </button>
              <button
                className={styles.btnCancelar}
                onClick={() => {
                  setTelefone(usuario?.telefone ?? "");
                  setConfirmarRemoverTel(false);
                }}
              >
                Cancelar
              </button>
            </div>
          )}

          {erroSMS && <span className={styles.erroTexto}>{erroSMS}</span>}
        </div>

        {!ehContaGoogle && (
          <>
            <hr className={styles.modalDivider} />
            <p className={styles.prefSecaoTitulo}>Alterar senha</p>
            <div className={styles.editarPetCampo}>
              <label className={styles.editarPetLabel}>Senha atual</label>
              <div className={styles.senhaWrap}>
                <input
                  className={styles.editarPetInput}
                  type={mostrarSenha ? "text" : "password"}
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                  placeholder="••••••••"
                />

                <button
                  type="button"
                  className={styles.olhoBtn}
                  onClick={() => setMostrarSenha((v) => !v)}
                  aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                >
                  <img
                    src={mostrarSenha ? iconeOlhoFechado : iconeOlho}
                    alt="Ícone para exibir senha"
                  />
                </button>
              </div>
            </div>
            <div className={styles.editarPetCampo}>
              <label className={styles.editarPetLabel}>Nova senha</label>
              <div className={styles.senhaWrap}>
                <input
                  className={styles.editarPetInput}
                  type={mostrarSenha ? "text" : "password"}
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                />

                <button
                  type="button"
                  className={styles.olhoBtn}
                  onClick={() => setMostrarSenha((v) => !v)}
                  aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                >
                  <img
                    src={mostrarSenha ? iconeOlhoFechado : iconeOlho}
                    alt="Ícone para exibir senha"
                  />
                </button>
              </div>
            </div>
            <div className={styles.editarPetCampo}>
              <label className={styles.editarPetLabel}>
                Confirmar nova senha
              </label>
              <div className={styles.senhaWrap}>
                <input
                  className={styles.editarPetInput}
                  type={mostrarSenha ? "text" : "password"}
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  placeholder="Repita a nova senha"
                />

                <button
                  type="button"
                  className={styles.olhoBtn}
                  onClick={() => setMostrarSenha((v) => !v)}
                  aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                >
                  <img
                    src={mostrarSenha ? iconeOlhoFechado : iconeOlho}
                    alt="Ícone para exibir senha"
                  />
                </button>
              </div>
            </div>
            {errSenha && <span className={styles.erroTexto}>{errSenha}</span>}
          </>
        )}
        {erroGeral && <span className={styles.erroTexto}>{erroGeral}</span>}
        {sucesso && <span className={styles.sucessoTexto}>{sucesso}</span>}
        <button
          className={styles.btnSalvar}
          onClick={handleSalvar}
          disabled={salvando}
          aria-busy={salvando}
        >
          {salvando ? "Salvando..." : "Salvar alterações"}
        </button>
        <button className={styles.btnCancelar} onClick={onVoltar}>
          Cancelar
        </button>

        <hr className={styles.modalDivider} />

        {!confirmarDeletar ? (
          <button
            type="button"
            className={`${styles.btnPerigo} ${styles.btnPerigoFull}`}
            onClick={() => setConfirmarDeletar(true)}
          >
            Encerrar conta
          </button>
        ) : (
          <div className={styles.confirmacaoRemover}>
            <p className={styles.confirmarDeletarTitulo}>
              Tem certeza que deseja encerrar sua conta?
            </p>
            <p className={styles.confirmarDeletarDesc}>
              Esta ação é <strong>permanente</strong> e irreversível. Todos os
              seus dados serão desativados e não será possível recuperar o
              acesso.
            </p>
            <div className={styles.confirmarDeletarAcoes}>
              <button
                type="button"
                className={`${styles.btnPerigo} ${styles.btnFlex}`}
                onClick={handleDeletarConta}
                disabled={deletando}
              >
                {deletando ? "Encerrando..." : "Sim, encerrar conta"}
              </button>
              <button
                type="button"
                className={`${styles.btnCancelar} ${styles.btnFlex}`}
                onClick={() => setConfirmarDeletar(false)}
                disabled={deletando}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

// Sub-modal: Notificações
function ConfigNotificacoes({ onClose, onVoltar, permissoes }) {
  const [canais, setCanais] = useState({
    whatsapp: false,
    email: true,
    sms: true,
  });
  const [eventos, setEventos] = useState({
    alertaCardiaco: true,
    alertaFuga: false,
    alertaRespiratorio: false,
    relatorioSemanal: false,
    bateriaBaixa: true,
    estadoEmocional: false,
  });
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [sucesso, setSucesso] = useState("");
  const [erro, setErro] = useState("");

  // carrega configurações salvas ao abrir
  useEffect(() => {
    api
      .get("/users/notificacoes")
      .then((data) => {
        if (!data) return;
        setCanais({
          whatsapp: data.whatsapp ?? false,
          email: data.email ?? true,
          sms: data.sms ?? false,
        });
        setEventos({
          alertaCardiaco: data.alerta_cardiaco ?? true,
          alertaFuga: data.alerta_fuga ?? false,
          alertaRespiratorio: data.alerta_respiratorio ?? false,
          relatorioSemanal: data.relatorio_semanal ?? false,
          bateriaBaixa: data.alertas_bateria ?? true,
        });
      })
      .catch(() => {}) // falha silenciosa, usa defaults
      .finally(() => setCarregando(false));
  }, []);

  const toggleCanal = (k) => setCanais((prev) => ({ ...prev, [k]: !prev[k] }));
  const toggleEvento = (k) =>
    setEventos((prev) => ({ ...prev, [k]: !prev[k] }));

  async function handleSalvar() {
    setSalvando(true);
    setErro("");
    try {
      await api.put("/users/notificacoes", {
        whatsapp: canais.whatsapp,
        email: canais.email,
        sms: canais.sms,
        alerta_cardiaco: eventos.alertaCardiaco,
        alerta_fuga: eventos.alertaFuga,
        alerta_respiratorio: eventos.alertaRespiratorio,
        relatorio_semanal: eventos.relatorioSemanal,
        alertas_bateria: eventos.bateriaBaixa,
      });
      setSucesso("Preferências salvas!");
      setTimeout(() => {
        setSucesso("");
        onVoltar();
      }, 1500);
    } catch (err) {
      setErro(err.message || "Erro ao salvar.");
    } finally {
      setSalvando(false);
    }
  }

  const eventosConfig = [
    {
      key: "alertaCardiaco",
      label: "Alertas cardíacos",
      bloqueado: false,
    },
    {
      key: "alertaRespiratorio",
      label: "Alertas respiratórios",
      bloqueado: !permissoes?.rpm,
      msgBloqueio: "Disponível no plano Premium",
    },
    {
      key: "alertaFuga",
      label: "Alertas de fuga",
      bloqueado: false,
    },
    {
      key: "relatorioSemanal",
      label: "Relatórios semanais",
      bloqueado: !permissoes?.relatorios,
      msgBloqueio: "Disponível no plano Premium",
    },
    {
      key: "bateriaBaixa",
      label: "Informações da bateria",
      bloqueado: false,
    },
  ];

  if (carregando)
    return (
      <Modal titulo="Notificações" onClose={onClose} onVoltar={onVoltar}>
        <div className={styles.modalConteudo}>
          <p
            style={{
              textAlign: "center",
              padding: 32,
              color: "var(--color-dark-blue)",
              fontFamily: "var(--font-poppins)",
            }}
          >
            Carregando...
          </p>
        </div>
      </Modal>
    );

  return (
    <Modal titulo="Notificações" onClose={onClose} onVoltar={onVoltar}>
      <div className={styles.modalConteudo}>
        <p className={styles.prefSecaoTitulo}>Como receber</p>
        {[
          {
            key: "whatsapp",
            label: "WhatsApp",
            desc: "Enviado para seu WhatsApp cadastrado",
          },
          {
            key: "email",
            label: "E-mail",
            desc: "Enviado para seu e-mail cadastrado",
          },
          { key: "sms", label: "SMS", desc: "Mensagem de texto no celular" },
        ].map(({ key, label, desc }) => (
          <div key={key} className={styles.prefItem}>
            <div>
              <span className={styles.prefItemLabel}>{label}</span>
              <span className={styles.prefItemDesc}>{desc}</span>
            </div>
            <button
              className={`${styles.toggle} ${canais[key] ? styles.toggleAtivo : ""}`}
              onClick={() => toggleCanal(key)}
              aria-label={`Toggle ${label}`}
            >
              <span className={styles.toggleKnob} />
            </button>
          </div>
        ))}
        <hr className={styles.modalDivider} />
        <p className={styles.prefSecaoTitulo}>O que receber</p>
        {eventosConfig.map(({ key, label, bloqueado, msgBloqueio }) => (
          <div
            key={key}
            className={`${styles.prefItem} ${bloqueado ? styles.prefItemBloqueado : ""}`}
          >
            <div className={styles.prefItemTexto}>
              <span className={styles.prefItemLabel}>
                {label}
                {bloqueado && (
                  <span className={styles.prefItemLock} aria-hidden="true">
                    {" "}
                    <img
                      src={iconeCadeado}
                      className={styles.prefItemLock}
                      alt="Ícone de cadeado"
                      style={{ filter: "var(--cadeado-filter)" }}
                    />
                  </span>
                )}
              </span>
              {bloqueado && msgBloqueio && (
                <span className={styles.prefItemDescBloqueio}>
                  {msgBloqueio}
                </span>
              )}
            </div>
            <button
              className={`${styles.toggle} ${!bloqueado && eventos[key] ? styles.toggleAtivo : ""} ${bloqueado ? styles.toggleDesabilitado : ""}`}
              onClick={() => !bloqueado && toggleEvento(key)}
              aria-label={`Toggle ${label}`}
              disabled={bloqueado}
              aria-disabled={bloqueado}
            >
              <span className={styles.toggleKnob} />
            </button>
          </div>
        ))}
        {erro && <span className={styles.erroTexto}>{erro}</span>}
        {sucesso && <span className={styles.sucessoTexto}>{sucesso}</span>}
        <button
          className={styles.btnSalvar}
          onClick={handleSalvar}
          disabled={salvando}
        >
          {salvando ? "Salvando..." : "Salvar preferências"}
        </button>
      </div>
    </Modal>
  );
}

// Sub-modal: Zona Segura
function ConfigZonaSegura({ onClose, onVoltar }) {
  const [endereco, setEndereco] = useState("");
  const [cep, setCep] = useState("");
  const [zonaExistente, setZonaExistente] = useState(null);
  const [editando, setEditando] = useState(false);
  const [loadingCEP, setLoadingCEP] = useState(false);
  const [coords, setCoords] = useState(null);
  const [raio, setRaio] = useState("200");
  const [sucesso, setSucesso] = useState("");
  const [erroCep, setErroCep] = useState("");
  const [erros, setErros] = useState({});
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    carregarZonaSegura();
  }, []);

  async function carregarZonaSegura() {
    try {
      const data = await api.get("/users/zona-segura");

      if (!data) return;

      setZonaExistente(data);

      setCep(data.cep || "");
      setEndereco(data.endereco || "");
      setRaio(String(data.raio_metros || 200));

      if (data.latitude && data.longitude) {
        setCoords({
          lat: Number(data.latitude),
          lon: Number(data.longitude),
        });
      }
    } catch {
      setZonaExistente(null);
    }
  }

  function aplicarMascara(valor) {
    const numeros = valor.replace(/\D/g, "").slice(0, 8);
    if (numeros.length <= 5) return numeros;
    return `${numeros.slice(0, 5)}-${numeros.slice(5)}`;
  }

  async function buscarCEP(cepLimpo) {
    if (cepLimpo.length !== 8) return;

    setLoadingCEP(true);
    setErroCep("");

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();

      if (data.erro) {
        setErroCep("CEP não encontrado. Verifique e tente novamente.");
        setEndereco("");
        setCoords(null);
        return;
      }

      const enderecoCompleto = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
      setEndereco(enderecoCompleto);

      const query = encodeURIComponent(enderecoCompleto);
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`,
      );

      const geoData = await geoRes.json();

      if (geoData.length > 0) {
        const { lat, lon } = geoData[0];
        setCoords({ lat: parseFloat(lat), lon: parseFloat(lon) });
      } else {
        setErroCep("Endereço encontrado, mas não foi possível exibir no mapa.");
        setCoords(null);
      }
    } catch {
      setErroCep("Erro ao buscar o CEP. Tente novamente.");
      setCoords(null);
    } finally {
      setLoadingCEP(false);
    }
  }

  function handleCepChange(e) {
    const masked = aplicarMascara(e.target.value);
    setCep(masked);

    const cepLimpo = masked.replace(/\D/g, "");

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (cepLimpo.length === 8) {
      setErroCep("");
      debounceRef.current = setTimeout(() => buscarCEP(cepLimpo), 400);
    } else {
      setCoords(null);
      setEndereco("");
      setErroCep("");
    }
  }

  function RecentralizarMapa({ coords }) {
    const map = useMap();

    useEffect(() => {
      if (coords) map.setView([coords.lat, coords.lon], 15);
    }, [coords, map]);

    return null;
  }

  const iconeCustom = (cor = "#454ade") =>
    L.divIcon({
      className: "",
      html: `
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 24 30">
        <path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 16 8 16s8-10.75 8-16c0-4.42-3.58-8-8-8z"
          fill="${cor}" stroke="white" stroke-width="1.5"/>
        <circle cx="12" cy="8" r="3" fill="white"/>
      </svg>`,
      iconSize: [28, 36],
      iconAnchor: [14, 36],
      popupAnchor: [0, -36],
    });

  const raios = [
    { value: "50", label: "50 metros" },
    { value: "100", label: "100 metros" },
    { value: "200", label: "200 metros" },
    { value: "500", label: "500 metros" },
    { value: "1000", label: "1 km" },
  ];

  async function handleSalvar() {
    const novosErros = {};

    const cepLimpo = cep.replace(/\D/g, "");

    if (!cepLimpo) {
      novosErros.cep = "Informe o CEP.";
    } else if (cepLimpo.length !== 8) {
      novosErros.cep = "CEP inválido.";
    }

    if (!endereco.trim()) {
      novosErros.endereco = "CEP não localizado.";
    }

    if (!coords?.lat || !coords?.lon) {
      novosErros.endereco = "Não foi possível localizar este endereço.";
    }

    const raioValido = ["50", "100", "200", "500", "1000"];

    if (!raioValido.includes(raio)) {
      novosErros.raio = "Selecione um raio válido.";
    }

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    setErros({});

    try {
      await api.post("/users/zona-segura", {
        cep,
        endereco,
        latitude: coords.lat,
        longitude: coords.lon,
        raio_metros: Number(raio),
      });

      setSucesso(
        zonaExistente ? "Zona segura atualizada!" : "Zona segura cadastrada!",
      );

      await carregarZonaSegura();

      setEditando(false);

      setTimeout(() => setSucesso(""), 2500);
    } catch {
      alert("Erro ao salvar zona segura");
    }
  }

  function handleExcluir() {
    setConfirmandoExclusao(true);
  }

  async function confirmarExclusao() {
    try {
      await api.delete("/users/zona-segura");

      setZonaExistente(null);
      setEditando(false);
      setConfirmandoExclusao(false);

      setCep("");
      setEndereco("");
      setCoords(null);
      setRaio("200");

      setSucesso("Zona segura removida!");
      setTimeout(() => setSucesso(""), 2500);
    } catch {
      alert("Erro ao excluir zona segura");
    }
  }

  const modoCadastro = !zonaExistente || editando;

  return (
    <Modal titulo="Zona Segura (GPS)" onClose={onClose} onVoltar={onVoltar}>
      <div className={styles.modalConteudo}>
        <div className={styles.zonaSeguraInfo}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>
            Você receberá um alerta quando seu cachorro sair desta área.
          </span>
        </div>

        {modoCadastro ? (
          <>
            <div className={styles.editarPetCampo}>
              <label className={styles.editarPetLabel}>CEP</label>
              <div className={styles.cepInputWrap}>
                <input
                  className={`${styles.editarPetInput} ${erroCep ? styles.inputErro : ""}`}
                  value={cep}
                  onChange={handleCepChange}
                  placeholder="00000-000"
                  maxLength={9}
                />
                {loadingCEP && <span className={styles.cepSpinner} />}
              </div>
              {erros.cep && (
                <span className={styles.erroTexto}>{erros.cep}</span>
              )}
              {erroCep && <span className={styles.erroTexto}>{erroCep}</span>}
            </div>

            <div className={styles.editarPetCampo}>
              <label className={styles.editarPetLabel}>Endereço</label>
              <input
                className={styles.editarPetInput}
                value={endereco}
                placeholder="Preenchido automaticamente pelo CEP"
                readOnly
              />
            </div>

            <div className={styles.editarPetCampo}>
              <label className={styles.editarPetLabel}>Raio de segurança</label>
              <select
                className={styles.editarPetInput}
                value={raio}
                onChange={(e) => setRaio(e.target.value)}
              >
                {raios.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
              {erros.raio && (
                <span className={styles.erroTexto}>{erros.raio}</span>
              )}
            </div>

            {coords && (
              <div className={styles.mapaWrap}>
                <MapContainer
                  center={[coords.lat, coords.lon]}
                  zoom={15}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                  }}
                  scrollWheelZoom={false}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <RecentralizarMapa coords={coords} />
                  <Marker
                    position={[coords.lat, coords.lon]}
                    icon={iconeCustom()}
                  />
                  <Circle
                    center={[coords.lat, coords.lon]}
                    radius={Number(raio)}
                    pathOptions={{
                      color: "#454ade",
                      fillColor: "#454ade",
                      fillOpacity: 0.1,
                    }}
                  />
                </MapContainer>
              </div>
            )}

            <button className={styles.btnSalvar} onClick={handleSalvar}>
              Salvar zona segura
            </button>
            <button className={styles.btnCancelar} onClick={onVoltar}>
              Cancelar
            </button>
          </>
        ) : (
          <>
            <div className={styles.zonaResumo}>
              <div className={styles.zonaResumoItem}>
                <span className={styles.zonaResumoLabel}>Endereço:</span>
                <p className={styles.zonaResumoValor}>{endereco}</p>
              </div>

              <div className={styles.zonaResumoItem}>
                <span className={styles.zonaResumoLabel}>
                  Raio de segurança:
                </span>
                <p className={styles.zonaResumoValor}>{raio} metros</p>
              </div>
            </div>

            {coords && (
              <div className={styles.mapaWrap}>
                <MapContainer
                  center={[coords.lat, coords.lon]}
                  zoom={15}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                  }}
                  scrollWheelZoom={false}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                  <Marker
                    position={[coords.lat, coords.lon]}
                    icon={iconeCustom()}
                  />

                  <Circle
                    center={[coords.lat, coords.lon]}
                    radius={Number(raio)}
                    pathOptions={{
                      color: "#454ade",
                      fillColor: "#454ade",
                      fillOpacity: 0.1,
                    }}
                  />
                </MapContainer>
              </div>
            )}

            {sucesso && <span className={styles.sucessoTexto}>{sucesso}</span>}
            <button
              className={styles.btnSalvar}
              onClick={() => setEditando(true)}
            >
              Alterar
            </button>

            <button className={styles.btnCancelar} onClick={handleExcluir}>
              Excluir
            </button>

            {confirmandoExclusao && (
              <div className={styles.confirmOverlay}>
                <div className={styles.confirmBox}>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#e53e3e"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <p className={styles.confirmTitulo}>Excluir zona segura?</p>
                  <p className={styles.confirmTexto}>
                    Você não receberá mais alertas quando seu cachorro sair
                    desta área.
                  </p>
                  <div className={styles.confirmBotoes}>
                    <button
                      className={styles.btnCancelar}
                      onClick={() => setConfirmandoExclusao(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      className={styles.btnExcluirConfirm}
                      onClick={confirmarExclusao}
                    >
                      Sim, excluir
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Modal>
  );
}

// Sub-modal: Segurança
function ConfigSeguranca({ onClose, onVoltar }) {
  const [mfa, setMfa] = useState(false);
  const [mfaMetodo, setMfaMetodo] = useState("app");
  const [sessoes, setSessoes] = useState([
    {
      id: 1,
      dispositivo: "Chrome — Windows",
      local: "São Paulo, BR",
      atual: true,
      quando: "Agora",
    },
    {
      id: 2,
      dispositivo: "Safari — iPhone",
      local: "São Paulo, BR",
      atual: false,
      quando: "2 horas atrás",
    },
    {
      id: 3,
      dispositivo: "Firefox — MacBook",
      local: "Rio de Janeiro, BR",
      atual: false,
      quando: "3 dias atrás",
    },
  ]);

  function encerrarSessao(id) {
    setSessoes((prev) => prev.filter((s) => s.id !== id || s.atual));
  }

  return (
    <Modal titulo="Segurança" onClose={onClose} onVoltar={onVoltar}>
      <div className={styles.modalConteudo}>
        <p className={styles.prefSecaoTitulo}>
          Autenticação de dois fatores (2FA)
        </p>
        <div className={styles.prefItem}>
          <div>
            <span className={styles.prefItemLabel}>Ativar 2FA</span>
            <span className={styles.prefItemDesc}>
              Camada extra de proteção na conta
            </span>
          </div>
          <button
            className={`${styles.toggle} ${mfa ? styles.toggleAtivo : ""}`}
            onClick={() => setMfa((v) => !v)}
          >
            <span className={styles.toggleKnob} />
          </button>
        </div>
        {mfa && (
          <div className={`${styles.editarPetCampo} ${styles.marginTop4}`}>
            <label className={styles.editarPetLabel}>
              Método de verificação
            </label>
            <select
              className={styles.editarPetInput}
              value={mfaMetodo}
              onChange={(e) => setMfaMetodo(e.target.value)}
            >
              <option value="app">Aplicativo autenticador (recomendado)</option>
              <option value="sms">SMS</option>
              <option value="email">E-mail</option>
            </select>
            {mfaMetodo === "app" && (
              <div className={styles.mfaQRBox}>
                <div className={styles.mfaQRPlaceholder}>
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#aaa"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="3" height="3" />
                    <rect x="18" y="18" width="3" height="3" />
                  </svg>
                </div>
                <p className={styles.mfaTexto}>
                  Escaneie o QR Code no seu app autenticador
                </p>
              </div>
            )}
          </div>
        )}
        <hr className={styles.modalDivider} />
        <p className={styles.prefSecaoTitulo}>Sessões ativas</p>
        {sessoes.map((s) => (
          <div key={s.id} className={styles.sessaoItem}>
            <div className={styles.sessaoInfo}>
              <span className={styles.sessaoDispositivo}>
                {s.dispositivo}
                {s.atual && (
                  <span className={styles.sessaoAtualBadge}>Atual</span>
                )}
              </span>
              <span className={styles.sessaoDetalhe}>
                {s.local} · {s.quando}
              </span>
            </div>
            {!s.atual && (
              <button
                className={styles.sessaoEncerrar}
                onClick={() => encerrarSessao(s.id)}
              >
                Encerrar
              </button>
            )}
          </div>
        ))}
        <button className={styles.btnSalvar} onClick={onVoltar}>
          Salvar configurações
        </button>
      </div>
    </Modal>
  );
}

// Sub-modal: Aparência
function ConfigAparencia({ onClose, onVoltar }) {
  const { tema, setTema } = useTema();

  const temas = [
    {
      key: "claro",
      label: "Claro",
      icone: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ),
    },
    {
      key: "escuro",
      label: "Escuro",
      icone: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ),
    },
  ];

  return (
    <Modal titulo="Aparência" onClose={onClose} onVoltar={onVoltar}>
      <div className={styles.modalConteudo}>
        <p className={styles.prefSecaoTitulo}>Tema</p>
        <div className={styles.temaGrid}>
          {temas.map(({ key, label, icone }) => (
            <button
              key={key}
              className={`${styles.temaOpcao} ${tema === key ? styles.temaOpcaoAtiva : ""}`}
              onClick={() => setTema(key)}
            >
              {icone}
              <span>{label}</span>
            </button>
          ))}
        </div>
        <button className={styles.btnCancelar} onClick={onVoltar}>
          Voltar
        </button>
      </div>
    </Modal>
  );
}

// Sub-modal: Central de Ajuda
function ConfigAjuda({ onClose, onVoltar }) {
  const [aberto, setAberto] = useState(null);

  const faqs = [
    {
      id: 1,
      pergunta: "Como funciona o monitoramento cardíaco?",
      resposta:
        "A coleira possui sensores que medem os batimentos cardíacos do cachorro. Os dados são sincronizados e exibidos no dashboard.",
    },
    {
      id: 2,
      pergunta: "O GPS funciona sem Wi-Fi?",
      resposta:
        "Sim! A coleira possui um chip 4G para enviar a localização caso não haja conexão Wi-Fi disponível.",
    },
    {
      id: 3,
      pergunta: "Como trocar a coleira?",
      resposta:
        "A troca de coleira deve ser feita pelo suporte oficial da DunDum. Entre em contato pelo e-mail oficialdundum@gmail.com ou pelo chat abaixo.",
    },
    {
      id: 4,
      pergunta: "Como cancelar minha assinatura?",
      resposta:
        "Você pode cancelar a assinatura em Plano > Alterar Plano > Gratuito. O cancelamento é imediato e sem multa.",
    },
    {
      id: 5,
      pergunta: "A bateria da coleira dura quanto tempo?",
      resposta: "De 15 a 30 dias.",
    },
  ];

  return (
    <Modal titulo="Central de Ajuda" onClose={onClose} onVoltar={onVoltar}>
      <div className={styles.modalConteudo}>
        <p className={styles.prefSecaoTitulo}>Perguntas frequentes</p>
        {faqs.map((faq) => (
          <div key={faq.id} className={styles.faqItem}>
            <button
              className={styles.faqPergunta}
              onClick={() => setAberto(aberto === faq.id ? null : faq.id)}
            >
              <span>{faq.pergunta}</span>
              <span
                className={`${styles.faqIcon} ${
                  aberto === faq.id ? styles.faqIconAberto : ""
                }`}
              >
                +
              </span>
            </button>
            {aberto === faq.id && (
              <p className={styles.faqResposta}>{faq.resposta}</p>
            )}
          </div>
        ))}

        <hr className={styles.modalDivider} />
        <p className={styles.prefSecaoTitulo}>Fale conosco</p>

        {/* E-mail */}
        <a
          href="mailto:oficialdundum@gmail.com"
          className={styles.ajudaContato}
        >
          <span className={styles.ajudaContatoIconeWrap}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </span>
          <div>
            <span className={styles.prefItemLabel}>E-mail</span>
            <span className={styles.prefItemDesc}>oficialdundum@gmail.com</span>
          </div>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/5511999999999"
          target="_blank"
          rel="noreferrer"
          className={styles.ajudaContato}
        >
          <span className={styles.ajudaContatoIconeWrap}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
            </svg>
          </span>
          <div>
            <span className={styles.prefItemLabel}>WhatsApp</span>
            <span className={styles.prefItemDesc}>Seg–Sex, das 8h às 21h</span>
          </div>
        </a>
      </div>
    </Modal>
  );
}

export function ModalConfiguracoes({ onClose, permissoes }) {
  const [tela, setTela] = useState("menu");

  const itens = [
    {
      key: "conta",
      icone: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      label: "Conta",
      desc: "Nome, e-mail, senha",
    },
    {
      key: "notificacoes",
      icone: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
      label: "Notificações",
      desc: "Como e o que você recebe",
    },
    {
      key: "zonaSegura",
      icone: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: "Zona segura (GPS)",
      desc: "Endereço e raio de segurança",
    },
    {
      key: "seguranca",
      icone: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
      label: "Segurança",
      desc: "Autenticação de dois fatores",
    },
    {
      key: "aparencia",
      icone: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ),
      label: "Aparência",
      desc: "Tema claro ou escuro",
    },
    {
      key: "ajuda",
      icone: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
      label: "Central de Ajuda",
      desc: "Suporte e perguntas frequentes",
    },
  ];

  const subModal = {
    conta: <ConfigConta onClose={onClose} onVoltar={() => setTela("menu")} />,
    notificacoes: (
      <ConfigNotificacoes
        onClose={onClose}
        onVoltar={() => setTela("menu")}
        permissoes={permissoes}
      />
    ),
    zonaSegura: (
      <ConfigZonaSegura onClose={onClose} onVoltar={() => setTela("menu")} />
    ),
    seguranca: (
      <ConfigSeguranca onClose={onClose} onVoltar={() => setTela("menu")} />
    ),
    aparencia: (
      <ConfigAparencia onClose={onClose} onVoltar={() => setTela("menu")} />
    ),
    ajuda: <ConfigAjuda onClose={onClose} onVoltar={() => setTela("menu")} />,
  };

  if (tela !== "menu") return subModal[tela] || null;

  return (
    <Modal titulo="Configurações" onClose={onClose}>
      <div className={styles.modalConteudo}>
        {itens.map((item) => (
          <button
            key={item.key}
            className={styles.configMenuItem}
            onClick={() => setTela(item.key)}
          >
            <span className={styles.configMenuIcone}>{item.icone}</span>
            <span className={styles.configMenuTexto}>
              <span className={styles.configMenuLabel}>{item.label}</span>
              <span className={styles.configMenuDesc}>{item.desc}</span>
            </span>
            <span className={styles.configMenuArrow}>›</span>
          </button>
        ))}
      </div>
    </Modal>
  );
}
