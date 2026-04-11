import { useState } from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import ModalCompra from "../../modals/ModalCompra/ModalCompra.jsx";
import styles from "./Produtos.module.css";

import videoComercial from "../../assets/videos/video-comercial.webm";
import img1Azul from "../../assets/img/produtos/img1-azul.webp";
import img1Branco from "../../assets/img/produtos/img1-branco.webp";
import img1Preto from "../../assets/img/produtos/img1-preto.webp";
import img1Rosa from "../../assets/img/produtos/img1-rosa.webp";

import img2Azul from "../../assets/img/produtos/img2-azul.webp";
import img2Branco from "../../assets/img/produtos/img2-branco.webp";
import img2Preto from "../../assets/img/produtos/img2-preto.webp";
import img2Rosa from "../../assets/img/produtos/img2-rosa.webp";

import img3Azul from "../../assets/img/produtos/img3-azul.webp";
import img3Branco from "../../assets/img/produtos/img3-branco.webp";
import img3Preto from "../../assets/img/produtos/img3-preto.webp";
import img3Rosa from "../../assets/img/produtos/img3-rosa.webp";

import img4Azul from "../../assets/img/produtos/img4-azul.webp";
import img4Branco from "../../assets/img/produtos/img4-branco.webp";
import img4Preto from "../../assets/img/produtos/img4-preto.webp";
import img4Rosa from "../../assets/img/produtos/img4-rosa.webp";

const VIDEO_INDEX = 0;
const galeriasPorCor = [
  [img1Branco, img2Branco, img3Branco, img4Branco],
  [img1Preto, img2Preto, img3Preto, img4Preto],
  [img1Rosa, img2Rosa, img3Rosa, img4Rosa],
  [img1Azul, img2Azul, img3Azul, img4Azul],
];

const cores = [
  { nome: "Branco", valor: "#ffffff", borda: "#cccccc" },
  { nome: "Preto", valor: "#000000", borda: "#000000" },
  { nome: "Rosa", valor: "#c874d9", borda: "#c874d9" },
  { nome: "Azul", valor: "#454ade", borda: "#454ade" },
];

const caracteristicas = [
  { label: "Peso", valor: "85g" },
  { label: "Dimensões", valor: "62 × 38 × 18 mm" },
  { label: "Bateria", valor: "Li-Po 2000 mAh" },
  { label: "Autonomia", valor: "Até 30 dias" },
  { label: "Carregamento", valor: "Cabo USB-C" },
  { label: "Resistência", valor: "IP67 (à prova d'água)" },
  { label: "Conectividade", valor: "Wi-Fi" },
  { label: "GPS", valor: "NEO-M8N" },
  { label: "Sensores", valor: "Cardíaco, acelerômetro e microfone" },
  { label: "Compatibilidade", valor: "iOS 13+ e Android 8+" },
  { label: "Material", valor: "ABS + policarbonato reforçado" },
  { label: "Fixação", valor: "Encaixe universal para coleiras 2-4 cm" },
];

const funcionalidades = [
  "Monitoramento da respiração",
  "Análise de sono",
  "Contagem de passos",
  "Monitoramento cardíaco",
  "Bateria recarregável",
  "Interpretação de emoção",
  "Localização por GPS",
  "À prova d'água",
];

const planos = [
  {
    nome: "Gratuito",
    preco: "Não há custo",
    itens: [
      "Monitoramento cardíaco",
      "Monitoramento de passos",
      "Localização por GPS",
      "Alertas cardíacos (batimentos fora do normal)",
    ],
  },
  {
    nome: "Intermediário",
    preco: "R$ 29,90",
    itens: [
      "Tudo do plano gratuito",
      "Monitoramento da respiração",
      "Monitoramento de sono",
      "Alertas respiratórios (respiração irregular)",
    ],
  },
  {
    nome: "Premium",
    preco: "R$ 59,90",
    itens: [
      "Tudo do plano intermediário",
      "Estado emocional do pet",
      "Alertas de fuga (saiu da área segura)",
      "Relatórios semanais",
    ],
  },
];

