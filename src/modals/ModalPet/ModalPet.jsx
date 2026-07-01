import { useRef, useState, useEffect } from "react";
import { Modal } from "../ModalBase/ModalBase.jsx";
import { api } from "../../services/api.js";
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

function validarNumeroSerie(valor) {
  const v = valor.trim().toUpperCase();
  if (!v) return "Número de série obrigatório";
  if (v.length < 8) return "Número de série muito curto";
  if (v.length > 30) return "Número de série muito longo";
  if (!/^[A-Z0-9-]+$/.test(v)) return "Use apenas letras, números e hífen";
  return "";
}

function getRacas() {
  return [
    "Selecione a raça",
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

// MODAL PRINCIPAL
export function ModalPet({ pet, onClose }) {
  const [tela, setTela] = useState(pet ? "perfil" : "criar");
  const [pets, setPets] = useState(null);
  const [carregandoPets, setCarregandoPets] = useState(false);

  async function carregarPets() {
    setCarregandoPets(true);
    try {
      const lista = await api.get("/users/pets");
      setPets(lista);
    } catch {
      setPets([]);
    } finally {
      setCarregandoPets(false);
    }
  }

  useEffect(() => {
    if (tela === "trocar") {
      carregarPets();
    }
  }, [tela]);

  async function handleSelecionarPet(p) {
    if (p.ativo) {
      setTela("perfil");
      return;
    }
    try {
      await api.patch(`/users/pets/${p.id}/ativo`);
      window.location.reload();
    } catch (err) {
      console.error("Erro ao trocar pet ativo:", err);
    }
  }

  if (tela === "trocar") {
    return (
      <Modal
        titulo="Selecionar Pet"
        onClose={onClose}
        onVoltar={() => setTela("perfil")}
      >
        <div className={styles.modalConteudo}>
          {carregandoPets ? (
            <p
              style={{
                textAlign: "center",
                padding: "20px",
                color: "var(--color-dark-blue)",
                fontFamily: "var(--font-poppins)",
              }}
            >
              Carregando pets...
            </p>
          ) : (
            (pets ?? []).map((p) => (
              <button
                key={p.id}
                className={`${styles.trocarPetItem} ${p.ativo ? styles.trocarPetAtivo : ""}`}
                onClick={() => handleSelecionarPet(p)}
              >
                <img
                  src={p.foto || iconeLogoAzul}
                  alt={p.nome}
                  className={styles.trocarPetFoto}
                />
                <div className={styles.trocarPetInfo}>
                  <strong>{p.nome}</strong>
                  <span>{p.raca !== "—" ? p.raca : "Raça não informada"}</span>
                </div>
                {p.ativo && <span className={styles.trocarPetCheck}>✓</span>}
              </button>
            ))
          )}
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

  if (tela === "criar") {
    return (
      <CriarPet
        onClose={onClose}
        onVoltar={pet ? () => setTela("trocar") : onClose}
        onCriado={() => {
          window.location.reload();
        }}
      />
    );
  }

  if (tela === "editar") {
    return (
      <EditarPet
        pet={pet}
        onClose={onClose}
        onVoltar={() => setTela("perfil")}
        onSalvo={() => window.location.reload()}
      />
    );
  }

  if (!pet) return null;

  const campos = [
    { label: "Raça", valor: pet.raca ?? "—" },
    { label: "Idade", valor: pet.idade ?? "—" },
    { label: "Peso", valor: pet.peso ? `${pet.peso}` : "—" },
    { label: "Sexo", valor: pet.sexo ?? "—" },
    { label: "Coleira", valor: pet.coleira ?? "—" },
  ];

  return (
    <Modal titulo="Perfil do Pet" onClose={onClose}>
      <div className={styles.modalPetConteudo}>
        <img
          src={pet.foto}
          alt={`Foto de ${pet.nome}`}
          className={styles.modalPetFoto}
        />
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
            <img src={iconeTrocar} alt="" aria-hidden="true" />
            Trocar pet
          </button>
          <button
            className={styles.btnAcaoPet}
            onClick={() => setTela("editar")}
          >
            <img src={iconeCaneta} alt="" aria-hidden="true" />
            Editar pet
          </button>
        </div>
      </div>
    </Modal>
  );
}

// CRIAR PET
function CriarPet({ onClose, onVoltar, onCriado }) {
  const fileInputRef = useRef(null);
  const [foto, setFoto] = useState(null);
  const [nome, setNome] = useState("");
  const [raca, setRaca] = useState("");
  const [sexo, setSexo] = useState("Macho");
  const [peso, setPeso] = useState("");
  const [numeroSerie, setNumeroSerie] = useState("");
  const [erroNumeroSerie, setErroNumeroSerie] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [erroData, setErroData] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erroGeral, setErroGeral] = useState("");

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

  async function handleSalvar() {
    const erroSerie = validarNumeroSerie(numeroSerie);
    setErroNumeroSerie(erroSerie);
    setErroGeral("");

    if (!nome.trim()) {
      setErroGeral("Nome é obrigatório");
      return;
    }
    if (!raca || raca === "Selecione a raça") {
      setErroGeral("Selecione a raça");
      return;
    }
    if (!nascimento || nascimento.length < 10) {
      setErroGeral("Preencha a data de nascimento");
      return;
    }
    if (erroData) return;
    if (erroSerie) return;

    const [d, m, a] = nascimento.split("/");
    const dataNascimento = `${a}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;

    setSalvando(true);
    try {
      await api.post("/users/pets", {
        nome: nome.trim(),
        raca,
        sexo,
        peso: peso ? parseFloat(peso) : null,
        data_nascimento: dataNascimento,
        coleira: numeroSerie.trim().toUpperCase(),
        foto: foto ?? null,
      });
      onCriado?.();
    } catch (err) {
      setErroGeral(err.message || "Erro ao criar pet. Tente novamente.");
    } finally {
      setSalvando(false);
    }
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
            style={{ cursor: "pointer" }}
          />
          <button
            className={styles.editarPetFotoBtn}
            onClick={() => fileInputRef.current.click()}
            type="button"
          >
            Clique para adicionar foto
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className={styles.inputFileHidden}
            onChange={handleFoto}
            aria-label="Selecionar foto do pet"
          />
        </div>

        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel} htmlFor="criar-nome">
            Nome
          </label>
          <input
            id="criar-nome"
            className={styles.editarPetInput}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel} htmlFor="criar-raca">
            Raça
          </label>
          <select
            id="criar-raca"
            className={styles.editarPetInput}
            value={raca}
            onChange={(e) => setRaca(e.target.value)}
          >
            {getRacas().map((r) => (
              <option
                key={r}
                value={r === "Selecione a raça" ? "" : r}
                disabled={r === "Selecione a raça"}
              >
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel} htmlFor="criar-sexo">
            Sexo
          </label>
          <select
            id="criar-sexo"
            className={styles.editarPetInput}
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
          >
            <option value="Macho">Macho</option>
            <option value="Fêmea">Fêmea</option>
          </select>
        </div>

        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel} htmlFor="criar-peso">
            Peso (kg)
          </label>
          <div className={styles.pesoInputWrap}>
            <input
              id="criar-peso"
              type="number"
              min="0"
              max="150"
              step="0.1"
              className={`${styles.editarPetInput} ${styles.inputComUnidade}`}
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              placeholder="Ex: 8,5"
            />
            <span className={styles.pesoUnidade} aria-hidden="true">
              kg
            </span>
          </div>
        </div>

        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel} htmlFor="criar-nasc">
            Data de nascimento
          </label>
          <input
            id="criar-nasc"
            type="text"
            placeholder="dd/mm/aaaa"
            className={styles.editarPetInput}
            value={nascimento}
            maxLength={10}
            onChange={handleDataChange}
            inputMode="numeric"
          />
          {erroData && (
            <span className={styles.erroData} role="alert">
              {erroData}
            </span>
          )}
          {idadeCalculada && !erroData && (
            <span className={styles.editarPetIdade} aria-live="polite">
              {idadeCalculada}
            </span>
          )}
        </div>

        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel} htmlFor="criar-serie">
            Número de série da coleira
            <span className={styles.coleiraInfoWrap}>
              <span className={styles.coleiraInfoIcone} aria-hidden="true">
                ℹ
              </span>
              <span className={styles.coleiraTooltip} role="tooltip">
                O número de série está na parte de trás da coleira
              </span>
            </span>
          </label>
          <input
            id="criar-serie"
            type="text"
            className={styles.editarPetInput}
            value={numeroSerie}
            maxLength={30}
            onChange={(e) => {
              const v = e.target.value.toUpperCase();
              setNumeroSerie(v);
              setErroNumeroSerie(validarNumeroSerie(v));
            }}
            autoComplete="off"
          />
          {erroNumeroSerie && (
            <span className={styles.erroData} role="alert">
              {erroNumeroSerie}
            </span>
          )}
        </div>

        {erroGeral && (
          <p
            className={styles.erroData}
            role="alert"
            style={{ textAlign: "center" }}
          >
            {erroGeral}
          </p>
        )}

        <button
          className={styles.btnSalvar}
          onClick={handleSalvar}
          disabled={salvando}
          aria-busy={salvando}
          type="button"
        >
          {salvando ? "Criando..." : "Criar pet"}
        </button>
        <button className={styles.btnCancelar} onClick={onVoltar} type="button">
          Cancelar
        </button>
      </div>
    </Modal>
  );
}

// EDITAR PET
function EditarPet({ pet, onClose, onVoltar, onSalvo }) {
  const fileInputRef = useRef(null);
  const [foto, setFoto] = useState(pet.foto);

  const [nome, setNome] = useState(pet.nome ?? "");
  const [raca, setRaca] = useState(pet.raca ?? "");
  const [sexo, setSexo] = useState(pet.sexo ?? "Macho");
  const [peso, setPeso] = useState(
    pet.peso ? String(pet.peso).replace("kg", "").trim() : "",
  );
  const [nascimento, setNascimento] = useState("");
  const [erroData, setErroData] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erroGeral, setErroGeral] = useState("");

  const [confirmarRemocao, setConfirmarRemocao] = useState(false);
  const [removendo, setRemovendo] = useState(false);

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

  async function handleSalvar() {
    setErroGeral("");
    if (!nome.trim()) {
      setErroGeral("Nome é obrigatório");
      return;
    }
    if (nascimento.length > 0 && nascimento.length < 10) {
      setErroGeral("Preencha a data completa");
      return;
    }
    if (erroData) return;

    const body = { nome: nome.trim(), raca, sexo, foto };
    if (peso) body.peso = parseFloat(peso);
    if (nascimento.length === 10) {
      const [d, m, a] = nascimento.split("/");
      body.data_nascimento = `${a}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
    }

    setSalvando(true);
    try {
      await api.put(`/users/pets/${pet.id}`, body);
      onSalvo?.();
    } catch (err) {
      setErroGeral(err.message || "Erro ao salvar. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  async function handleRemover() {
    setRemovendo(true);
    try {
      await api.delete(`/users/pets/${pet.id}`);
      onSalvo?.();
    } catch (err) {
      setErroGeral(err.message || "Erro ao remover pet.");
      setConfirmarRemocao(false);
    } finally {
      setRemovendo(false);
    }
  }

  if (confirmarRemocao) {
    return (
      <Modal
        titulo="Remover pet"
        onClose={onClose}
        onVoltar={() => setConfirmarRemocao(false)}
      >
        <div
          className={styles.modalConteudo}
          style={{ textAlign: "center", gap: 16 }}
        >
          <p
            style={{
              fontFamily: "var(--font-poppins)",
              fontSize: 15,
              color: "var(--color-dark-blue)",
              lineHeight: 1.6,
            }}
          >
            Tem certeza que deseja remover <strong>{pet.nome}</strong>?
            <br />
            Esta ação não pode ser desfeita.
          </p>
          <button
            className={styles.btnRemoverPet}
            onClick={handleRemover}
            disabled={removendo}
            type="button"
            aria-busy={removendo}
          >
            {removendo ? "Removendo..." : "Sim, remover"}
          </button>
          <button
            className={styles.btnCancelar}
            onClick={() => setConfirmarRemocao(false)}
            type="button"
          >
            Cancelar
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal titulo="Editar Pet" onClose={onClose} onVoltar={onVoltar}>
      <div className={styles.modalConteudo}>
        <div className={styles.editarPetFotoWrap}>
          <img
            src={foto}
            alt={`Foto de ${pet.nome}`}
            className={styles.modalPetFoto}
            onClick={() => fileInputRef.current.click()}
            style={{ cursor: "pointer" }}
          />
          <button
            className={styles.editarPetFotoBtn}
            onClick={() => fileInputRef.current.click()}
            type="button"
          >
            Clique para alterar foto
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className={styles.inputFileHidden}
            onChange={handleFoto}
            aria-label="Selecionar nova foto do pet"
          />
        </div>

        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel} htmlFor="editar-nome">
            Nome
          </label>
          <input
            id="editar-nome"
            className={styles.editarPetInput}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel} htmlFor="editar-raca">
            Raça
          </label>
          <select
            id="editar-raca"
            className={styles.editarPetInput}
            value={raca}
            onChange={(e) => setRaca(e.target.value)}
          >
            {getRacas()
              .filter((r) => r !== "Selecione a raça")
              .map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
          </select>
        </div>

        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel} htmlFor="editar-sexo">
            Sexo
          </label>
          <select
            id="editar-sexo"
            className={styles.editarPetInput}
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
          >
            <option value="Macho">Macho</option>
            <option value="Fêmea">Fêmea</option>
          </select>
        </div>

        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel} htmlFor="editar-peso">
            Peso (kg)
          </label>
          <div className={styles.pesoInputWrap}>
            <input
              id="editar-peso"
              type="number"
              min="0"
              max="150"
              step="0.1"
              className={`${styles.editarPetInput} ${styles.inputComUnidade}`}
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              placeholder="Ex: 8,5"
            />
            <span className={styles.pesoUnidade} aria-hidden="true">
              kg
            </span>
          </div>
        </div>

        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel} htmlFor="editar-nasc">
            Data de nascimento
          </label>
          <input
            id="editar-nasc"
            type="text"
            placeholder="dd/mm/aaaa"
            className={styles.editarPetInput}
            value={nascimento}
            maxLength={10}
            onChange={handleDataChange}
            inputMode="numeric"
          />
          {erroData && (
            <span className={styles.erroData} role="alert">
              {erroData}
            </span>
          )}
          {idadeCalculada && !erroData && (
            <span className={styles.editarPetIdade} aria-live="polite">
              {idadeCalculada}
            </span>
          )}
        </div>

        <div className={styles.editarPetCampo}>
          <label className={styles.editarPetLabel}>
            Coleira
            <span className={styles.coleiraInfoWrap}>
              <span className={styles.coleiraInfoIcone} aria-hidden="true">
                ℹ
              </span>
              <span className={styles.coleiraTooltip} role="tooltip">
                Para alterar a coleira entre em contato com o suporte da DunDum
              </span>
            </span>
          </label>
          <input
            className={`${styles.editarPetInput} ${styles.editarPetInputBloqueado}`}
            defaultValue={pet.coleira ?? "—"}
            disabled
            aria-disabled="true"
          />
        </div>

        {erroGeral && (
          <p
            className={styles.erroData}
            role="alert"
            style={{ textAlign: "center" }}
          >
            {erroGeral}
          </p>
        )}

        <button
          className={styles.btnSalvar}
          onClick={handleSalvar}
          disabled={salvando}
          type="button"
          aria-busy={salvando}
        >
          {salvando ? "Salvando..." : "Salvar"}
        </button>
        <button className={styles.btnCancelar} onClick={onVoltar} type="button">
          Cancelar
        </button>
        <button
          className={styles.btnRemoverPet}
          onClick={() => setConfirmarRemocao(true)}
          type="button"
        >
          Remover pet
        </button>
      </div>
    </Modal>
  );
}
