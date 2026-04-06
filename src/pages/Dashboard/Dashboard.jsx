import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from "./Dashboard.module.css";
import logoBranco from "../../assets/img/logo-branco.webp";
import logoAzul from "../../assets/img/logo-azul.webp";
import petFoto from "../../assets/img/home/img1.webp";
import iconeConfiguracao from "../../assets/img/dashboard/icon-configuracao.svg";
import iconeCoracao from "../../assets/img/dashboard/icon-coracao.svg";
import iconeDashboard from "../../assets/img/dashboard/icon-dashboard.svg";
import iconeLocalizacao from "../../assets/img/dashboard/icon-localizacao.svg";
import iconeNotificacao from "../../assets/img/dashboard/icon-notificacao.svg";
import iconePlano from "../../assets/img/dashboard/icon-plano.svg";
import iconeRelatorio from "../../assets/img/dashboard/icon-relatorio.svg";
import dogAtivo from "../../assets/img/dashboard/dog-ativo.svg";
import dogCansado from "../../assets/img/dashboard/dog-cansado.svg";
import dogEstressado from "../../assets/img/dashboard/dog-estressado.svg";
import dogRelaxado from "../../assets/img/dashboard/dog-relaxado.svg";
import iconeMenu from "../../assets/img/menu.svg";
import iconeClose from "../../assets/img/close.svg";

// ── INLINE SVG ICONS ──────────────────────────────
const I = {
  menu: iconeMenu,
  bell: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  dog: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
      <path d="M18 4c-1 0-2 .5-2.5 1.5L14 9l-2 1H6a1 1 0 0 0-.8.4L3 14l4.5 2.5a1 1 0 0 0 .5.1h2l2 .8v3.2l1.2 2.4h3.6a1 1 0 0 0 1-.5l2-3.5-1.5-2L16 14v-2l4-3.5.5-2L18 4z" />
    </svg>
  ),
  male: (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="10" cy="14" r="5" />
      <path d="M14 5l5-5M14 5h5v5" />
    </svg>
  ),
  refresh: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 4v6h6" />
      <path d="M23 20v-6h-6" />
      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />
    </svg>
  ),
  logout: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  alerts: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  gps: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  battery: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="6" width="18" height="12" rx="2" ry="2" />
      <line x1="23" y1="13" x2="23" y2="11" />
    </svg>
  ),
  share: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y1="10.49" />
    </svg>
  ),
  chevron: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  close: iconeClose,
};

// fix leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// ── DADOS MANUAIS (substituir por API) ──────────────────────
const usuario = { nome: "Rafael", iniciais: "R" };

const pet = {
  nome: "Rex",
  raca: "Golden Retriever",
  idade: "3 anos",
  sexo: "Macho",
  coleira: "#PET-4821",
  foto: petFoto,
  ativo: true,
};

const batimentosData = [
  { h: "0", v: 72 },
  { h: "2", v: 68 },
  { h: "4", v: 65 },
  { h: "6", v: 70 },
  { h: "8", v: 85 },
  { h: "10", v: 92 },
  { h: "12", v: 88 },
  { h: "14", v: 95 },
  { h: "16", v: 90 },
  { h: "18", v: 87 },
  { h: "20", v: 82 },
  { h: "22", v: 75 },
];

const respiracaoData = [
  { h: "0", v: 22 },
  { h: "2", v: 20 },
  { h: "4", v: 18 },
  { h: "6", v: 21 },
  { h: "8", v: 26 },
  { h: "10", v: 28 },
  { h: "12", v: 27 },
  { h: "14", v: 30 },
  { h: "16", v: 29 },
  { h: "18", v: 27 },
  { h: "20", v: 25 },
  { h: "22", v: 23 },
];

const passosData = [
  { d: "Seg", v: 4200 },
  { d: "Ter", v: 5800 },
  { d: "Qua", v: 3900 },
  { d: "Qui", v: 6200 },
  { d: "Sex", v: 7100 },
  { d: "Sáb", v: 5400 },
  { d: "Dom", v: 6842 },
];

