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
  return (
    <div
      style={{
        height: altura,
        borderRadius: 8,
        overflow: "hidden",
        border: "1px solid #e5e7eb",
      }}
    >
      <MapContainer
        center={pos}
        zoom={zoom}
        scrollWheelZoom={scrollWheel}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        <Marker position={pos}>
          <Popup>{petNome} está aqui</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

// SEÇÃO: SAÚDE
export function SecaoSaude({
  batimentos,
  respiracao,
  passos,
  sono,
  petPos,
  petNome,
}) {
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
            Média: 88 bpm · Máx: 112 bpm ·{" "}
            <span style={{ color: "#1b1f3b" }}>Faixa normal: 60-100</span>
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
            Média: 24 rpm · Máx: 34 rpm ·{" "}
            <span style={{ color: "#1b1f3b" }}>Faixa normal: 15-30</span>
          </p>
          <GraficoRespiracao data={respiracao} />
        </Card>
      </div>

      <div className={styles.gridTres}>
        <Card>
          <CardHeader
            titulo="Passos"
            direita={<Badge texto="Alto" cor="alto" />}
          />
          <CardValor valor="6.842" sufixo="hoje" />
          <p className={styles.cardSub}>
            Meta diária: 5.000 · barras{" "}
            <span style={{ color: "#a5b4fc" }}>azul claro</span> = abaixo da
            meta
          </p>
          <GraficoPassos data={passos} />
        </Card>

        <Card>
          <CardHeader
            titulo="Sono"
            direita={<Badge texto="Boa qualidade" cor="bom" />}
          />
          <CardValor valor="9h 20min" />
          <p className={styles.cardSub}>Qualidade: ★★★★☆</p>
          <GraficoSono data={sono} />
        </Card>

        <Card className={styles.cardMapa}>
          <CardHeader
            titulo="Localização"
            direita={<Badge texto="Ao vivo" cor="vivo" />}
          />
          <Mapa pos={petPos} petNome={petNome} altura={180} />
        </Card>
      </div>
    </>
  );
}

// SEÇÃO: LOCALIZAÇÃO
export function SecaoLocalizacao({ petPos, petNome }) {
  return (
    <Card>
      <CardHeader
        titulo="Localização em tempo real"
        direita={<Badge texto="Ao vivo" cor="vivo" />}
      />
      <Mapa pos={petPos} petNome={petNome} altura={480} scrollWheel zoom={15} />
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
    {
      cor: "#c874d9",
      label: "Média atividade",
      valor: relatorio.mediaAtividade,
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
              <span
                className={styles.badge}
                style={{ background: "#b14aed", color: "#fff" }}
              >
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
