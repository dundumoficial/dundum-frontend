import { useRef, useState } from "react";
import { Modal } from "../ModalBase/ModalBase.jsx";
import styles from "./ModalPet.module.css";

import iconeTrocar from "../../assets/img/dashboard/icon-trocar.svg";
import iconeCaneta from "../../assets/img/dashboard/icon-caneta.svg";
import iconeLogoAzul from "../../assets/img/dashboard/icone-logo-azul.webp";

function criarDataSegura(dia, mes, ano) {
  return new Date(Number(ano), Number(mes) - 1, Number(dia));
}

function dataValida(dia, mes, ano) {
  const d = Number(dia),
    m = Number(mes),
    a = Number(ano);

  if (isNaN(d) || isNaN(m) || isNaN(a)) return false;
  if (m < 1 || m > 12) return false;
  if (d < 1) return false;

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
  if (totalMeses < 12)
    return `${totalMeses} ${totalMeses > 1 ? "meses" : "mês"}`;

  const mesesRestantes = totalMeses % 12;
  if (mesesRestantes === 0) return `${anos} ano${anos > 1 ? "s" : ""}`;

  return `${anos} ano${anos > 1 ? "s" : ""} e ${mesesRestantes} ${mesesRestantes > 1 ? "meses" : "mês"}`;
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

export function ModalPet({ pet, onClose }) {
  const [tela, setTela] = useState("perfil");

  if (tela === "trocar") {
    const pets = [
      { id: 1, nome: pet.nome, raca: pet.raca, foto: pet.foto, ativo: true },
    ];

    return (
      <Modal
        titulo="Selecionar Pet"
        onClose={onClose}
        onVoltar={() => setTela("perfil")}
      >
        <div className={styles.modalConteudo}>
          {pets.map((p) => (
            <button
              key={p.id}
              className={`${styles.trocarPetItem} ${p.ativo ? styles.trocarPetAtivo : ""}`}
              onClick={() => setTela("perfil")}
            >
              <img src={p.foto} alt={p.nome} className={styles.trocarPetFoto} />
              <div className={styles.trocarPetInfo}>
                <strong>{p.nome}</strong>
                <span>{p.raca}</span>
              </div>
              {p.ativo && <span className={styles.trocarPetCheck}>✓</span>}
            </button>
          ))}
          <button
            className={styles.btnAdicionarPet}
            onClick={() => setTela("criar")}
          >
            <span className={styles.btnAdicionarPetIcone}>+</span>
            Adicionar pet
          </button>
        </div>
      </Modal>
    );
  }

  if (tela === "criar")
    return <CriarPet onClose={onClose} onVoltar={() => setTela("trocar")} />;

  if (tela === "editar")
    return (
      <EditarPet
        pet={pet}
        onClose={onClose}
        onVoltar={() => setTela("perfil")}
      />
    );

  const campos = [
    { label: "Raça", valor: pet.raca },
    { label: "Idade", valor: pet.idade },
    { label: "Peso", valor: pet.peso ? `${pet.peso} kg` : "—" },
    { label: "Sexo", valor: pet.sexo },
    { label: "Coleira", valor: pet.coleira },
  ];

  return (
    <Modal titulo="Perfil do Pet" onClose={onClose}>
      <div className={styles.modalPetConteudo}>
        <img src={pet.foto} alt={pet.nome} className={styles.modalPetFoto} />
        <h3 className={styles.modalPetNome}>{pet.nome}</h3>
        <div className={styles.modalPetInfo}>
          {campos.map(({ label, valor }) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{valor}</strong>
            </div>
          ))}
        </div>
        <div className={styles.modalPetAcoes}>
          <button
            className={styles.btnAcaoPet}
            onClick={() => setTela("trocar")}
          >
            <img src={iconeTrocar} alt="Ícone de trocar" />
            Trocar pet
          </button>
          <button
            className={styles.btnAcaoPet}
            onClick={() => setTela("editar")}
          >
            <img src={iconeCaneta} alt="Ícone de caneta" />
            Editar pet
          </button>
        </div>
      </div>
    </Modal>
  );
}

