import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Badge, Card, CardHeader, CardValor } from "./ui.jsx";
import {
  GraficoBatimentos,
  GraficoRespiracao,
  GraficoPassos,
  GraficoSono,
} from "./charts.jsx";
import styles from "../Dashboard.module.css";

import dogAtivo from "../../../assets/img/dashboard/dog-ativo.svg";
import dogCansado from "../../../assets/img/dashboard/dog-cansado.svg";
import dogEstressado from "../../../assets/img/dashboard/dog-estressado.svg";
import dogRelaxado from "../../../assets/img/dashboard/dog-relaxado.svg";

const EMOCOES = [
  { label: "Ativo", emoji: dogAtivo },
  { label: "Cansado", emoji: dogCansado },
  { label: "Estressado", emoji: dogEstressado },
  { label: "Relaxado", emoji: dogRelaxado },
];

// Mapa
function Mapa({ pos, petNome, altura = 180, zoom = 15, scrollWheel = true }) {
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

  return (
    <div className={styles.mapaContainer} style={{ height: altura }}>
      <MapContainer
        center={pos}
        zoom={zoom}
        scrollWheelZoom={scrollWheel}
        className={styles.mapaLeaflet}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        <Marker position={pos} icon={iconeCustom()}>
          <Popup>{petNome} está aqui</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

// SEÇÃO: SAÚDE
export function SecaoSaude({ batimentos, respiracao, passos, sono }) {
  return (
    <>
      <div className={styles.gridDois}>
        <Card>
          <CardHeader
            titulo="Batimentos cardíacos"
            direita={<Badge texto="Normal" cor="normal" />}
          />
          <CardValor valor="92" unidade="bpm" />
          <p className={styles.cardSub}>
            Min: 60 bpm · Máx: 108 bpm · Média: 84 bpm
          </p>
          <GraficoBatimentos data={batimentos} />
        </Card>

        <Card>
          <CardHeader
            titulo="Respiração"
            direita={<Badge texto="Acima do normal" cor="alerta" />}
          />
          <CardValor valor="28" unidade="rpm" />
          <p className={styles.cardSub}>
            Min: 18 rpm · Máx: 30 rpm · Média: 24 rpm
          </p>
          <GraficoRespiracao data={respiracao} />
        </Card>
      </div>

      <div className={styles.gridDois}>
        <Card>
          <CardHeader titulo="Passos" />
          <CardValor valor="6.842" sufixo="hoje" />
          <GraficoPassos data={passos} />
        </Card>

        <Card>
          <CardHeader titulo="Sono" />
          <CardValor valor="9h 20min" />
          <p className={styles.cardSub}>Qualidade: ★★★★☆</p>
          <GraficoSono data={sono} />
        </Card>
      </div>
    </>
  );
}

// SEÇÃO: LOCALIZAÇÃO
export function SecaoLocalizacao({ petPos, petNome }) {
  return (
    <Card className={styles.cardMapa}>
      <CardHeader titulo="Localização" />
      <Mapa pos={petPos} petNome={petNome} altura={300} scrollWheel />
    </Card>
  );
}

// SEÇÃO: RELATÓRIOS
export function SecaoRelatorios({ relatorio, estadoEmocional, notificacoes }) {
  const itensRelatorio = [
    {
      cor: "#ef4444",
      label: "Média batimentos",
      valor: relatorio.mediaBatimentos,
    },
    { cor: "#454ade", label: "Média passos", valor: relatorio.mediaPassos },
    {
      cor: "#06b6d4",
      label: "Média respiração",
      valor: relatorio.mediaRespiracao,
    },
    { cor: "#1b1f3b", label: "Padrão de sono", valor: relatorio.padraoDeSono },
  ];

  const naoLidas = notificacoes.filter((n) => !n.lido).length;

  return (
    <div className={styles.gridTres}>
      {/* Relatório */}
      <Card>
        <CardHeader
          titulo="Relatório semanal"
          direita={
            <span className={styles.cardPeriodo}>{relatorio.periodo}</span>
          }
        />
        <ul className={styles.relatorioLista}>
          {itensRelatorio.map((item) => (
            <li key={item.label}>
              <span
                className={styles.relDot}
                style={{ background: item.cor }}
              />
              {item.label}
              <strong>{item.valor}</strong>
            </li>
          ))}
        </ul>
        <button className={styles.btnCompartilhar}>
          Compartilhar <span>›</span>
        </button>
      </Card>

      {/* Estado emocional */}
      <Card>
        <CardHeader titulo="Estado emocional" />
        <div className={styles.emocoesGrid}>
          {EMOCOES.map((op) => (
            <button
              key={op.label}
              className={`${styles.emocaoBtn} ${estadoEmocional.atual === op.label ? styles.emocaoAtiva : ""}`}
            >
              <img src={op.emoji} alt={op.label} className={styles.emocaoImg} />
              {op.label}
            </button>
          ))}
        </div>
        <p className={styles.emocaoAnalise}>
          <em>{estadoEmocional.analise}</em>
        </p>
      </Card>

      {/* Notificações */}
      <Card>
        <CardHeader
          titulo="Notificações"
          direita={
            naoLidas > 0 && (
              <span className={`${styles.badge} ${styles.badgeNotificacao}`}>
                {naoLidas}
              </span>
            )
          }
        />
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
