import { useEffect, useRef, useState } from "react";
import styles from "./ModalCompartilhar.module.css";
import { jsPDF } from "jspdf";

import iconeWhatsapp from "../../assets/img/dashboard/icon-whatsapp.svg";
import iconeEmail from "../../assets/img/comunidade/icon-email.svg";
import iconePDF from "../../assets/img/dashboard/icon-pdf.svg";
import logo from "../../assets/img/logo-branco.webp";

const DADOS_MOCK = {
  diaInicio: 8,
  diaFim: 14,
  mes: "Julho",
  ano: 2025,

  // Dono
  donoNome: "Jorge",
  donoEmail: "jorge@email.com",

  // Pet
  petNome: "Rex",
  petRaca: "Bulldog",
  petIdade: 10, // anos
  petSexo: "Macho",
  petPeso: "30kg",

  // Dados diários (índice 0 = diaInicio - índice 6 = diaFim)
  bpmSemana: [70, 80, 80, 80, 90, 100, 75], // batimentos/min
  rpmSemana: [18, 20, 19, 21, 22, 20, 18], // respirações/min
  passosSemana: [4000, 5000, 4500, 4000, 5000, 2000, 6000], // passos
  sonoSemana: [8, 7.5, 9, 11.5, 12, 10, 7], // horas
};

const media = (arr) =>
  arr && arr.length
    ? Math.round(arr.reduce((s, v) => s + v, 0) / arr.length)
    : "—";

const mediaDecimal = (arr) =>
  arr && arr.length
    ? (arr.reduce((s, v) => s + v, 0) / arr.length).toFixed(1)
    : "—";

function buildRelatorio(dados = DADOS_MOCK) {
  return {
    periodo: `${dados.diaInicio} a ${dados.diaFim} de ${dados.mes}`,
    dono: { nome: dados.donoNome, email: dados.donoEmail },
    pet: {
      nome: dados.petNome,
      raca: dados.petRaca,
      idade: `${dados.petIdade} anos`,
      sexo: dados.petSexo,
      peso: dados.petPeso,
    },
    mediaBatimentos: `${media(dados.bpmSemana)} bpm`,
    mediaRespiracao: `${media(dados.rpmSemana)} rpm`,
    mediaPassos: `${media(dados.passosSemana).toLocaleString("pt-BR")} passos`,
    padraoDeSono: `${mediaDecimal(dados.sonoSemana)}h`,
    bpmSemana: dados.bpmSemana,
    rpmSemana: dados.rpmSemana,
    passosSemana: dados.passosSemana,
    sonoSemana: dados.sonoSemana,
    diaInicio: dados.diaInicio,
    diaFim: dados.diaFim,
  };
}

// Converte URL de imagem para base64
async function urlParaBase64(url) {
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = url;
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
  });

  const canvas = document.createElement("canvas");
  canvas.width = img.width * 2;
  canvas.height = img.height * 2;

  const ctx = canvas.getContext("2d");
  ctx.scale(2, 2);
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL("image/png", 1.0);
}

