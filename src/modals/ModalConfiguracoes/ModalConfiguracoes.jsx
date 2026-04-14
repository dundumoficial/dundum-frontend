import { useState } from "react";
import { Modal } from "../ModalBase/ModalBase.jsx";
import styles from "./ModalConfiguracoes.module.css";

// Sub-modal: Conta
function ConfigConta({ onClose, onVoltar }) {
  const [nome, setNome] = useState("Rafael");
  const [email, setEmail] = useState("rafael@email.com");
  const [telefone, setTelefone] = useState("(11) 99999-0000");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [errSenha, setErrSenha] = useState("");
  const [sucesso, setSucesso] = useState("");

  function handleSalvar() {
    if (novaSenha || confirmarSenha) {
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
    setErrSenha("");
    setSucesso("Dados salvos com sucesso!");
    setTimeout(() => setSucesso(""), 2500);
  }

  return (
    <Modal titulo="Conta" onClose={onClose} onVoltar={onVoltar}>
      <div className={styles.modalConteudo}>
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
          <input
            className={styles.editarPetInput}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel}>Telefone</label>
          <input
            className={styles.editarPetInput}
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>
        <hr className={styles.modalDivider} />
        <p className={styles.prefSecaoTitulo}>Alterar senha</p>
        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel}>Senha atual</label>
          <input
            className={styles.editarPetInput}
            type="password"
            value={senhaAtual}
            onChange={(e) => setSenhaAtual(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel}>Nova senha</label>
          <input
            className={styles.editarPetInput}
            type="password"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            placeholder="Mínimo 8 caracteres"
          />
        </div>
        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel}>Confirmar nova senha</label>
          <input
            className={styles.editarPetInput}
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            placeholder="Repita a nova senha"
          />
        </div>
        {errSenha && <span className={styles.erroTexto}>{errSenha}</span>}
        {sucesso && <span className={styles.sucessoTexto}>{sucesso}</span>}
        <button className={styles.btnSalvar} onClick={handleSalvar}>
          Salvar alterações
        </button>
        <button className={styles.btnCancelar} onClick={onVoltar}>
          Cancelar
        </button>
      </div>
    </Modal>
  );
}

// Sub-modal: Notificações
function ConfigNotificacoes({ onClose, onVoltar }) {
  const [canais, setCanais] = useState({
    whatsapp: true,
    email: true,
    sms: false,
  });
  const [eventos, setEventos] = useState({
    alertaCardiaco: true,
    alertaFuga: true,
    alertaRespiratorio: true,
    relatorioSemanal: false,
    atualizacaoGPS: true,
    bateriaBaixa: true,
    estadoEmocional: false,
  });

  const toggleCanal = (k) => setCanais((prev) => ({ ...prev, [k]: !prev[k] }));
  const toggleEvento = (k) =>
    setEventos((prev) => ({ ...prev, [k]: !prev[k] }));

  const eventosLabels = {
    alertaCardiaco: "Alertas cardíacos",
    alertaFuga: "Alerta de fuga",
    alertaRespiratorio: "Alertas respiratórios",
    relatorioSemanal: "Relatório semanal",
    atualizacaoGPS: "Atualização de localização",
    bateriaBaixa: "Bateria baixa da coleira",
    estadoEmocional: "Estado emocional do pet",
  };

  return (
    <Modal titulo="Notificações" onClose={onClose} onVoltar={onVoltar}>
      <div className={styles.modalConteudo}>
        <p className={styles.prefSecaoTitulo}>Como receber</p>
        {[
          {
            key: "whatsapp",
            label: "WhatsApp",
            desc: "Mensagem de texto no WhatsApp",
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
        {Object.entries(eventosLabels).map(([key, label]) => (
          <div key={key} className={styles.prefItem}>
            <span className={styles.prefItemLabel}>{label}</span>
            <button
              className={`${styles.toggle} ${eventos[key] ? styles.toggleAtivo : ""}`}
              onClick={() => toggleEvento(key)}
              aria-label={`Toggle ${label}`}
            >
              <span className={styles.toggleKnob} />
            </button>
          </div>
        ))}
        <button className={styles.btnSalvar} onClick={onVoltar}>
          Salvar preferências
        </button>
      </div>
    </Modal>
  );
}

// Sub-modal: Zona Segura
function ConfigZonaSegura({ onClose, onVoltar }) {
  const [endereco, setEndereco] = useState("");
  const [complemento, setComplemento] = useState("");
  const [raio, setRaio] = useState("200");
  const [sucesso, setSucesso] = useState("");

  const raios = [
    { value: "50", label: "50 metros" },
    { value: "100", label: "100 metros" },
    { value: "200", label: "200 metros" },
    { value: "500", label: "500 metros" },
    { value: "1000", label: "1 km" },
  ];

  function handleSalvar() {
    if (!endereco.trim()) {
      alert("Informe o endereço.");
      return;
    }
    setSucesso("Zona segura atualizada!");
    setTimeout(() => setSucesso(""), 2500);
  }

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
          <span>Você receberá um alerta quando seu pet sair desta área.</span>
        </div>
        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel}>Endereço seguro</label>
          <input
            className={styles.editarPetInput}
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            placeholder="Rua, número, bairro, cidade"
          />
        </div>
        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel}>
            Complemento (opcional)
          </label>
          <input
            className={styles.editarPetInput}
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
            placeholder="Apto, bloco, casa..."
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
        </div>
        <div className={styles.raioPreview}>
          <div
            className={styles.raioCirculo}
            style={{
              width: `${Math.min(Number(raio) / 5, 120)}px`,
              height: `${Math.min(Number(raio) / 5, 120)}px`,
            }}
          >
            <span>🐾</span>
          </div>
          <p className={styles.raioLabel}>
            Raio: {raios.find((r) => r.value === raio)?.label}
          </p>
        </div>
        {sucesso && <span className={styles.sucessoTexto}>{sucesso}</span>}
        <button className={styles.btnSalvar} onClick={handleSalvar}>
          Salvar zona segura
        </button>
        <button className={styles.btnCancelar} onClick={onVoltar}>
          Cancelar
        </button>
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
  const [tema, setTema] = useState("claro");

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
    {
      key: "sistema",
      label: "Sistema",
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
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
  ];

  function handleSalvar() {
    alert(`Tema: ${tema} — Funcionalidade em desenvolvimento.`);
    onVoltar();
  }

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
        <button className={styles.btnSalvar} onClick={handleSalvar}>
          Aplicar aparência
        </button>
        <button className={styles.btnCancelar} onClick={onVoltar}>
          Cancelar
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
        "A coleira DunDum possui sensores que medem os batimentos cardíacos do pet em tempo real. Os dados são sincronizados via Wi-Fi e exibidos no dashboard.",
    },
    {
      id: 2,
      pergunta: "O GPS funciona sem Wi-Fi?",
      resposta:
        "Infelizmente não, a coleira precisa estar conectada no Wi-Fi para enviar a localização.",
    },
    {
      id: 3,
      pergunta: "Como trocar a coleira?",
      resposta:
        "A troca de coleira deve ser feita pelo suporte oficial da DunDum. Entre em contato pelo e-mail suporte@dundum.com.br ou pelo chat abaixo.",
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
      resposta: "Com uso normal, a bateria dura entre 15 e 30 dias.",
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
        <a href="mailto:suporte@dundum.com.br" className={styles.ajudaContato}>
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
            <span className={styles.prefItemDesc}>suporte@dundum.com.br</span>
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

export function ModalConfiguracoes({ onClose }) {
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
      <ConfigNotificacoes onClose={onClose} onVoltar={() => setTela("menu")} />
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
