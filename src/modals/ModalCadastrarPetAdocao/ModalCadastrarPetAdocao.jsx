import { useEffect, useRef, useState } from "react";
import styles from "./ModalCadastrarPetAdocao.module.css";

import iconeCâmera from "../../assets/img/comunidade/icon-camera.svg";

function criarDataSegura(dia, mes, ano) {
  return new Date(Number(ano), Number(mes) - 1, Number(dia));
}

function dataValida(dia, mes, ano) {
  const d = Number(dia),
    m = Number(mes),
    a = Number(ano);

  if (isNaN(d) || isNaN(m) || isNaN(a)) return false;
  if (m < 1 || m > 12 || d < 1) return false;

  const data = criarDataSegura(d, m, a);
  return (
    data.getFullYear() === a &&
    data.getMonth() + 1 === m &&
    data.getDate() === d
  );
}

function calcularIdade(dia, mes, ano) {
  const nasc = criarDataSegura(dia, mes, ano);
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  let anos = hoje.getFullYear() - nasc.getFullYear();
  const diffMes = hoje.getMonth() - nasc.getMonth();
  const diffDia = hoje.getDate() - nasc.getDate();
  if (diffMes < 0 || (diffMes === 0 && diffDia < 0)) anos--;

  let totalMeses = anos * 12 + diffMes;
  if (diffDia < 0) totalMeses--;
  if (totalMeses < 0) return null;
  if (totalMeses < 1) return "Menos de 1 mês";
  if (totalMeses < 12) return totalMeses + (totalMeses > 1 ? " meses" : " mes");

  const mesesRestantes = totalMeses % 12;
  if (mesesRestantes === 0) return anos + (anos > 1 ? " anos" : " ano");
  return (
    anos +
    (anos > 1 ? " anos" : " ano") +
    " e " +
    mesesRestantes +
    (mesesRestantes > 1 ? " meses" : " mes")
  );
}

function aplicarMascaraData(raw) {
  let v = raw.replace(/\D/g, "").slice(0, 8);
  if (v.length > 4) v = v.slice(0, 2) + "/" + v.slice(2, 4) + "/" + v.slice(4);
  else if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
  return v;
}

function validarCampoData(value) {
  if (value.length < 10) return "";

  const [dia, mes, ano] = value.split("/");
  if (!dataValida(dia, mes, ano)) return "Data inválida";

  const dataDigitada = criarDataSegura(dia, mes, ano);
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  if (dataDigitada > hoje) return "Data não pode ser futura";

  let idadeAnos = hoje.getFullYear() - dataDigitada.getFullYear();

  const m = hoje.getMonth() - dataDigitada.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < dataDigitada.getDate()))
    idadeAnos--;

  if (idadeAnos > 30) return "Idade máxima é 30 anos";
  return "";
}

function getRaçasCachorro() {
  return [
    "Akita",
    "Basenji",
    "Beagle",
    "Bichon Frisé",
    "Border Collie",
    "Boxer",
    "Bull Terrier",
    "Bulldog",
    "Cavalier King Charles",
    "Chow Chow",
    "Cocker Spaniel",
    "Dachshund",
    "Dálmata",
    "Dobermann",
    "Golden Retriever",
    "Greyhound",
    "Husky Siberiano",
    "Labrador Retriever",
    "Lhasa Apso",
    "Maltês",
    "Pastor Alemão",
    "Pastor Australiano",
    "Pitbull",
    "Poodle",
    "Pug",
    "Rottweiler",
    "São Bernardo",
    "Schnauzer",
    "Shar Pei",
    "Shih Tzu",
    "Spitz Alemão",
    "Vizsla",
    "Vira-lata",
    "Weimaraner",
    "Yorkshire Terrier",
  ];
}

function getRaçasGato() {
  return [
    "Abissínio",
    "Bengal",
    "Birmanês",
    "British Shorthair",
    "Devon Rex",
    "Himalaio",
    "Maine Coon",
    "Munchkin",
    "Persa",
    "Ragdoll",
    "Savannah",
    "Scottish Fold",
    "Siamês",
    "Sphynx",
    "Vira-lata",
  ];
}

function aplicarMascaraTelefone(valor) {
  const nums = valor.replace(/\D/g, "").slice(0, 11);
  if (nums.length === 0) return "";
  if (nums.length <= 2) return "(" + nums;
  if (nums.length <= 7) return "(" + nums.slice(0, 2) + ") " + nums.slice(2);
  return "(" + nums.slice(0, 2) + ") " + nums.slice(2, 7) + "-" + nums.slice(7);
}