const avaliacoes = [
  {
    iniciais: "MO",
    nome: "Mariana O.",
    data: "12 mar 2025",
    nota: 5,
    cor: "avRoxo",
    titulo: "Melhor investimento que fiz para o meu dog",
    descricao:
      "Meu golden tem problema cardíaco e a coleira me deu uma tranquilidade enorme. Recebi um alerta às 2h da manhã e consegui levar ele ao veterinário a tempo. Simplesmente salvou a vida do meu pet!",
  },
  {
    iniciais: "RC",
    nome: "Rafael C.",
    data: "28 fev 2025",
    nota: 5,
    cor: "avVerde",
    titulo: "GPS é impressionante",
    descricao:
      "Minha cachorra escapou pela janela e encontrei ela em 10 minutos graças ao GPS. O app é muito intuitivo e os dados de sono me ajudaram a entender que ela dormia mal por ansiedade.",
  },
  {
    iniciais: "LS",
    nome: "Letícia S.",
    data: "15 jan 2025",
    nota: 4,
    cor: "avAzul",
    titulo: "Ótimo produto, aplicativo pode melhorar",
    descricao:
      "A coleira em si é excelente, resistente e confortável. O único ponto de melhoria seria o app, que às vezes demora para atualizar os dados de GPS. Mas no geral recomendo muito!",
  },
];

