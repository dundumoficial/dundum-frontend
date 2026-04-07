import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
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
  labelStyle: { color: "#aaa", marginBottom: 2 },
  cursor: { stroke: "rgba(255,255,255,0.08)", strokeWidth: 1 },
};

// Gráfico de linha com área de referência
export function GraficoBatimentos({ data }) {
  return (
    <ResponsiveContainer width="100%" height={90}>
      <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#f0f0f0"
          vertical={false}
        />
        <XAxis
          dataKey="hora"
          tick={{ fontSize: 9, fill: "#bbb" }}
          axisLine={false}
          tickLine={false}
          interval={2}
        />
        <YAxis
          domain={["dataMin - 5", "dataMax + 5"]}
          tick={{ fontSize: 9, fill: "#bbb" }}
          axisLine={false}
          tickLine={false}
          width={28}
        />
        <Tooltip
          {...tooltipStyle}
          formatter={(v) => [`${v} bpm`, "Batimentos"]}
        />
        {/* faixa normal: 60–100 bpm */}
        <ReferenceLine
          y={100}
          stroke="#fca5a5"
          strokeDasharray="4 2"
          label={{
            value: "máx",
            fontSize: 9,
            fill: "#fca5a5",
            position: "right",
          }}
        />
        <ReferenceLine
          y={60}
          stroke="#86efac"
          strokeDasharray="4 2"
          label={{
            value: "mín",
            fontSize: 9,
            fill: "#86efac",
            position: "right",
          }}
        />
        <Line
          type="monotone"
          dataKey="valor"
          stroke="#ef4444"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: "#ef4444" }}
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
          stroke="#f0f0f0"
          vertical={false}
        />
        <XAxis
          dataKey="hora"
          tick={{ fontSize: 9, fill: "#bbb" }}
          axisLine={false}
          tickLine={false}
          interval={2}
        />
        <YAxis
          domain={[10, 40]}
          tick={{ fontSize: 9, fill: "#bbb" }}
          axisLine={false}
          tickLine={false}
          width={28}
        />
        <Tooltip
          {...tooltipStyle}
          formatter={(v) => [`${v} rpm`, "Respiração"]}
        />
        <ReferenceLine
          y={30}
          stroke="#fca5a5"
          strokeDasharray="4 2"
          label={{
            value: "alto",
            fontSize: 9,
            fill: "#fca5a5",
            position: "right",
          }}
        />
        <ReferenceLine
          y={15}
          stroke="#86efac"
          strokeDasharray="4 2"
          label={{
            value: "baixo",
            fontSize: 9,
            fill: "#86efac",
            position: "right",
          }}
        />
        <Line
          type="monotone"
          dataKey="valor"
          stroke="#06b6d4"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: "#06b6d4" }}
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
          stroke="#f0f0f0"
          vertical={false}
        />
        <XAxis
          dataKey="dia"
          tick={{ fontSize: 9, fill: "#bbb" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 9, fill: "#bbb" }}
          axisLine={false}
          tickLine={false}
          width={32}
          tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
        />
        <Tooltip
          {...tooltipStyle}
          formatter={(v, name) => [
            name === "meta" ? `${v.toLocaleString()} meta` : v.toLocaleString(),
            name === "meta" ? "Meta" : "Passos",
          ]}
        />
        <ReferenceLine
          y={5000}
          stroke="#c084fc"
          strokeDasharray="4 2"
          label={{
            value: "meta",
            fontSize: 9,
            fill: "#c084fc",
            position: "right",
          }}
        />
        <Bar dataKey="valor" radius={[4, 4, 0, 0]} maxBarSize={24}>
          {data?.map((entry, i) => (
            <Cell
              key={i}
              fill={entry.valor >= (entry.meta ?? 5000) ? "#454ade" : "#a5b4fc"}
            />
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
            tick={{ fontSize: 9, fill: "#bbb" }}
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