// Geração do PDF
async function gerarPDF(relatorio, logoBase64) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  const azul = [27, 31, 59];
  const roxo = [69, 74, 222];
  const cinza = [107, 114, 128];
  const branco = [255, 255, 255];
  const fundoCinza = [249, 250, 251];
  const largura = doc.internal.pageSize.getWidth();
  const altura = doc.internal.pageSize.getHeight();

  // Cabeçalho
  doc.setFillColor(...azul);
  doc.rect(0, 0, largura, 36, "F");

  if (logoBase64) {
    doc.addImage(logoBase64, "PNG", 14, 8, 50, 18, undefined, "SLOW");
  } else {
    doc.setTextColor(...branco);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("DunDum", 14, 22);
  }

  doc.setTextColor(...branco);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text(`Período: ${relatorio?.periodo ?? "—"}`, largura - 14, 14, {
    align: "right",
  });
  doc.setFont("helvetica", "normal");
  const dataAtual = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  doc.text(`Gerado em ${dataAtual}`, largura - 14, 19, { align: "right" });
  doc.text("Relatório de Saúde do Pet", largura - 14, 24, { align: "right" });

  // Informações Dono e Pet
  // const infoY = 42;
  doc.setTextColor(...azul);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Informações", 14, 48);

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("Dono", 14, 56);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...cinza);
  doc.text(`Nome: ${relatorio?.dono?.nome ?? "—"}`, 14, 62);
  doc.text(`E-mail: ${relatorio?.dono?.email ?? "—"}`, 14, 67);

  doc.setTextColor(...azul);
  doc.setFont("helvetica", "bold");
  doc.text("Pet", 100, 56);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...cinza);
  doc.text(`Nome: ${relatorio?.pet?.nome ?? "—"}`, 100, 62);
  doc.text(`Raça: ${relatorio?.pet?.raca ?? "—"}`, 100, 67);
  doc.text(`Peso: ${relatorio?.pet?.peso ?? "—"}`, 100, 72);
  doc.text(`Sexo: ${relatorio?.pet?.sexo ?? "—"}`, 100, 77);
  doc.text(`Idade: ${relatorio?.pet?.idade ?? "—"}`, 100, 82);

  // Título seção Resumo
  const resumoY = 94;
  doc.setTextColor(...azul);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Médias da semana", 14, resumoY);
  doc.setDrawColor(...roxo);
  doc.setLineWidth(0.8);
  doc.line(14, resumoY + 3, 72, resumoY + 3);

  const metricas = [
    {
      label: "Batimentos",
      valor: relatorio?.mediaBatimentos ?? "—",
      cor: [239, 68, 68],
    },
    { label: "Passos", valor: relatorio?.mediaPassos ?? "—", cor: [...roxo] },
    {
      label: "Respiração",
      valor: relatorio?.mediaRespiracao ?? "—",
      cor: [6, 182, 212],
    },
    {
      label: "Sono",
      valor: relatorio?.padraoDeSono ?? "—",
      cor: [225, 187, 201],
    },
  ];

  const cardW = 82,
    cardH = 18,
    gap = 4,
    startX = 14,
    startY = resumoY + 8;

  metricas.forEach((m, i) => {
    const x = startX + (i % 2) * (cardW + gap);
    const y = startY + Math.floor(i / 2) * (cardH + gap);
    doc.setFillColor(...fundoCinza);
    doc.roundedRect(x, y, cardW, cardH, 3, 3, "F");
    doc.setFillColor(...m.cor);
    doc.roundedRect(x, y, 3, cardH, 1.5, 1.5, "F");
    doc.setTextColor(...cinza);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(m.label, x + 8, y + 7);
    doc.setTextColor(...azul);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(String(m.valor), x + 8, y + 14);
  });

  // Dados diários
  const diasY = startY + 2 * (cardH + gap) + 10;
  const diasCount = relatorio?.bpmSemana?.length ?? 7;
  const diaInicio = relatorio?.diaInicio ?? 1;

  doc.setTextColor(...azul);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Dados Diários", 14, diasY);
  doc.setDrawColor(...roxo);
  doc.setLineWidth(0.8);
  doc.line(14, diasY + 3, 72, diasY + 3);

  const colunas = ["Dia", "Batimentos", "Respiração", "Passos", "Sono"];
  const colX = [14, 40, 72, 105, 155];
  const rowH = 7;
  const tabelaY = diasY + 13;

  // Cabeçalho tabela
  doc.setFillColor(...azul);
  doc.rect(14, tabelaY - 5, largura - 28, rowH + 1, "F");
  doc.setTextColor(...branco);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  colunas.forEach((col, ci) => doc.text(col, colX[ci], tabelaY + 0.5));

  // Linhas de dados
  for (let i = 0; i < diasCount; i++) {
    const ry = tabelaY + (i + 1) * rowH;
    doc.setFillColor(
      i % 2 === 0 ? 255 : 249,
      i % 2 === 0 ? 255 : 250,
      i % 2 === 0 ? 255 : 251,
    );
    doc.rect(14, ry - 5, largura - 28, rowH, "F");
    doc.setTextColor(...cinza);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    const dia = diaInicio + i;
    doc.text(`Dia ${dia}`, colX[0], ry);
    doc.text(`${relatorio?.bpmSemana?.[i] ?? "—"} bpm`, colX[1], ry);
    doc.text(`${relatorio?.rpmSemana?.[i] ?? "—"} rpm`, colX[2], ry);
    doc.text(
      `${(relatorio?.passosSemana?.[i] ?? "—").toLocaleString?.("pt-BR") ?? relatorio?.passosSemana?.[i]}`,
      colX[3],
      ry,
    );
    doc.text(`${relatorio?.sonoSemana?.[i] ?? "—"}h`, colX[4], ry);
  }

  // Observações
  const obsY = tabelaY + (diasCount + 2) * rowH + 4;
  doc.setFillColor(...fundoCinza);
  doc.roundedRect(14, obsY, largura - 28, 30, 3, 3, "F");
  doc.setTextColor(...azul);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Observações", 20, obsY + 8);
  doc.setTextColor(...cinza);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  [
    "- Os dados são médias coletadas pela coleira DunDum durante o período indicado.",
    "- Valores fora do intervalo normal podem indicar necessidade de consulta veterinária.",
    "- Este relatório não substitui avaliação profissional.",
  ].forEach((linha, i) => doc.text(linha, 20, obsY + 15 + i * 6));

  // Rodapé
  doc.setFillColor(...azul);
  doc.rect(0, altura - 14, largura, 14, "F");
  doc.setTextColor(...branco);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.text("DunDum © 2026", largura / 2, altura - 6, { align: "center" });

  const nome = `relatorio-dundum-${(relatorio?.periodo ?? "semana")
    .replace(/\s/g, "-")
    .toLowerCase()}.pdf`;
  doc.save(nome);
}