export default function ModalCadastrarPetAdocao({ onClose }) {
  const overlayRef = useRef(null);
  const fileInputRef = useRef(null);
  const [etapa, setEtapa] = useState(1);
  const [preview, setPreview] = useState(null);
  const [nascimento, setNascimento] = useState("");
  const [erroData, setErroData] = useState("");

  const idadeCalculada =
    nascimento.length === 10 && !erroData
      ? (() => {
          const [d, m, a] = nascimento.split("/");
          return calcularIdade(d, m, a);
        })()
      : null;

  const [form, setForm] = useState({
    nomePet: "",
    especie: "cao",
    raca: "",
    sexo: "",
    porte: "",
    cidade: "",
    nomeResponsavel: "",
    telefone: "",
    email: "",
    observacoes: "",
  });

  const racas = form.especie === "cao" ? getRaçasCachorro() : getRaçasGato();

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
    if (name === "especie") {
      setForm((prev) => ({ ...prev, especie: value, raca: "" }));
      return;
    }
    setForm((prev) => ({
      ...prev,
      [name]: name === "telefone" ? aplicarMascaraTelefone(value) : value,
    }));
  };

  const handleDataChange = (e) => {
    const value = aplicarMascaraData(e.target.value);
    setNascimento(value);
    setErroData(value.length === 10 ? validarCampoData(value) : "");
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
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
      aria-labelledby="modal-cadastrar-titulo"
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
            <h2 className={styles.sucessoTitulo}>Pet cadastrado!</h2>
            <p className={styles.sucessoTexto}>
              <strong>{form.nomePet || "Seu pet"}</strong> foi cadastrado com
              sucesso. Nossa equipe vai analisar e publicar em breve para que
              ele encontre um lar.
            </p>
            <button className={styles.btnPrimary} onClick={onClose}>
              Fechar
            </button>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <div className={styles.headerBadge}>Cadastro</div>
              <h2 className={styles.titulo} id="modal-cadastrar-titulo">
                Cadastrar{" "}
                <span className={styles.destaque}>pet para adoção</span>
              </h2>
              <p className={styles.subtitulo}>
                Ajude seu pet a encontrar um lar cheio de amor.
              </p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div
                className={styles.uploadArea}
                onClick={() => fileInputRef.current?.click()}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className={styles.previewImg}
                  />
                ) : (
                  <div className={styles.uploadPlaceholder}>
                    <img
                      src={iconeCâmera}
                      alt="Câmera"
                      className={styles.uploadIcone}
                    />
                    <span className={styles.uploadTexto}>
                      Clique para adicionar uma foto
                    </span>
                    <span className={styles.uploadDica}>
                      JPG, PNG ou WEBP até 5 MB
                    </span>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className={styles.inputFile}
                  onChange={handleFileChange}
                />
              </div>

              <p className={styles.secaoLabel}>Dados do pet</p>

              <div className={styles.linha2}>
                <div className={styles.campo}>
                  <label className={styles.label} htmlFor="cp-nome">
                    Nome
                  </label>
                  <input
                    id="cp-nome"
                    className={styles.input}
                    type="text"
                    name="nomePet"
                    placeholder="Ex: Thor"
                    value={form.nomePet}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.campo}>
                  <label className={styles.label} htmlFor="cp-especie">
                    Espécie
                  </label>
                  <select
                    id="cp-especie"
                    className={styles.select}
                    name="especie"
                    value={form.especie}
                    onChange={handleChange}
                    required
                  >
                    <option value="cao">Cachorro</option>
                    <option value="gato">Gato</option>
                  </select>
                </div>
              </div>

              <div className={styles.linha3}>
                <div className={styles.campo}>
                  <label className={styles.label} htmlFor="cp-raca">
                    Raça
                  </label>
                  <select
                    id="cp-raca"
                    className={styles.select}
                    name="raca"
                    value={form.raca}
                    onChange={handleChange}
                    required
                  >
                    {racas.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.campo}>
                  <label className={styles.label} htmlFor="cp-sexo">
                    Sexo
                  </label>
                  <select
                    id="cp-sexo"
                    className={styles.select}
                    name="sexo"
                    value={form.sexo}
                    onChange={handleChange}
                    required
                  >
                    <option value="macho">Macho</option>
                    <option value="femea">Fêmea</option>
                  </select>
                </div>
                <div className={styles.campo}>
                  <label className={styles.label} htmlFor="cp-porte">
                    Porte
                  </label>
                  <select
                    id="cp-porte"
                    className={styles.select}
                    name="porte"
                    value={form.porte}
                    onChange={handleChange}
                    required
                  >
                    <option value="pequeno">Pequeno</option>
                    <option value="medio">Médio</option>
                    <option value="grande">Grande</option>
                  </select>
                </div>
              </div>

              <div className={styles.campo}>
                <label className={styles.label} htmlFor="cp-nascimento">
                  Data de nascimento
                </label>
                <input
                  id="cp-nascimento"
                  className={styles.input}
                  type="text"
                  placeholder="dd/mm/aaaa"
                  value={nascimento}
                  maxLength={10}
                  onChange={handleDataChange}
                  inputMode="numeric"
                  required
                />
                {erroData && (
                  <span className={styles.erroData}>{erroData}</span>
                )}
                {idadeCalculada && !erroData && (
                  <span className={styles.idadeCalculada}>
                    🐾 {idadeCalculada}
                  </span>
                )}
              </div>

              <div className={styles.campo}>
                <label className={styles.label} htmlFor="cp-cidade">
                  Cidade
                </label>
                <input
                  id="cp-cidade"
                  className={styles.input}
                  type="text"
                  name="cidade"
                  placeholder="Ex: São Paulo, SP"
                  value={form.cidade}
                  onChange={handleChange}
                  required
                />
              </div>

              <p className={styles.secaoLabel}>Seus dados (responsável)</p>

              <div className={styles.campo}>
                <label className={styles.label} htmlFor="cp-responsavel">
                  Nome
                </label>
                <input
                  id="cp-responsavel"
                  className={styles.input}
                  type="text"
                  name="nomeResponsavel"
                  placeholder="Seu nome completo"
                  value={form.nomeResponsavel}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.linha2}>
                <div className={styles.campo}>
                  <label className={styles.label} htmlFor="cp-telefone">
                    Telefone
                  </label>
                  <input
                    id="cp-telefone"
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
                  <label className={styles.label} htmlFor="cp-email">
                    E-mail
                  </label>
                  <input
                    id="cp-email"
                    className={styles.input}
                    type="email"
                    name="email"
                    placeholder="seu@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.campo}>
                <label className={styles.label} htmlFor="cp-obs">
                  Observações
                </label>
                <textarea
                  id="cp-obs"
                  className={styles.textarea}
                  name="observacoes"
                  placeholder="Saúde do pet, vacinas em dia, castrado, temperamento..."
                  rows={3}
                  value={form.observacoes}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className={styles.btnPrimary}>
                Cadastrar pet
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
