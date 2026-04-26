import { useEffect, useRef, useState } from "react";
import styles from "./ModalContatoVeterinario.module.css";

import iconeTelefone from "../../assets/img/comunidade/icon-telefone.svg";
import iconeEmail from "../../assets/img/comunidade/icon-email.svg";

function aplicarMascaraTelefone(valor) {
  const nums = valor.replace(/\D/g, "").slice(0, 11);
  if (nums.length === 0) return "";
  if (nums.length <= 2) return `(${nums}`;
  if (nums.length <= 7) return `(${nums.slice(0, 2)}) ${nums.slice(2)}`;
  if (nums.length <= 11)
    return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7)}`;

  return valor;
}

export default function ModalContatoVeterinario({ vet, onClose }) {
  const overlayRef = useRef(null);
  const [enviado, setEnviado] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
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
      aria-labelledby="modal-vet-titulo"
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
              {vet?.nome ?? "O veterinário"} entrará em contato em breve. Fique
              de olho no seu e-mail.
            </p>
            <button className={styles.btnPrimary} onClick={onClose}>
              Fechar
            </button>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <div className={styles.headerBadge}>Contato</div>
              <h2 className={styles.titulo} id="modal-vet-titulo">
                Fale com{" "}
                <span className={styles.destaque}>
                  {vet?.nome ?? "o veterinário"}
                </span>
              </h2>
              {vet && <p className={styles.vetCidade}>{vet.cidade}</p>}
            </div>

            {vet && (
              <div className={styles.contatosRapidos}>
                <a
                  href={`https://wa.me/55${vet.tel.replace(/\D/g, "")}`}
                  className={styles.contatoItem}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={iconeTelefone}
                    alt="Telefone"
                    className={styles.contatoIconeImg}
                  />
                  <span>{vet.tel}</span>
                </a>
                <a href={`mailto:${vet.email}`} className={styles.contatoItem}>
                  <img
                    src={iconeEmail}
                    alt="Email"
                    className={styles.contatoIconeImg}
                  />
                  <span>{vet.email}</span>
                </a>
              </div>
            )}

            <div className={styles.divider}>
              <span className={styles.dividerTexto}>ou envie uma mensagem</span>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.linha2}>
                <div className={styles.campo}>
                  <label className={styles.label} htmlFor="cv-nome">
                    Seu nome
                  </label>
                  <input
                    id="cv-nome"
                    className={styles.input}
                    type="text"
                    name="nome"
                    placeholder="Maria Silva"
                    value={form.nome}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.campo}>
                  <label className={styles.label} htmlFor="cv-telefone">
                    Telefone
                  </label>
                  <input
                    id="cv-telefone"
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
                <label className={styles.label} htmlFor="cv-email">
                  E-mail
                </label>
                <input
                  id="cv-email"
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
                <label className={styles.label} htmlFor="cv-mensagem">
                  Mensagem
                </label>
                <textarea
                  id="cv-mensagem"
                  className={styles.textarea}
                  name="mensagem"
                  placeholder="Descreva o que precisa, sintomas do pet, urgência..."
                  rows={4}
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