// Texto para compartilhamento
function buildTextoCompartilhamento(relatorio) {
  const dias = relatorio?.bpmSemana?.length ?? 0;
  const diaInicio = relatorio?.diaInicio ?? "?";

  let linhasDiarias = "";
  for (let i = 0; i < dias; i++) {
    const dia = diaInicio + i;
    linhasDiarias +=
      `  Dia ${dia}: ${relatorio?.bpmSemana?.[i] ?? "—"} bpm | ` +
      `${relatorio?.rpmSemana?.[i] ?? "—"} rpm | ` +
      `${relatorio?.passosSemana?.[i]?.toLocaleString("pt-BR") ?? "—"} passos | ` +
      `${relatorio?.sonoSemana?.[i] ?? "—"}h sono\n`;
  }

  return (
    `Relatório de Saúde do(a) ${relatorio?.pet?.nome ?? "Pet"}\n` +
    `Período: ${relatorio?.periodo ?? "—"}\n` +
    `\nInformações:\n` +
    `  Nome do dono: ${relatorio?.dono?.nome ?? "—"}\n` +
    `  E-mail do dono: ${relatorio?.dono?.email ?? "—"}\n` +
    `  Nome do pet: ${relatorio?.pet?.nome ?? "—"}\n` +
    `  Raça do pet: ${relatorio?.pet?.raca ?? "—"}\n` +
    `  Peso do pet: ${relatorio?.pet?.peso ?? "—"}\n` +
    `  Sexo do pet: ${relatorio?.pet?.sexo ?? "—"}\n` +
    `  Idade do pet: ${relatorio?.pet?.idade ?? "—"}\n` +
    `\nMédias da semana:\n` +
    `  Batimentos: ${relatorio?.mediaBatimentos ?? "—"}\n` +
    `  Respiração: ${relatorio?.mediaRespiracao ?? "—"}\n` +
    `  Passos: ${relatorio?.mediaPassos ?? "—"}\n` +
    `  Sono: ${relatorio?.padraoDeSono ?? "—"}\n` +
    `\nDados Diários:\n` +
    linhasDiarias +
    `\nObservações:` +
    `\n- Os dados são médias coletadas pela coleira DunDum durante o período indicado.` +
    `\n- Valores fora do intervalo normal podem indicar necessidade de consulta veterinária.` +
    `\n- Este relatório não substitui avaliação profissional.\n` +
    `\nDunDum © 2026\n`
  );
}

const CANAIS = [
  { id: "whatsapp", label: "WhatsApp", cor: "#1b1f3b", icon: iconeWhatsapp },
  { id: "email", label: "E-mail", cor: "#1b1f3b", icon: iconeEmail },
  { id: "pdf", label: "Baixar PDF", cor: "#1b1f3b", icon: iconePDF },
];

