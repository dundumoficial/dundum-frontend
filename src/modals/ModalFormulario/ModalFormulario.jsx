import { useEffect, useRef, useState } from "react";
import styles from "./ModalFormulario.module.css";

function aplicarMascaraTelefone(valor) {
  const nums = valor.replace(/\D/g, "").slice(0, 11);
  if (nums.length === 0) return "";
  if (nums.length <= 2) return `(${nums}`;
  if (nums.length <= 7) return `(${nums.slice(0, 2)}) ${nums.slice(2)}`;
  return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7)}`;
}

const assuntos = [
  "Problema com a coleira",
  "Dúvida sobre dados do pet",
  "Suporte técnico",
  "Cancelamento / reembolso",
  "Sugestão de melhoria",
  "Outro",
];

export default function ModalFormulario({ onClose }) {
  const overlayRef = useRef(null);
  const [enviado, setEnviado] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: "",
  });

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "telefone" ? aplicarMascaraTelefone(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-formulario-titulo"
    >
      <div className={styles.modal}>
        <button
          className={styles.btnFechar}
          onClick={onClose}
          aria-label="Fechar"
        >
          <span className={styles.btnFecharX}>✕</span>
        </button>

        {enviado ? (
          <div className={styles.sucesso}>
            <div className={styles.sucessoIcone}>✓</div>
            <h2 className={styles.sucessoTitulo}>Mensagem enviada!</h2>
            <p className={styles.sucessoTexto}>
              Nossa equipe vai analisar sua solicitação e retornar em até{" "}
              <strong>24 horas úteis</strong>.
            </p>
            <button className={styles.btnPrimary} onClick={onClose}>
              Fechar
            </button>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <div className={styles.headerBadge}>Formulário de Contato</div>
              <h2 className={styles.titulo} id="modal-formulario-titulo">
                Envie sua <span className={styles.destaque}>mensagem</span>
              </h2>
              <p className={styles.subtitulo}>
                Preencha os campos abaixo e nossa equipe entrará em contato em
                breve.
              </p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.linha2}>
                <div className={styles.campo}>
                  <label className={styles.label} htmlFor="mf-nome">
                    Nome
                  </label>
                  <input
                    id="mf-nome"
                    className={styles.input}
                    type="text"
                    name="nome"
                    placeholder="Seu nome completo"
                    value={form.nome}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.campo}>
                  <label className={styles.label} htmlFor="mf-telefone">
                    Telefone
                  </label>
                  <input
                    id="mf-telefone"
                    className={styles.input}
                    type="tel"
                    name="telefone"
                    placeholder="(11) 99999-0000"
                    value={form.telefone}
                    onChange={handleChange}
                    inputMode="numeric"
                  />
                </div>
              </div>

              <div className={styles.campo}>
                <label className={styles.label} htmlFor="mf-email">
                  E-mail
                </label>
                <input
                  id="mf-email"
                  className={styles.input}
                  type="email"
                  name="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.campo}>
                <label className={styles.label} htmlFor="mf-assunto">
                  Assunto
                </label>
                <select
                  id="mf-assunto"
                  className={styles.select}
                  name="assunto"
                  value={form.assunto}
                  onChange={handleChange}
                  required
                >
                  {assuntos.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.campo}>
                <label className={styles.label} htmlFor="mf-mensagem">
                  Mensagem
                </label>
                <textarea
                  id="mf-mensagem"
                  className={styles.textarea}
                  name="mensagem"
                  placeholder="Descreva sua dúvida ou problema com o máximo de detalhes..."
                  rows={5}
                  value={form.mensagem}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className={styles.btnPrimary}>
                Enviar mensagem
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
