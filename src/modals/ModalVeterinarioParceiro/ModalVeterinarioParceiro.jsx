import { useEffect, useRef, useState } from "react";
import styles from "./ModalVeterinarioParceiro.module.css";

import iconeLupa from "../../assets/img/comunidade/icon-lupa.svg";
import iconeCelular from "../../assets/img/comunidade/icon-celular.svg";
import iconeCoracao from "../../assets/img/comunidade/icon-coracao.svg";

const especialidades = [
  "Clínica Geral",
  "Dermatologia",
  "Ortopedia",
  "Cardiologia",
  "Oncologia",
  "Neurologia",
  "Oftalmologia",
  "Odontologia",
  "Comportamental",
  "Fisioterapia",
];

function aplicarMascaraTelefone(valor) {
  const nums = valor.replace(/\D/g, "").slice(0, 11);
  if (nums.length === 0) return "";
  if (nums.length <= 2) return `(${nums}`;
  if (nums.length <= 7) return `(${nums.slice(0, 2)}) ${nums.slice(2)}`;
  if (nums.length <= 11)
    return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7)}`;

  return valor;
}

export default function ModalVeterinarioParceiro({ onClose }) {
  const overlayRef = useRef(null);
  const [etapa, setEtapa] = useState(1);
  const [form, setForm] = useState({
    nome: "",
    crmv: "",
    especialidade: "",
    clinica: "",
    cidade: "",
    telefone: "",
    email: "",
    atendimento: "",
    sobre: "",
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
      aria-labelledby="modal-vet-parceiro-titulo"
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
              Recebemos seu cadastro,{" "}
              <strong>{form.nome || "doutor(a)"}</strong>. Nossa equipe vai
              analisar suas informações e retornar em até 3 dias úteis.
            </p>
            <div className={styles.sucessoDestaque}>
              Bem-vindo(a) à rede DunDum!
            </div>
            <button className={styles.btnPrimary} onClick={onClose}>
              Fechar
            </button>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <div className={styles.headerBadge}>Parceria</div>
              <h2 className={styles.titulo} id="modal-vet-parceiro-titulo">
                Seja um{" "}
                <span className={styles.destaque}>veterinário parceiro</span>
              </h2>
              <p className={styles.subtitulo}>
                Conecte-se a tutores que precisam de você. Rápido, gratuito e
                sem burocracia.
              </p>
            </div>

            <div className={styles.beneficios}>
              <div className={styles.beneficioItem}>
                <img
                  src={iconeLupa}
                  alt="Lupa"
                  className={styles.beneficioIcone}
                />
                <span className={styles.beneficioTexto}>Mais visibilidade</span>
              </div>
              <div className={styles.beneficioItem}>
                <img
                  src={iconeCelular}
                  alt="Celular"
                  className={styles.beneficioIcone}
                />
                <span className={styles.beneficioTexto}>Contato direto</span>
              </div>
              <div className={styles.beneficioItem}>
                <img
                  src={iconeCoracao}
                  alt="Coração"
                  className={styles.beneficioIcone}
                />
                <span className={styles.beneficioTexto}>100% gratuito</span>
              </div>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <p className={styles.secaoLabel}>Dados profissionais</p>

              <div className={styles.linha2}>
                <div className={styles.campo}>
                  <label className={styles.label} htmlFor="vp-nome">
                    Nome completo
                  </label>
                  <input
                    id="vp-nome"
                    className={styles.input}
                    type="text"
                    name="nome"
                    placeholder="Nome Sobrenome"
                    value={form.nome}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.campo}>
                  <label className={styles.label} htmlFor="vp-crmv">
                    CRMV
                  </label>
                  <input
                    id="vp-crmv"
                    className={styles.input}
                    type="text"
                    name="crmv"
                    placeholder="Ex: 12345-SP"
                    value={form.crmv}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.linha2}>
                <div className={styles.campo}>
                  <label className={styles.label} htmlFor="vp-especialidade">
                    Especialidade principal
                  </label>
                  <select
                    id="vp-especialidade"
                    className={styles.select}
                    name="especialidade"
                    value={form.especialidade}
                    onChange={handleChange}
                    required
                  >
                    {especialidades.map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.campo}>
                  <label className={styles.label} htmlFor="vp-atendimento">
                    Tipo de atendimento
                  </label>
                  <select
                    id="vp-atendimento"
                    className={styles.select}
                    name="atendimento"
                    value={form.atendimento}
                    onChange={handleChange}
                    required
                  >
                    <option value="presencial">Presencial</option>
                    <option value="domiciliar">Domiciliar</option>
                    <option value="teleconsulta">Teleconsulta</option>
                    <option value="todos">Todos os tipos</option>
                  </select>
                </div>
              </div>

              <div className={styles.linha2}>
                <div className={styles.campo}>
                  <label className={styles.label} htmlFor="vp-clinica">
                    Clínica / Hospital
                  </label>
                  <input
                    id="vp-clinica"
                    className={styles.input}
                    type="text"
                    name="clinica"
                    placeholder="Nome da clínica (opcional)"
                    value={form.clinica}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.campo}>
                  <label className={styles.label} htmlFor="vp-cidade">
                    Cidade
                  </label>
                  <input
                    id="vp-cidade"
                    className={styles.input}
                    type="text"
                    name="cidade"
                    placeholder="Ex: São Paulo, SP"
                    value={form.cidade}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <p className={styles.secaoLabel}>Contato</p>

              <div className={styles.linha2}>
                <div className={styles.campo}>
                  <label className={styles.label} htmlFor="vp-telefone">
                    Telefone profissional
                  </label>
                  <input
                    id="vp-telefone"
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
                <div className={styles.campo}>
                  <label className={styles.label} htmlFor="vp-email">
                    E-mail profissional
                  </label>
                  <input
                    id="vp-email"
                    className={styles.input}
                    type="email"
                    name="email"
                    placeholder="dr@clinica.com.br"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.campo}>
                <label className={styles.label} htmlFor="vp-sobre">
                  Sobre você
                </label>
                <textarea
                  id="vp-sobre"
                  className={styles.textarea}
                  name="sobre"
                  placeholder="Experiência, diferenciais, tipo de atendimento, espécies que atende..."
                  rows={3}
                  value={form.sobre}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className={styles.btnPrimary}>
                Quero ser parceiro DunDum
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