export function ModalCompartilhar({ dados = DADOS_MOCK, onClose }) {
  const overlayRef = useRef(null);
  const [enviado, setEnviado] = useState(null);
  const [gerandoPDF, setGerandoPDF] = useState(false);

  const relatorio = buildRelatorio(dados);

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

  const handleCompartilhar = async (canal) => {
    const texto = buildTextoCompartilhamento(relatorio);

    if (canal === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, "_blank");
      setEnviado("whatsapp");
    } else if (canal === "email") {
      const subject = encodeURIComponent(
        `Relatório semanal de Saúde do(a) ${relatorio?.pet?.nome ?? "Pet"}`,
      );
      window.open(
        `mailto:?subject=${subject}&body=${encodeURIComponent(texto)}`,
        "_blank",
      );
      setEnviado("email");
    } else if (canal === "pdf") {
      setGerandoPDF(true);
      try {
        const logoBase64 = await urlParaBase64(logo);
        await gerarPDF(relatorio, logoBase64);
        setEnviado("pdf");
      } catch (err) {
        console.error("Erro ao gerar PDF:", err);
        alert("Não foi possível gerar o PDF.");
      } finally {
        setGerandoPDF(false);
      }
    }
  };

  const getLabelCanal = (canal) => {
    if (canal.id === "pdf" && gerandoPDF) return "Gerando PDF";
    return canal.label;
  };

  const labelDias = Array.from(
    { length: dados.bpmSemana?.length ?? 7 },
    (_, i) => `Dia ${dados.diaInicio + i}`,
  );

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-compartilhar-titulo"
    >
      <div className={styles.modal}>
        <button
          className={styles.btnFechar}
          onClick={onClose}
          aria-label="Fechar"
        >
          <span className={styles.btnFecharX}>✕</span>
        </button>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerBadge}>Relatório Semanal</div>
          <h2 className={styles.titulo} id="modal-compartilhar-titulo">
            Compartilhar <span className={styles.destaque}>relatório</span>
          </h2>
          <p className={styles.subtitulo}>
            Período: {relatorio?.periodo ?? "—"}
          </p>
        </div>

        <div className={styles.preview}>
          <p className={styles.previewTitulo}>Resumo da semana</p>
          <div className={styles.previewGrid}>
            {[
              {
                label: "Batimentos",
                valor: relatorio?.mediaBatimentos,
                cor: "#ef4444",
              },
              {
                label: "Passos",
                valor: relatorio?.mediaPassos,
                cor: "#454ade",
              },
              {
                label: "Respiração",
                valor: relatorio?.mediaRespiracao,
                cor: "#06b6d4",
              },
              { label: "Sono", valor: relatorio?.padraoDeSono, cor: "#e1bbc9" },
            ].map((item) => (
              <div
                key={item.label}
                className={styles.previewItem}
                style={{ "--item-cor": item.cor }}
              >
                <span className={styles.previewLabel}>{item.label}</span>
                <strong className={styles.previewValor}>
                  {item.valor ?? "—"}
                </strong>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.tabelaWrap}>
          <p className={styles.previewTitulo}>Dados por dia</p>
          <div className={styles.tabelaScroll}>
            <table className={styles.tabela}>
              <thead>
                <tr>
                  <th>Dia</th>
                  <th style={{ color: "#ef4444" }}>Bat.</th>
                  <th style={{ color: "#06b6d4" }}>Resp.</th>
                  <th style={{ color: "#454ade" }}>Passos</th>
                  <th style={{ color: "#e1bbc9" }}>Sono</th>
                </tr>
              </thead>
              <tbody>
                {labelDias.map((dia, i) => (
                  <tr key={dia}>
                    <td className={styles.tabelaDia}>{dia}</td>
                    <td>{dados.bpmSemana?.[i] ?? "—"} bpm</td>
                    <td>{dados.rpmSemana?.[i] ?? "—"} rpm</td>
                    <td>
                      {dados.passosSemana?.[i]?.toLocaleString("pt-BR") ?? "—"}
                    </td>
                    <td>{dados.sonoSemana?.[i] ?? "—"}h</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className={styles.secaoLabel}>Compartilhar via</p>
        <div className={styles.canais}>
          {CANAIS.map((canal) => (
            <button
              key={canal.id}
              className={[
                styles.canalBtn,
                enviado === canal.id ? styles.canalEnviado : "",
                gerandoPDF && canal.id === "pdf" ? styles.canalCarregando : "",
              ].join(" ")}
              style={{ "--canal-cor": canal.cor }}
              onClick={() => handleCompartilhar(canal.id)}
              disabled={gerandoPDF && canal.id === "pdf"}
            >
              <img
                src={canal.icon}
                alt={canal.label}
                className={styles.canalIcone}
              />
              <span className={styles.canalLabel}>{getLabelCanal(canal)}</span>
            </button>
          ))}
        </div>

        <button className={styles.btnFecharRodape} onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}
