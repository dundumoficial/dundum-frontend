import { useEffect, useRef, useState } from "react";
import styles from "./ModalAdotarPet.module.css";

function aplicarMascaraTelefone(valor) {
  const nums = valor.replace(/\D/g, "").slice(0, 11);
  if (nums.length === 0) return "";
  if (nums.length <= 2) return `(${nums}`;
  if (nums.length <= 7) return `(${nums.slice(0, 2)}) ${nums.slice(2)}`;
  if (nums.length <= 11)
    return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7)}`;

  return valor;
}

export default function ModalAdotarPet({ pet, onClose }) {
  const overlayRef = useRef(null);
  const [etapa, setEtapa] = useState(1);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    moradia: "",
    temPets: "",
    motivacao: "",
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
    setEtapa(2);
  };

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-adotar-titulo"
    >
      <div className={styles.modal}>
        <button
          className={styles.btnFechar}
          onClick={onClose}
          aria-label="Fechar"
        >
          <span className={styles.btnFecharX}>✕</span>
        </button>

        {etapa === 2 ? (
          <div className={styles.sucesso}>
            <div className={styles.sucessoIcone}>✓</div>
            <h2 className={styles.sucessoTitulo}>Solicitação enviada!</h2>
            <p className={styles.sucessoTexto}>
              Sua solicitação de adoção de{" "}
              <strong>{pet?.nome ?? "o pet"}</strong> foi recebida. Entraremos
              em contato em até 2 dias úteis.
            </p>
            <button className={styles.btnPrimary} onClick={onClose}>
              Fechar
            </button>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              {pet?.img && (
                <img src={pet.img} alt={pet.nome} className={styles.petImg} />
              )}
              <div className={styles.headerInfo}>
                <div className={styles.headerBadge}>Adoção</div>
                <h2 className={styles.titulo} id="modal-adotar-titulo">
                  {pet?.nome ?? "o pet"}
                </h2>
                {pet && (
                  <p className={styles.petMeta}>
                    {pet.idade} &nbsp;•&nbsp; {pet.cidade}
                  </p>
                )}
              </div>
            </div>

            <p className={styles.instrucao}>
              Preencha o formulário abaixo para iniciar o processo de adoção.
              Nossa equipe avaliará seu perfil e entrará em contato.
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.linha2}>
                <div className={styles.campo}>
                  <label className={styles.label} htmlFor="ap-nome">
                    Seu nome
                  </label>
                  <input
                    id="ap-nome"
                    className={styles.input}
                    type="text"
                    name="nome"
                    placeholder="João Souza"
                    value={form.nome}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.campo}>
                  <label className={styles.label} htmlFor="ap-telefone">
                    Telefone
                  </label>
                  <input
                    id="ap-telefone"
                    className={styles.input}
                    type="tel"
                    name="telefone"
                    placeholder="(11) 99999-0000"
                    value={form.telefone}
                    onChange={handleChange}
                    inputMode="numeric"
                    required
                  />
                </div>
              </div>

              <div className={styles.campo}>
                <label className={styles.label} htmlFor="ap-email">
                  E-mail
                </label>
                <input
                  id="ap-email"
                  className={styles.input}
                  type="email"
                  name="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.linha2}>
                <div className={styles.campo}>
                  <label className={styles.label} htmlFor="ap-moradia">
                    Tipo de moradia
                  </label>
                  <select
                    id="ap-moradia"
                    className={styles.select}
                    name="moradia"
                    value={form.moradia}
                    onChange={handleChange}
                    required
                  >
                    <option value="casa">Casa com quintal</option>
                    <option value="casa-sem">Casa sem quintal</option>
                    <option value="apto">Apartamento</option>
                    <option value="sitio">Sítio / Chácara</option>
                  </select>
                </div>
                <div className={styles.campo}>
                  <label className={styles.label} htmlFor="ap-temPets">
                    Tem outros pets?
                  </label>
                  <select
                    id="ap-temPets"
                    className={styles.select}
                    name="temPets"
                    value={form.temPets}
                    onChange={handleChange}
                    required
                  >
                    <option value="nao">Não</option>
                    <option value="sim-caes">Sim, cão(s)</option>
                    <option value="sim-gatos">Sim, gato(s)</option>
                    <option value="sim-ambos">Sim, ambos</option>
                  </select>
                </div>
              </div>

              <div className={styles.campo}>
                <label className={styles.label} htmlFor="ap-motivacao">
                  Por que quer adotar {pet?.nome ?? "este pet"}?
                </label>
                <textarea
                  id="ap-motivacao"
                  className={styles.textarea}
                  name="motivacao"
                  placeholder="Conte um pouco sobre sua rotina e como você vai cuidar do pet..."
                  rows={3}
                  value={form.motivacao}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className={styles.btnPrimary}>
                Enviar solicitação de adoção
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