const sonoData = [
  { h: "22h", profundo: 0, leve: 20, rem: 0, acordado: 0 },
  { h: "23h", profundo: 40, leve: 10, rem: 5, acordado: 5 },
  { h: "0h", profundo: 50, leve: 5, rem: 0, acordado: 5 },
  { h: "1h", profundo: 30, leve: 20, rem: 10, acordado: 0 },
  { h: "2h", profundo: 10, leve: 30, rem: 20, acordado: 0 },
  { h: "3h", profundo: 5, leve: 10, rem: 40, acordado: 5 },
  { h: "4h", profundo: 20, leve: 15, rem: 20, acordado: 5 },
  { h: "5h", profundo: 0, leve: 5, rem: 5, acordado: 50 },
];

const relatorio = {
  periodo: "8-14 Mar",
  mediaBatimentos: "89 bpm",
  mediaPassos: "5.940",
  mediaRespiracao: "22 rpm",
  mediaAtividade: "74%",
  padraoDeSono: "8h 45min",
};

const notificacoes = [
  {
    id: 1,
    texto: "Batimentos acima do normal detectados às 14h32",
    quando: "hoje",
    lido: false,
  },
  {
    id: 2,
    texto: "Respiração acima do normal (28 rpm) às 14h20",
    quando: "hoje",
    lido: false,
  },
  { id: 3, texto: "Bateria da coleira em 78%", quando: "ontem", lido: true },
  {
    id: 4,
    texto: "Pouca atividade detectada entre 10h–12h",
    quando: "ontem",
    lido: true,
  },
  { id: 5, texto: "Relatório semanal disponível", quando: "seg", lido: true },
];

const estadoEmocional = {
  atual: "Ativo",
  opcoes: [
    { label: "Relaxado", icon: dogRelaxado },
    { label: "Ativo", icon: dogAtivo },
    { label: "Estressado", icon: dogEstressado },
    { label: "Cansado", icon: dogCansado },
  ],
  analise:
    "Rex está mais ativo que o normal hoje, passos e batimentos acima da média semanal. Isso pode indicar um passeio estimulante ou brincadeira intensa. Fique atento à hidratação!",
};

const petPos = [-23.5489, -46.6388]; // São Paulo (substituir por GPS real)

// COMPONENTES AUXILIARES
function Badge({ texto, cor }) {
  const cores = {
    normal: styles.badgeNormal,
    alerta: styles.badgeAlerta,
    alto: styles.badgeAlto,
    bom: styles.badgeBom,
    vivo: styles.badgeVivo,
  };
  return <span className={`${styles.badge} ${cores[cor] || ""}`}>{texto}</span>;
}

function Card({ children, className = "" }) {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
}

// ── MODAL PERFIL USUARIO ─────────────────────────────────────
function ModalPerfil({ onClose }) {
  const navigate = useNavigate();
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div ref={ref} className={styles.modalPerfil}>
      <div className={styles.modalPerfilHeader}>
        <div className={styles.avatarGrande}>{usuario.iniciais}</div>
        <div>
          <p className={styles.modalPerfilNome}>{usuario.nome}</p>
          <p className={styles.modalPerfilEmail}>rafael@email.com</p>
        </div>
      </div>
      <hr className={styles.modalDivider} />
      <button
        className={styles.modalPerfilBtn}
        onClick={() => {
          onClose();
          navigate("/");
        }}
      >
        {I.refresh} Trocar de conta
      </button>
      <button
        className={`${styles.modalPerfilBtn} ${styles.modalPerfilBtnSair}`}
        onClick={() => {
          onClose();
          navigate("/login");
        }}
      >
        {I.logout} Sair
      </button>
    </div>
  );
}

