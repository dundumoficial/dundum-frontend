import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";
import styles from "../Dashboard.module.css";

// Tooltip escuro compartilhado
const tooltipStyle = {
  contentStyle: {
    background: "#1b1f3b",
    border: "none",
    borderRadius: 8,
    fontSize: 12,
    padding: "6px 10px",
  },
  labelStyle: { color: "#fff", marginBottom: 2 },
  cursor: { stroke: "rgba(255,255,255,0.08)", strokeWidth: 1 },
};

// Gráfico de linha com área de referência
export function GraficoBatimentos({ data }) {
  return (
    <ResponsiveContainer width="100%" height={90}>
      <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(27, 31, 59, 0.50)"
          vertical={false}
        />
        <XAxis
          dataKey="hora"
          tick={{ fontSize: 9, fill: "#1b1f3b" }}
          axisLine={false}
          tickLine={false}
          interval={2}
        />
        <YAxis
          domain={["dataMin", "dataMax"]}
          tick={{ fontSize: 9, fill: "#1b1f3b" }}
          axisLine={false}
          tickLine={false}
          width={28}
        />
        <Tooltip {...tooltipStyle} formatter={(v) => [`${v} bpm`]} />
        <Line
          type="monotone"
          dataKey="valor"
          stroke="#454ade"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: "#454ade" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

// Gráfico de linha para respiração
export function GraficoRespiracao({ data }) {
  return (
    <ResponsiveContainer width="100%" height={90}>
      <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(27, 31, 59, 0.50)"
          vertical={false}
        />
        <XAxis
          dataKey="hora"
          tick={{ fontSize: 9, fill: "#1b1f3b" }}
          axisLine={false}
          tickLine={false}
          interval={2}
        />
        <YAxis
          domain={["dataMin", "dataMax"]}
          tick={{ fontSize: 9, fill: "#1b1f3b" }}
          axisLine={false}
          tickLine={false}
          width={28}
        />
        <Tooltip {...tooltipStyle} formatter={(v) => [`${v} rpm`]} />
        <Line
          type="monotone"
          dataKey="valor"
          stroke="#454ade"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: "#454ade" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

// Gráfico de barras para passos com linha de meta
export function GraficoPassos({ data }) {
  return (
    <ResponsiveContainer width="100%" height={90}>
      <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(27, 31, 59, 0.50)"
          vertical={false}
        />
        <XAxis
          dataKey="dia"
          tick={{ fontSize: 9, fill: "#1b1f3b" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 9, fill: "#1b1f3b" }}
          axisLine={false}
          tickLine={false}
          width={32}
          tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
        />
        <Tooltip
          {...tooltipStyle}
          formatter={(v, name) => [
            name === "meta" ? `${v.toLocaleString()} meta` : v.toLocaleString(),
          ]}
        />
        <Bar dataKey="valor" radius={[4, 4, 0, 0]} maxBarSize={24}>
          {data?.map((i) => (
            <Cell key={i} fill="#454ade" />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// Gráfico de sono empilhado com legenda
const SONO_CORES = {
  profundo: "#1b1f3b",
  leve: "#454ade",
  rem: "#c874d9",
  acordado: "#f0abfc",
};

const SONO_LABELS = {
  profundo: "Profundo",
  leve: "Leve",
  rem: "REM",
  acordado: "Acordado",
};

function LegendaSono() {
  return (
    <div className={styles.sonoLegenda}>
      {Object.entries(SONO_CORES).map(([key, cor]) => (
        <span key={key}>
          <em style={{ background: cor }} />
          {SONO_LABELS[key]}
        </span>
      ))}
    </div>
  );
}

export function GraficoSono({ data }) {
  return (
    <>
      <ResponsiveContainer width="100%" height={64}>
        <BarChart data={data} margin={{ top: 0, right: 4, bottom: 0, left: 0 }}>
          <XAxis
            dataKey="hora"
            tick={{ fontSize: 9, fill: "#1b1f3b" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            {...tooltipStyle}
            formatter={(v, name) => [`${v} min`, SONO_LABELS[name] ?? name]}
          />
          {Object.entries(SONO_CORES).map(([key, cor]) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="sono"
              fill={cor}
              radius={key === "acordado" ? [2, 2, 0, 0] : 0}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
      <LegendaSono />
    </>
  );
}
