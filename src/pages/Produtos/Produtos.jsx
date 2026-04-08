import { useState } from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import styles from "./Produtos.module.css";

// Importação das imagens
import img1 from "../../assets/img/produtos/img1.webp";
import img2 from "../../assets/img/produtos/img2.webp";
import img3 from "../../assets/img/produtos/img3.webp";
import img4 from "../../assets/img/produtos/img4.webp";

const galeria = [img1, img2, img3, img4];

const cores = [
  { nome: "Branco", valor: "#ffffff", borda: "#cccccc" },
  { nome: "Preto", valor: "#1a1a1a", borda: "#1a1a1a" },
  { nome: "Rosa", valor: "#c874d9", borda: "#c874d9" },
  { nome: "Azul", valor: "#454ade", borda: "#454ade" },
];

const planos = [
  {
    nome: "Gratuito",
    preco: "Não há custo",
    itens: [
      "Monitoramento cardíaco",
      "Monitoramento da respiração",
      "Contagem de passos",
    ],
  },
  {
    nome: "Intermediário",
    preco: "R$ 29,90",
    itens: ["Tudo da básica", "Análise de sono", "Bateria otimizada"],
  },
  {
    nome: "Premium",
    preco: "R$ 59,90",
    itens: [
      "Todas funcionalidades",
      "Interpretação de emoção",
      "Integração com app",
    ],
  },
];

const funcionalidades = [
  "Monitoramento da respiração",
  "Análise de sono",
  "Contagem de passos",
  "Monitoramento cardíaco",
  "Bateria recarregável",
  "Interpretação de emoção",
  "integração com o aplicativo",
  "À prova d'água",
];

export default function Produtos() {
  const [imagemAtiva, setImagemAtiva] = useState(0);
  const [corSelecionada, setCorSelecionada] = useState(1);
  const [quantidade, setQuantidade] = useState(1);

  const diminuirQuantidade = () => {
    if (quantidade > 1) setQuantidade((q) => q - 1);
  };

  const aumentarQuantidade = () => {
    setQuantidade((q) => q + 1);
  };

  return (
    <>
      <Header />

      <main className={styles.container}>

        {/* ── SEÇÃO PRODUTO ── */}
        <section className={styles.produtoSection}>

          {/* Coluna da galeria */}
          <div className={styles.galeriaWrapper}>
            <div className={styles.imagemPrincipalBox}>
              <img
                className={styles.imagemPrincipal}
                src={galeria[imagemAtiva]}
                alt="Coleira Inteligente"
              />
            </div>
            <div className={styles.thumbnailLista}>
              {galeria.map((img, i) => (
                <button
                  key={i}
                  className={`${styles.thumbnailBtn} ${
                    imagemAtiva === i ? styles.thumbnailAtiva : ""
                  }`}
                  onClick={() => setImagemAtiva(i)}
                  aria-label={`Ver imagem ${i + 1}`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    className={styles.thumbnailImg}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Coluna de informações */}
          <div className={styles.infoWrapper}>
            <h1 className={styles.nomeProduto}>Coleira Inteligente</h1>
            <p className={styles.descricaoProduto}>
              Utiliza sensores para monitorar sinais vitais e atividade física
              do seu pet em tempo real.
            </p>

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
                          corSelecionada === i ? "var(--color-purple)" : cor.borda,
                      }}
                      onClick={() => setCorSelecionada(i)}
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
                    value={quantidade}
                    onChange={(e) =>
                      setQuantidade(Math.max(1, Number(e.target.value)))
                    }
                    readOnly
                  />
                  <div className={styles.quantidadeSetas}>
                    <button
                      className={styles.setaBtn}
                      onClick={aumentarQuantidade}
                      aria-label="Aumentar quantidade"
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
              <button className={styles.btnComprar}>Comprar Agora</button>
              <button className={styles.btnCarrinho}>Adicionar no carrinho</button>
            </div>
          </div>
        </section>

        {/* ── SEÇÃO PLANOS ── */}
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

        {/* ── SEÇÃO FUNCIONALIDADES ── */}
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

        {/* ── SEÇÃO CTA ── */}
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