// ── MODAL GENÉRICO ───────────────────────────────────────────
function Modal({ titulo, children, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitulo}>{titulo}</h2>
          <button
            className={styles.modalClose}
            onClick={onClose}
            aria-label="Fechar"
          >
            <img src={iconeClose} alt="Ícone para fechar" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── SEÇÕES DO CONTEÚDO ───────────────────────────────────────
function SecaoSaude() {
  return (
    <>
      <div className={styles.gridDois}>
        <Card>
          <div className={styles.cardHeader}>
            <h3>Batimentos cardíacos</h3>
            <Badge texto="Normal" cor="normal" />
          </div>
          <div className={styles.cardValor}>
            92 <span>bpm</span>
          </div>
          <p className={styles.cardSub}>Média hoje: 88 bpm · Máx: 112 bpm</p>
          <ResponsiveContainer width="100%" height={80}>
            <LineChart data={batimentosData}>
              <Line
                type="monotone"
                dataKey="v"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
              />
              <XAxis dataKey="h" hide />
              <Tooltip
                contentStyle={{
                  background: "#1b1f3b",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#ef4444" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <div className={styles.cardHeader}>
            <h3>Respiração</h3>
            <Badge texto="Acima do normal" cor="alerta" />
          </div>
          <div className={styles.cardValor}>
            28 <span>rpm</span>
          </div>
          <p className={styles.cardSub}>Média hoje: 24 rpm · Máx: 34 rpm</p>
          <ResponsiveContainer width="100%" height={80}>
            <LineChart data={respiracaoData}>
              <Line
                type="monotone"
                dataKey="v"
                stroke="#06b6d4"
                strokeWidth={2}
                dot={false}
              />
              <XAxis dataKey="h" hide />
              <Tooltip
                contentStyle={{
                  background: "#1b1f3b",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#06b6d4" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className={styles.gridTres}>
        <Card>
          <div className={styles.cardHeader}>
            <h3>Quantidade de passos</h3>
            <Badge texto="Alto" cor="alto" />
          </div>
          <div className={styles.cardValor}>
            6.842 <span className={styles.cardHoje}>hoje</span>
          </div>
          <ResponsiveContainer width="100%" height={80}>
            <BarChart data={passosData}>
              <Bar dataKey="v" fill="#454ade" radius={[4, 4, 0, 0]} />
              <XAxis
                dataKey="d"
                tick={{ fontSize: 10, fill: "#888" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "#1b1f3b",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#454ade" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <div className={styles.cardHeader}>
            <h3>Tempo de sono</h3>
            <Badge texto="Boa qualidade" cor="bom" />
          </div>
          <div className={styles.cardValor}>9h 20min</div>
          <p className={styles.cardSub}>Qualidade: ★★★★☆</p>
          <ResponsiveContainer width="100%" height={60}>
            <BarChart data={sonoData}>
              <Bar dataKey="profundo" stackId="a" fill="#1b1f3b" radius={0} />
              <Bar dataKey="leve" stackId="a" fill="#454ade" radius={0} />
              <Bar dataKey="rem" stackId="a" fill="#c874d9" radius={0} />
              <Bar dataKey="acordado" stackId="a" fill="#f0abfc" radius={0} />
              <XAxis
                dataKey="h"
                tick={{ fontSize: 9, fill: "#888" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "#1b1f3b",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 11,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className={styles.sonoLegenda}>
            <span>
              <em style={{ background: "#1b1f3b" }} /> Profundo
            </span>
            <span>
              <em style={{ background: "#454ade" }} /> Leve
            </span>
            <span>
              <em style={{ background: "#c874d9" }} /> REM
            </span>
            <span>
              <em style={{ background: "#f0abfc" }} /> Acordado
            </span>
          </div>
        </Card>

        <Card className={styles.cardMapa}>
          <div className={styles.cardHeader}>
            <h3>Localização</h3>
            <Badge texto="Ao vivo" cor="vivo" />
          </div>
          <div className={styles.mapaWrap}>
            <MapContainer
              center={petPos}
              zoom={15}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%", borderRadius: 8 }}
              zoomControl={false}
              attributionControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />
              <Marker position={petPos}>
                <Popup>{pet.nome} está aqui</Popup>
              </Marker>
            </MapContainer>
          </div>
        </Card>
      </div>
    </>
  );
}

function SecaoLocalizacao() {
  return (
    <Card className={styles.cardMapaFull}>
      <div className={styles.cardHeader}>
        <h3>Localização em tempo real</h3>
        <Badge texto="Ao vivo" cor="vivo" />
      </div>
      <div className={styles.mapaWrapFull}>
        <MapContainer
          center={petPos}
          zoom={15}
          scrollWheelZoom
          style={{ height: "100%", width: "100%", borderRadius: 8 }}
          attributionControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          <Marker position={petPos}>
            <Popup>{pet.nome} está aqui</Popup>
          </Marker>
        </MapContainer>
      </div>
    </Card>
  );
}

function SecaoRelatorios() {
  return (
    <div className={styles.gridTres}>
      <Card>
        <div className={styles.cardHeader}>
          <h3>Relatório semanal</h3>
          <span className={styles.cardPeriodo}>{relatorio.periodo}</span>
        </div>
        <ul className={styles.relatorioLista}>
          <li>
            <span className={styles.relDot} style={{ background: "#ef4444" }} />
            Média batimentos<strong>{relatorio.mediaBatimentos}</strong>
          </li>
          <li>
            <span className={styles.relDot} style={{ background: "#454ade" }} />
            Média passos<strong>{relatorio.mediaPassos}</strong>
          </li>
          <li>
            <span className={styles.relDot} style={{ background: "#06b6d4" }} />
            Média respiração<strong>{relatorio.mediaRespiracao}</strong>
          </li>
          <li>
            <span className={styles.relDot} style={{ background: "#c874d9" }} />
            Média atividade<strong>{relatorio.mediaAtividade}</strong>
          </li>
          <li>
            <span className={styles.relDot} style={{ background: "#1b1f3b" }} />
            Padrão de sono<strong>{relatorio.padraoDeSono}</strong>
          </li>
        </ul>
        <button className={styles.btnCompartilhar}>
          Compartilhar <span>›</span>
        </button>
      </Card>

      <Card>
        <div className={styles.cardHeader}>
          <h3>Estado emocional</h3>
        </div>
        <div className={styles.emocoesGrid}>
          {estadoEmocional.opcoes.map((op) => (
            <button
              key={op.label}
              className={`${styles.emocaoBtn} ${estadoEmocional.atual === op.label ? styles.emocaoAtiva : ""}`}
            >
              <img src={op.icon} alt="Ícone de cachorro com o estado emocional" />
              {op.label}
            </button>
          ))}
        </div>
        <p className={styles.emocaoAnalise}>
          <em>{estadoEmocional.analise}</em>
        </p>
      </Card>

      <Card>
        <div className={styles.cardHeader}>
          <h3>Notificações</h3>
          <span
            className={styles.badge}
            style={{ background: "#b14aed", color: "#fff" }}
          >
            {notificacoes.filter((n) => !n.lido).length}
          </span>
        </div>
        <ul className={styles.notifLista}>
          {notificacoes.map((n) => (
            <li
              key={n.id}
              className={`${styles.notifItem} ${!n.lido ? styles.notifNaoLida : ""}`}
            >
              <p>{n.texto}</p>
              <span>{n.quando}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

// ── COMPONENTE PRINCIPAL ─────────────────────────────────────
export default function Dashboard() {
  const [secao, setSecao] = useState("dashboard");
    const [menuAberto, setMenuAberto] = useState(true); // desktop starts open
  const [modalAberto, setModalAberto] = useState(null);
  const [perfilAberto, setPerfilAberto] = useState(false);
  const perfilRef = useRef(null);

  const hoje = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const navItems = [
    { id: "dashboard", label: "Dashboard", icone: <img src={iconeDashboard} alt="" className={styles.navIcone} /> },
    { id: "saude", label: "Saúde", icone: <img src={iconeCoracao} alt="" className={styles.navIcone} /> },
    { id: "localizacao", label: "Localização", icone: <img src={iconeLocalizacao} alt="" className={styles.navIcone} /> },
    { id: "relatorios", label: "Relatórios", icone: <img src={iconeRelatorio} alt="" className={styles.navIcone} /> },
  ];

  const renderConteudo = () => {
    if (secao === "saude") return <SecaoSaude />;
    if (secao === "localizacao") return <SecaoLocalizacao />;
    if (secao === "relatorios") return <SecaoRelatorios />;
    return (
      <>
        <SecaoSaude />
        <SecaoRelatorios />
      </>
    );
  };

  return (
    <div className={styles.layout}>
      {/* ── SIDEBAR ── */}
      <aside
        className={`${styles.aside} ${menuAberto ? styles.asideAberto : ""}`}
      >
        <div className={styles.asideLogo}>
          <img src={logoBranco} alt="DunDum" className={styles.logoImg} />
          <button
            className={styles.asideClose}
            onClick={() => setMenuAberto(false)}
            aria-label="Recolher menu"
          >
            <img src={iconeClose} alt="Recolher menu" />
          </button>
        </div>

        {/* visible only when collapsed (desktop) */}
        <button
          className={styles.asideOpen}
          onClick={() => setMenuAberto(true)}
          aria-label="Abrir menu"
        >
          <img src={iconeMenu} alt="Abrir menu" />
        </button>

        <button
          className={styles.petCard}
          onClick={() => setModalAberto("pet")}
        >
          <img src={pet.foto} alt={pet.nome} className={styles.petCardFoto} />
          <div>
            <p className={styles.petCardNome}>{pet.nome}</p>
            <p className={styles.petCardRaca}>{pet.raca}</p>
          </div>
          <span className={styles.petCardArrow}>{I.chevron}</span>
        </button>
          <p className={styles.navLabel}>PRINCIPAL</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`${styles.navItem} ${secao === item.id ? styles.navItemAtivo : ""}`}
              onClick={() => {
                setSecao(item.id);
                setMenuAberto(false);
              }}
            >
              {item.icone}
              <span className={styles.navLabelItem}>{item.label}</span>
            </button>
          ))}

          <p className={styles.navLabel}>SISTEMA</p>
          <button
            className={styles.navItem}
            onClick={() => setModalAberto("notificacoes")}
          >
            <img src={iconeNotificacao} alt="" className={styles.navIcone} />
            <span className={styles.navLabelItem}>Notificações</span>
            <span className={styles.navBadge}>
              {notificacoes.filter((n) => !n.lido).length}
            </span>
          </button>
          <button
            className={styles.navItem}
            onClick={() => setModalAberto("configuracoes")}
          >
            <img src={iconeConfiguracao} alt="" className={styles.navIcone} />
            <span className={styles.navLabelItem}>Configurações</span>
          </button>

        <div className={styles.bateria}>
          <div className={styles.bateriaHeader}>
            <span>Bateria da coleira</span>
            <span className={styles.bateriaPct}>78%</span>
          </div>
          <div className={styles.bateriaBar}>
            <div className={styles.bateriaFill} style={{ width: "78%" }} />
          </div>
        </div>

        <button
          className={styles.planoCard}
          onClick={() => setModalAberto("plano")}
        >
          <img src={iconePlano} alt="" className={styles.planoIcone} />
          <div>
            <p className={styles.planoNome}>Plano</p>
            <p className={styles.planoTipo}>Intermediário</p>
          </div>
          <span className={styles.petCardArrow}>{I.chevron}</span>
        </button>
      </aside>

      {/* overlay mobile */}
      {menuAberto && (
        <div
          className={styles.overlayMobile}
          onClick={() => setMenuAberto(false)}
        />
      )}

      {/* ── CONTEÚDO PRINCIPAL ── */}
      <div className={styles.conteudo}>
        {/* topbar */}
        <header className={styles.topbar}>
          <div className={styles.topbarEsquerda}>
            <button
              className={styles.hamburger}
              onClick={() => setMenuAberto(true)}
            >
              <img src={iconeMenu} alt="Menu" />
            </button>
            <div className={styles.topbarLogo}>
              <img src={logoAzul} alt="DunDum" className={styles.logoImgMobile} />
            </div>
          </div>
          <div className={styles.topbarDireita}>
            <button
              className={styles.notifIcone}
              onClick={() => setModalAberto("notificacoes")}
            >
              {I.bell}
              {notificacoes.filter((n) => !n.lido).length > 0 && (
                <span className={styles.notifDot} />
              )}
            </button>
            <div className={styles.avatarWrap} ref={perfilRef}>
              <button
                className={styles.avatar}
                onClick={() => setPerfilAberto((v) => !v)}
                aria-label="Perfil do usuário"
              >
                {usuario.iniciais}
              </button>
              {perfilAberto && (
                <ModalPerfil onClose={() => setPerfilAberto(false)} />
              )}
            </div>
          </div>
        </header>

        {/* greeting */}
        <div className={styles.greeting}>
          <div>
            <h1 className={styles.greetingNome}>Olá, {usuario.nome}</h1>
            <p className={styles.greetingData}>
              {hoje.charAt(0).toUpperCase() + hoje.slice(1)} · Última
              atualização: agora
            </p>
          </div>
          {/* desktop profile — hidden on mobile */}
          <div className={styles.greetingDireita}>
            <button
              className={styles.notifIcone}
              onClick={() => setModalAberto("notificacoes")}
            >
              {I.bell}
              {notificacoes.filter((n) => !n.lido).length > 0 && (
                <span className={styles.notifDot} />
              )}
            </button>
            <div className={styles.avatarWrap} ref={perfilRef}>
              <button
                className={styles.avatar}
                onClick={() => setPerfilAberto((v) => !v)}
                aria-label="Perfil do usuário"
              >
                {usuario.iniciais}
              </button>
              {perfilAberto && (
                <ModalPerfil onClose={() => setPerfilAberto(false)} />
              )}
            </div>
          </div>
        </div>

        {/* card do pet */}
        <div className={styles.petBanner}>
          <img src={pet.foto} alt={pet.nome} className={styles.petBannerFoto} />
          <div className={styles.petBannerInfo}>
            <h2 className={styles.petBannerNome}>{pet.nome}</h2>
            <div className={styles.petBannerTags}>
              <span>{pet.idade}</span>
              <span>{pet.raca}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>{I.male} {pet.sexo}</span>
              <span>Coleira {pet.coleira}</span>
            </div>
          </div>
          <span
            className={`${styles.petBannerStatus} ${pet.ativo ? styles.statusAtivo : ""}`}
          >
            <span style={{ fontSize: '10px' }}>{pet.ativo ? '● ' : '○ '}{pet.ativo ? 'Ativo' : 'Inativo'}</span>
          </span>
        </div>

        {/* seções */}
        <div className={styles.secoes}>{renderConteudo()}</div>

        <footer className={styles.footer}>
          Copyright © 2026 DunDum – Todos os direitos reservados
        </footer>
      </div>

      {/* ── MODAIS ── */}
      {modalAberto === "notificacoes" && (
        <Modal titulo="Notificações" onClose={() => setModalAberto(null)}>
          <ul className={styles.notifListaModal}>
            {notificacoes.map((n) => (
              <li
                key={n.id}
                className={`${styles.notifItem} ${!n.lido ? styles.notifNaoLida : ""}`}
              >
                <p>{n.texto}</p>
                <span>{n.quando}</span>
              </li>
            ))}
          </ul>
        </Modal>
      )}

      {modalAberto === "configuracoes" && (
        <Modal titulo="Configurações" onClose={() => setModalAberto(null)}>
          <div className={styles.modalConteudo}>
            <p className={styles.modalItem} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{I.bell} Alertas de saúde</p>
            <p className={styles.modalItem} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{I.gps} Zona segura GPS</p>
            <p className={styles.modalItem} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{I.chart} Frequência de relatórios</p>
            <p className={styles.modalItem} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{I.battery} Alerta de bateria</p>
          </div>
        </Modal>
      )}

      {modalAberto === "plano" && (
        <Modal titulo="Seu Plano" onClose={() => setModalAberto(null)}>
          <div className={styles.modalConteudo}>
            <div className={styles.planoAtualCard}>
              <p className={styles.planoAtualLabel}>Plano atual</p>
              <h3 className={styles.planoAtualNome}>Intermediário</h3>
              <p className={styles.planoAtualPreco}>R$ 29,90/mês</p>
            </div>
            <button className={styles.btnUpgrade}>
              Ver planos disponíveis
            </button>
          </div>
        </Modal>
      )}

      {modalAberto === "pet" && (
        <Modal titulo="Perfil do Pet" onClose={() => setModalAberto(null)}>
          <div className={styles.modalPetConteudo}>
            <img
              src={pet.foto}
              alt={pet.nome}
              className={styles.modalPetFoto}
            />
            <h3 className={styles.modalPetNome}>{pet.nome}</h3>
            <div className={styles.modalPetInfo}>
              <div>
                <span>Raça</span>
                <strong>{pet.raca}</strong>
              </div>
              <div>
                <span>Idade</span>
                <strong>{pet.idade}</strong>
              </div>
              <div>
                <span>Sexo</span>
                <strong>{pet.sexo}</strong>
              </div>
              <div>
                <span>Coleira</span>
                <strong>{pet.coleira}</strong>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
