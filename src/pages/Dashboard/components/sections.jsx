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

import iconeCadeado from "../../../assets/img/dashboard/icon-cadeado.svg";

function BloqueadoPorPlano({ recurso }) {
  return (
    <Card>
      <div
        style={{
          textAlign: "center",
          padding: "24px 16px",
          color: "var(--text-secondary)",
        }}
      >
        <img
          src={iconeCadeado}
          alt="Ícone de cadeado"
          style={{ filter: "var(--cadeado-filter)" }}
        />
        <p
          style={{
            fontWeight: 600,
            marginBottom: 4,
            color: "var(--bloqueado-titulo)",
          }}
        >
          Recurso indisponível
        </p>
        <p style={{ fontSize: 13, color: "var(--bloqueado-texto)" }}>
          {recurso} não está incluído no seu plano atual.
        </p>
      </div>
    </Card>
  );
}

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

// SAÚDE
export function SecaoSaude({
  batimentos,
  respiracao,
  passos,
  sono,
  permissoes,
}) {
  return (
    <>
      <div className={styles.gridDois}>
        <Card>
          <CardHeader
            titulo="Batimentos cardíacos"
            direita={<Badge texto="Normal" cor="normal" />}
          />
          <CardValor valor={batimentos?.at(-1)?.valor ?? 0} unidade="bpm" />
          <GraficoBatimentos data={batimentos} />
        </Card>

        {permissoes.rpm ? (
          <Card>
            <CardHeader titulo="Respiração" />
            <CardValor valor={respiracao?.at(-1)?.valor ?? 0} unidade="rpm" />
            <GraficoRespiracao data={respiracao} />
          </Card>
        ) : (
          <BloqueadoPorPlano recurso="Respiração" />
        )}
      </div>

      <div className={styles.gridDois}>
        {permissoes.passos ? (
          <Card>
            <CardHeader titulo="Passos" />
            <CardValor valor={passos ?? 0} sufixo="hoje" />
          </Card>
        ) : (
          <BloqueadoPorPlano recurso="Passos" />
        )}

        {permissoes.sono ? (
          <Card>
            <CardHeader titulo="Sono" />
            <CardValor valor={sono ? `${sono}h` : "0h"} />
            <GraficoSono data={[]} />
          </Card>
        ) : (
          <BloqueadoPorPlano recurso="Sono" />
        )}
      </div>
    </>
  );
}

// LOCALIZAÇÃO
export function SecaoLocalizacao({ petPos, petNome }) {
  return (
    <Card className={styles.cardMapa}>
      <CardHeader titulo="Localização" />
      <Mapa pos={petPos} petNome={petNome} altura={300} scrollWheel />
    </Card>
  );
}

// RELATÓRIOS
export function SecaoRelatorios({
  // relatorio,
  notificacoes,
  onCompartilhar,
  permissoes,
}) {
  const naoLidas = notificacoes?.filter((n) => !n.lido).length ?? 0;

  return (
    <div className={styles.gridTres}>
      {permissoes.relatorios ? (
        <Card>
          <CardHeader
            titulo="Relatório semanal"
            direita={
              <span className={styles.cardPeriodo}>
                {/* {relatorio.periodo} */}
              </span>
            }
          />
          <ul className={styles.relatorioLista}>
            <li>
              <span
                className={styles.relDot}
                style={{ background: "#ef4444" }}
              />
              Média batimentos
              <strong>{/* {relatorio.mediaBatimentos} */}</strong>
            </li>
            <li>
              <span
                className={styles.relDot}
                style={{ background: "#454ade" }}
              />
              Média passos<strong>{/* {relatorio.mediaPassos} */}</strong>
            </li>
            <li>
              <span
                className={styles.relDot}
                style={{ background: "#06b6d4" }}
              />
              Média respiração
              <strong>{/* {relatorio.mediaRespiracao} */}</strong>
            </li>
            <li>
              <span
                className={styles.relDot}
                style={{ background: "#1b1f3b" }}
              />
              Padrão de sono<strong>{/* {relatorio.padraoDeSono} */}</strong>
            </li>
          </ul>
          <button className={styles.btnCompartilhar} onClick={onCompartilhar}>
            Compartilhar <span>›</span>
          </button>
        </Card>
      ) : (
        <BloqueadoPorPlano recurso="Relatórios semanais" />
      )}
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
          {notificacoes?.map((n) => (
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
