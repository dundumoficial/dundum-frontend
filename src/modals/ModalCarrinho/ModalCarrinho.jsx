import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext.jsx";
import styles from "./ModalCarrinho.module.css";

export default function ModalCarrinho({ onClose }) {
  const { itens, totalItens, totalPreco, remover, alterarQtd, limpar } =
    useCart();
  const overlayRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) onClose();
  }

  function handleComprar() {
    onClose();
    navigate("/produtos", { state: { abrirCompra: true } });
  }

  const formatarPreco = (valor) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-carrinho-titulo"
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.titulo} id="modal-carrinho-titulo">
            Carrinho
            {totalItens > 0 && (
              <span className={styles.badge}>
                {totalItens} {totalItens === 1 ? "item" : "itens"}
              </span>
            )}
          </h2>
          <button
            className={styles.btnFechar}
            onClick={onClose}
            aria-label="Fechar carrinho"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        {itens.length === 0 ? (
          <div className={styles.vazio}>
            <svg
              className={styles.vazioIcone}
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <p className={styles.vazioTexto}>Seu carrinho está vazio</p>
            <button
              className={styles.btnPrimary}
              onClick={() => {
                onClose();
                navigate("/produtos");
              }}
            >
              Ver produtos
            </button>
          </div>
        ) : (
          <>
            <ul
              className={styles.lista}
              role="list"
              aria-label="Itens no carrinho"
            >
              {itens.map((item) => (
                <li key={item.id} className={styles.item} role="listitem">
                  {item.imagem && (
                    <img
                      src={item.imagem}
                      alt={item.nome}
                      className={styles.itemImg}
                      loading="lazy"
                      width={60}
                      height={60}
                    />
                  )}
                  <div className={styles.itemInfo}>
                    <p className={styles.itemNome}>{item.nome}</p>
                    {item.cor && (
                      <p className={styles.itemDetalhe}>Cor: {item.cor}</p>
                    )}
                    <p className={styles.itemPreco}>
                      {formatarPreco(item.preco)}
                    </p>
                  </div>

                  <div className={styles.itemControles}>
                    <div className={styles.qtdWrap}>
                      <button
                        className={styles.qtdBtn}
                        onClick={() => alterarQtd(item.id, item.qtd - 1)}
                        aria-label={`Diminuir quantidade de ${item.nome}`}
                        disabled={item.qtd <= 1}
                      >
                        −
                      </button>
                      <span
                        className={styles.qtd}
                        aria-label={`Quantidade: ${item.qtd}`}
                      >
                        {item.qtd}
                      </span>
                      <button
                        className={styles.qtdBtn}
                        onClick={() => alterarQtd(item.id, item.qtd + 1)}
                        aria-label={`Aumentar quantidade de ${item.nome}`}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className={styles.btnRemover}
                      onClick={() => remover(item.id)}
                      aria-label={`Remover ${item.nome} do carrinho`}
                    >
                      <span aria-hidden="true">✕</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <footer className={styles.rodape}>
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Total</span>
                <strong className={styles.totalValor}>
                  {formatarPreco(totalPreco)}
                </strong>
              </div>

              <button className={styles.btnPrimary} onClick={handleComprar}>
                Finalizar compra
              </button>

              <button
                className={styles.btnSecondary}
                onClick={() => {
                  onClose();
                  navigate("/produtos");
                }}
              >
                Continuar comprando
              </button>

              <button className={styles.btnLimpar} onClick={limpar}>
                Limpar carrinho
              </button>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}