export default function Produtos() {
  const [imagemAtiva, setImagemAtiva] = useState(0);
  const estoque = 7;
  const [corSelecionada, setCorSelecionada] = useState(1);
  const [quantidade, setQuantidade] = useState(1);
  const [cep, setCep] = useState("");
  const [freteInfo, setFreteInfo] = useState(null);
  const [calculandoFrete, setCalculandoFrete] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  const abrirModal = () => {
    setModalAberto(true);
  };

  const fecharModal = () => setModalAberto(false);

  const corNome = cores[corSelecionada]?.nome ?? "";

  const galeria = [videoComercial, ...galeriasPorCor[corSelecionada]];

  const handleTrocarCor = (i) => {
    setCorSelecionada(i);
    setImagemAtiva(0);
  };

  const diminuirQuantidade = () => {
    if (quantidade > 1) setQuantidade((q) => q - 1);
  };

  const aumentarQuantidade = () => {
    setQuantidade((q) => (q < estoque ? q + 1 : q));
  };

  const calcularFrete = () => {
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) return;
    setCalculandoFrete(true);
    setFreteInfo(null);
    setTimeout(() => {
      const ddd = parseInt(cepLimpo.substring(0, 2));
      let prazo, preco;

      if (ddd <= 19) {
        prazo = "1–2 dias úteis";
        preco = "R$ 12,90";
      } else if (ddd <= 39) {
        prazo = "2–4 dias úteis";
        preco = "R$ 18,90";
      } else if (ddd <= 59) {
        prazo = "3–5 dias úteis";
        preco = "R$ 22,90";
      } else {
        prazo = "5–8 dias úteis";
        preco = "R$ 29,90";
      }

      setFreteInfo({ prazo, preco, gratis: ddd <= 19 });
      setCalculandoFrete(false);
    }, 1200);
  };

  return (
    <>
      <Header />

      {/* MODAL DE COMPRA */}
      {modalAberto && (
        <ModalCompra
          corNome={corNome}
          quantidade={quantidade}
          freteInfo={freteInfo}
          onFechar={fecharModal}
        />
      )}

      <main className={styles.container}>
        {/* SEÇÃO PRODUTO */}
        <section className={styles.produtoSection}>
          {/* Coluna da galeria */}
          <div className={styles.galeriaWrapper}>
            <div className={styles.imagemPrincipalBox}>
              {imagemAtiva === VIDEO_INDEX ? (
                <video
                  key="video-coleira"
                  className={styles.imagemPrincipal}
                  src={galeria[VIDEO_INDEX]}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                />
              ) : (
                <img
                  key={`img-${imagemAtiva}`}
                  className={styles.imagemPrincipal}
                  src={galeria[imagemAtiva]}
                  alt="Coleira Inteligente"
                />
              )}
            </div>
            <div className={styles.thumbnailLista}>
              {galeria
                .map((item, i) => ({ item, i }))
                .filter(({ i }) => i !== imagemAtiva)
                .map(({ item, i }) => (
                  <button
                    key={i}
                    className={styles.thumbnailBtn}
                    onClick={() => setImagemAtiva(i)}
                    aria-label={
                      i === VIDEO_INDEX ? "Ver vídeo" : `Ver imagem ${i}`
                    }
                  >
                    {i === VIDEO_INDEX ? (
                      <div className={styles.thumbnailVideo}>
                        <video
                          src={item}
                          muted
                          playsInline
                          className={styles.thumbnailImg}
                        />
                        <span className={styles.playIcon} aria-hidden>
                          ▶
                        </span>
                      </div>
                    ) : (
                      <img
                        src={item}
                        alt={`Thumbnail ${i}`}
                        className={styles.thumbnailImg}
                      />
                    )}
                  </button>
                ))}
            </div>
          </div>

          {/* Coluna de informações */}
          <div className={styles.infoWrapper}>
            <h1 className={styles.nomeProduto}>Coleira Inteligente</h1>
            <div className={styles.vendasEstoqueRow}>
              <div className={styles.vendidosInfo}>
                <span>+2.300 vendidos</span>
              </div>
              <div className={styles.estoqueInfo}>
                <span>
                  <strong>{estoque}</strong> em estoque
                </span>
              </div>
            </div>

            <div className={styles.avaliacaoRow}>
              <span className={styles.notaNum}>4.9</span>
              <div className={styles.estrelas} aria-label="4.9 de 5 estrelas">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg
                    key={s}
                    className={styles.estrelaSvg}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className={styles.avaliacaoCount}>(200)</span>
            </div>

            <div className={styles.precoWrapper}>
              <span className={styles.precoOriginal}>R$ 399,99</span>
              <span className={styles.precoAtual}>R$ 299,90</span>
            </div>

            <div className={styles.opcoesRow}>
              <div className={styles.coresWrapper}>
                <span className={styles.opcoesLabel}>Selecione a cor</span>
                <div className={styles.coresLista}>
                  {cores.map((cor, i) => (
                    <button
                      key={i}
                      className={`${styles.corBtn} ${
                        corSelecionada === i ? styles.corBtnAtiva : ""
                      }`}
                      style={{
                        backgroundColor: cor.valor,
                        borderColor:
                          corSelecionada === i
                            ? "var(--color-purple)"
                            : cor.borda,
                      }}
                      onClick={() => handleTrocarCor(i)}
                      aria-label={`Cor ${cor.nome}`}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.quantidadeWrapper}>
                <span className={styles.opcoesLabel}>Quantidade</span>
                <div className={styles.quantidadeControle}>
                  <input
                    className={styles.quantidadeInput}
                    type="number"
                    min="1"
                    max={estoque}
                    value={quantidade}
                    onChange={(e) =>
                      setQuantidade(
                        Math.max(1, Math.min(estoque, Number(e.target.value))),
                      )
                    }
                    readOnly
                  />
                  <div className={styles.quantidadeSetas}>
                    <button
                      className={styles.setaBtn}
                      onClick={aumentarQuantidade}
                      aria-label="Aumentar quantidade"
                      disabled={quantidade >= estoque}
                    >
                      ▲
                    </button>
                    <button
                      className={styles.setaBtn}
                      onClick={diminuirQuantidade}
                      aria-label="Diminuir quantidade"
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.botoesRow}>
              <button className={styles.btnComprar} onClick={abrirModal}>
                Comprar Agora
              </button>
              <button className={styles.btnCarrinho}>
                Adicionar no carrinho
              </button>
            </div>

            {/* FRETE */}
            <div className={styles.freteWrapper}>
              <span className={styles.opcoesLabel}>Calcular frete</span>
              <div className={styles.freteRow}>
                <input
                  className={styles.freteInput}
                  type="text"
                  placeholder="00000-000"
                  maxLength={9}
                  value={cep}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 8);
                    setCep(v.length > 5 ? `${v.slice(0, 5)}-${v.slice(5)}` : v);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && calcularFrete()}
                />
                <button
                  className={styles.freteBtn}
                  onClick={calcularFrete}
                  disabled={
                    calculandoFrete || cep.replace(/\D/g, "").length !== 8
                  }
                >
                  {calculandoFrete ? "..." : "Calcular"}
                </button>
              </div>
              {freteInfo && (
                <div className={styles.freteResultado}>
                  <div className={styles.freteOpcao}>
                    <span>{freteInfo.prazo} (PAC)</span>
                    <span
                      className={
                        freteInfo.gratis
                          ? styles.freteGratis
                          : styles.fretePreco
                      }
                    >
                      {freteInfo.gratis ? "GRÁTIS" : freteInfo.preco}
                    </span>
                  </div>
                  <div className={styles.freteOpcao}>
                    <span>
                      {freteInfo.prazo.split("–")[0]} dia útil (SEDEX)
                    </span>
                    <span className={styles.fretePreco}>
                      {freteInfo.gratis
                        ? "R$ 14,90"
                        : `R$ ${(parseFloat(freteInfo.preco.replace("R$ ", "").replace(",", ".")) + 12).toFixed(2).replace(".", ",")}`}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SEÇÃO CARACTERISTICAS */}
        <section className={styles.caracteristicasSection}>
          <h2 className={styles.secaoTitulo}>Características</h2>
          <div className={styles.caracteristicasGrid}>
            {caracteristicas.map((c, i) => (
              <div key={i} className={styles.caracteristicaRow}>
                <span className={styles.caracteristicaLabel}>{c.label}</span>
                <span className={styles.caracteristicaValor}>{c.valor}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SEÇÃO DESCRIÇÃO */}
        <section className={styles.descricaoSection}>
          <h2 className={styles.secaoTitulo}>Descrição</h2>
          <p className={styles.descricaoTexto}>
            A Coleira Inteligente foi desenvolvida para oferecer monitoramento
            completo da saúde e bem-estar do seu pet. Com sensores de alta
            precisão, ela acompanha os sinais vitais, localização e
            comportamento do seu animal em tempo real, diretamente pelo
            aplicativo.
          </p>
        </section>

        {/* SEÇÃO FUNCIONALIDADES */}
        <section className={styles.funcionalidadesSection}>
          <h2 className={styles.secaoTitulo}>Funcionalidades</h2>
          <div className={styles.funcionalidadesGrid}>
            {funcionalidades.map((func, i) => (
              <div key={i} className={styles.funcCard}>
                {func}
              </div>
            ))}
          </div>
        </section>

        {/* SEÇÃO PLANOS */}
        <section className={styles.planosSection}>
          <h2 className={styles.secaoTitulo}>Planos</h2>
          <div className={styles.planosGrid}>
            {planos.map((plano, i) => (
              <div key={i} className={styles.planoCard}>
                <div className={styles.planoHeader}>
                  <span className={styles.planoNome}>{plano.nome}</span>
                  <span className={styles.planoPreco}>{plano.preco}</span>
                </div>
                <ul className={styles.planoItens}>
                  {plano.itens.map((item, j) => (
                    <li key={j} className={styles.planoItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* SEÇÃO AVALIAÇÕES */}
        <section className={styles.avaliacoesSection}>
          <h2 className={styles.secaoTitulo}>Avaliações dos clientes</h2>

          <div className={styles.avalResumo}>
            <div className={styles.avalNota}>
              <span className={styles.notaGrande}>4.9</span>
              <div className={styles.estrelas} aria-label="4.9 de 5 estrelas">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg
                    key={s}
                    className={styles.estrelaSvg}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className={styles.avalTotal}>200 avaliações</span>
            </div>
            <div className={styles.avalBarras}>
              {[
                [5, 182],
                [4, 12],
                [3, 4],
                [2, 1],
                [1, 1],
              ].map(([estrela, qtd]) => (
                <div key={estrela} className={styles.barraRow}>
                  <span className={styles.barraLabel}>{estrela} ★</span>
                  <div className={styles.barraBg}>
                    <div
                      className={styles.barraFill}
                      style={{ width: `${(qtd / 200) * 100}%` }}
                    />
                  </div>
                  <span className={styles.barraCount}>{qtd}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.reviewsLista}>
            {avaliacoes.map((aval, i) => (
              <div key={i} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={`${styles.avatar} ${styles[aval.cor]}`}>
                    {aval.iniciais}
                  </div>
                  <div>
                    <p className={styles.reviewNome}>{aval.nome}</p>
                    <p className={styles.reviewData}>{aval.data}</p>
                  </div>
                </div>
                <div className={styles.reviewStars}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg
                      key={s}
                      className={styles.estrelaSvg}
                      viewBox="0 0 24 24"
                      fill={s <= aval.nota ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth={s <= aval.nota ? 0 : 1.5}
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className={styles.reviewTitulo}>{aval.titulo}</p>
                <p className={styles.reviewTexto}>{aval.descricao}</p>
              </div>
            ))}
          </div>
          <button className={styles.verMaisBtn}>
            Ver todas as 200 avaliações
          </button>
        </section>

        {/* SEÇÃO CTA */}
        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitulo}>
            Dê mais saúde e segurança para seu pet
          </h2>
          <button className={styles.btnCta}>Comprar Coleira Inteligente</button>
        </section>
      </main>

      <Footer />
    </>
  );
}