function CriarPet({ onClose, onVoltar }) {
  const fileInputRef = useRef(null);
  const [foto, setFoto] = useState(null);
  const [nome, setNome] = useState("");
  const [raca, setRaca] = useState("");
  const [sexo, setSexo] = useState("Macho");
  const [peso, setPeso] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [erroData, setErroData] = useState("");

  const idadeCalculada =
    nascimento.length === 10 && !erroData
      ? (() => {
          const [d, m, a] = nascimento.split("/");
          return calcularIdade(d, m, a);
        })()
      : null;

  function handleFoto(e) {
    const file = e.target.files[0];
    if (file) setFoto(URL.createObjectURL(file));
  }

  function handleDataChange(e) {
    const value = aplicarMascaraData(e.target.value);
    setNascimento(value);
    setErroData(value.length === 10 ? validarCampoData(value) : "");
  }

  function handleSalvar() {
    if (!nome || !raca || !nascimento || erroData || nascimento.length < 10) {
      alert("Preencha todos os campos corretamente");
      return;
    }

    console.log("Novo pet:", { nome, raca, sexo, peso, nascimento, foto });
    onClose();
  }

  return (
    <Modal titulo="Adicionar Pet" onClose={onClose} onVoltar={onVoltar}>
      <div className={styles.modalConteudo}>
        <div className={styles.editarPetFotoWrap}>
          <img
            src={foto || iconeLogoAzul}
            alt="Foto do pet"
            className={styles.modalPetFoto}
            onClick={() => fileInputRef.current.click()}
          />
          <button
            className={styles.editarPetFotoBtn}
            onClick={() => fileInputRef.current.click()}
          >
            Clique para adicionar foto
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className={styles.inputFileHidden}
            onChange={handleFoto}
          />
        </div>

        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel}>Nome</label>
          <input
            className={styles.editarPetInput}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel}>Raça</label>
          <select
            className={styles.editarPetInput}
            value={raca}
            onChange={(e) => setRaca(e.target.value)}
          >
            <option value="">Selecione</option>
            {getRacas().map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel}>Sexo</label>
          <select
            className={styles.editarPetInput}
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
          >
            <option value="Macho">Macho</option>
            <option value="Fêmea">Fêmea</option>
          </select>
        </div>

        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel}>Peso (kg)</label>
          <div className={styles.pesoInputWrap}>
            <input
              type="number"
              min="0"
              max="150"
              step="0.1"
              className={`${styles.editarPetInput} ${styles.inputComUnidade}`}
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              placeholder="Ex: 8,5"
            />
            <span className={styles.pesoUnidade}>kg</span>
          </div>
        </div>

        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel}>Data de nascimento</label>
          <input
            type="text"
            placeholder="dd/mm/aaaa"
            className={styles.editarPetInput}
            value={nascimento}
            maxLength={10}
            onChange={handleDataChange}
          />
          {erroData && <span className={styles.erroData}>{erroData}</span>}
          {idadeCalculada && !erroData && (
            <span className={styles.editarPetIdade}>🐾 {idadeCalculada}</span>
          )}
        </div>

        <button className={styles.btnSalvar} onClick={handleSalvar}>
          Criar pet
        </button>
        <button className={styles.btnCancelar} onClick={onVoltar}>
          Cancelar
        </button>
      </div>
    </Modal>
  );
}

function EditarPet({ pet, onClose, onVoltar }) {
  const fileInputRef = useRef(null);
  const [foto, setFoto] = useState(pet.foto);
  const [peso, setPeso] = useState(pet.peso || "");
  const [nascimento, setNascimento] = useState("");
  const [erroData, setErroData] = useState("");

  const idadeCalculada =
    nascimento.length === 10 && !erroData
      ? (() => {
          const [d, m, a] = nascimento.split("/");
          return calcularIdade(d, m, a);
        })()
      : null;

  function handleFoto(e) {
    const file = e.target.files[0];
    if (file) setFoto(URL.createObjectURL(file));
  }

  function handleDataChange(e) {
    const value = aplicarMascaraData(e.target.value);
    setNascimento(value);
    setErroData(value.length === 10 ? validarCampoData(value) : "");
  }

  return (
    <Modal titulo="Editar Pet" onClose={onClose} onVoltar={onVoltar}>
      <div className={styles.modalConteudo}>
        <div className={styles.editarPetFotoWrap}>
          <img
            src={foto}
            alt={pet.nome}
            className={styles.modalPetFoto}
            onClick={() => fileInputRef.current.click()}
          />
          <button
            className={styles.editarPetFotoBtn}
            onClick={() => fileInputRef.current.click()}
          >
            Clique para alterar foto
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className={styles.inputFileHidden}
            onChange={handleFoto}
          />
        </div>

        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel}>Nome</label>
          <input className={styles.editarPetInput} defaultValue={pet.nome} />
        </div>

        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel}>Raça</label>
          <select className={styles.editarPetInput} defaultValue={pet.raca}>
            {getRacas().map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel}>Sexo</label>
          <select className={styles.editarPetInput} defaultValue={pet.sexo}>
            <option value="Macho">Macho</option>
            <option value="Fêmea">Fêmea</option>
          </select>
        </div>

        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel}>Peso (kg)</label>
          <div className={styles.pesoInputWrap}>
            <input
              type="number"
              min="0"
              max="150"
              step="0.1"
              className={`${styles.editarPetInput} ${styles.inputComUnidade}`}
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              placeholder="Ex: 8,5"
            />
            <span className={styles.pesoUnidade}>kg</span>
          </div>
        </div>

        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel}>Data de nascimento</label>
          <input
            type="text"
            placeholder="dd/mm/aaaa"
            className={styles.editarPetInput}
            value={nascimento}
            maxLength={10}
            onChange={handleDataChange}
          />
          {erroData && <span className={styles.erroData}>{erroData}</span>}
          {idadeCalculada && !erroData && (
            <span className={styles.editarPetIdade}>🐾 {idadeCalculada}</span>
          )}
        </div>

        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel}>
            Coleira
            <span className={styles.coleiraInfoWrap}>
              <span className={styles.coleiraInfoIcone}>ℹ</span>
              <span className={styles.coleiraTooltip}>
                Para alterar a coleira entre em contato com o suporte da DunDum
              </span>
            </span>
          </label>
          <input
            className={`${styles.editarPetInput} ${styles.editarPetInputBloqueado}`}
            defaultValue={pet.coleira}
            disabled
          />
        </div>

        <button className={styles.btnSalvar}>Salvar</button>
        <button className={styles.btnCancelar} onClick={onVoltar}>
          Cancelar
        </button>
        <button
          className={styles.btnRemoverPet}
          onClick={() => {
            if (confirm(`Remover ${pet.nome}?`)) onClose();
          }}
        >
          Remover pet
        </button>
      </div>
    </Modal>
  );
}

function getRacas() {
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
