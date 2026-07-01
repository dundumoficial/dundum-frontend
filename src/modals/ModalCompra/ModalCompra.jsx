import { useState } from "react";
import styles from "./ModalCompra.module.css";

const UFS = [
  "AC",
  "AL",
  "AM",
  "AP",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MG",
  "MS",
  "MT",
  "PA",
  "PB",
  "PE",
  "PI",
  "PR",
  "RJ",
  "RN",
  "RO",
  "RR",
  "RS",
  "SC",
  "SE",
  "SP",
  "TO",
];

export default function ModalCompra({
  corNome,
  quantidade,
  freteInfo,
  onFechar,
}) {
  const [etapa, setEtapa] = useState(1);
  const [formEndereco, setFormEndereco] = useState({
    nome: "",
    cpf: "",
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const [metodoPagamento, setMetodoPagamento] = useState("cartao");
  const [parcelas, setParcelas] = useState(1);
  const [formCartao, setFormCartao] = useState({
    numero: "",
    nome: "",
    validade: "",
    cvv: "",
  });

  const [processando, setProcessando] = useState(false);
  const [numeroPedido, setNumeroPedido] = useState("");

  const precoNum = 549.9;
  const freteValor = freteInfo
    ? freteInfo.gratis
      ? 0
      : parseFloat(freteInfo.preco.replace("R$ ", "").replace(",", "."))
    : 19.9;

  const total = precoNum * quantidade + freteValor;

  const parcelasOpcoes = [1, 2, 3, 4, 5, 6].map((n) => ({
    n,
    label:
      n === 1
        ? `1x de R$ ${total.toFixed(2).replace(".", ",")} sem juros`
        : `${n}x de R$ ${(total / n).toFixed(2).replace(".", ",")} sem juros`,
  }));

  const confirmarPedido = () => {
    setProcessando(true);
    setTimeout(() => {
      setNumeroPedido(`#PET-${Math.floor(Math.random() * 90000) + 10000}`);
      setProcessando(false);
      setEtapa(4);
    }, 2000);
  };

  const fmt = {
    cep: (v) => {
      const s = v.replace(/\D/g, "").slice(0, 8);
      return s.length > 5 ? `${s.slice(0, 5)}-${s.slice(5)}` : s;
    },

    cpf: (v) => {
      const s = v.replace(/\D/g, "").slice(0, 11);
      if (s.length <= 3) return s;
      if (s.length <= 6) return `${s.slice(0, 3)}.${s.slice(3)}`;
      if (s.length <= 9)
        return `${s.slice(0, 3)}.${s.slice(3, 6)}.${s.slice(6)}`;
      return `${s.slice(0, 3)}.${s.slice(3, 6)}.${s.slice(6, 9)}-${s.slice(9)}`;
    },

    cartao: (v) =>
      v
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(.{4})/g, "$1 ")
        .trim(),

    validade: (v) => {
      const s = v.replace(/\D/g, "").slice(0, 4);
      return s.length > 2 ? `${s.slice(0, 2)}/${s.slice(2)}` : s;
    },
  };

  const enderecoValido =
    formEndereco.nome &&
    formEndereco.cep &&
    formEndereco.rua &&
    formEndereco.numero &&
    formEndereco.cidade &&
    formEndereco.estado;

  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onFechar()}
    >
      <div className={styles.box}>
        {/* HEADER */}
        <div className={styles.header}>
          {etapa < 4 && (
            <div className={styles.steps}>
              {["Resumo", "Endereço", "Pagamento"].map((s, i) => (
                <div
                  key={i}
                  className={`${styles.step} ${etapa === i + 1 ? styles.stepAtivo : ""} ${etapa > i + 1 ? styles.stepFeito : ""}`}
                >
                  <div className={styles.stepNum}>
                    {etapa > i + 1 ? "✓" : i + 1}
                  </div>
                  <span className={styles.stepLabel}>{s}</span>
                  {i < 2 && <span className={styles.stepSep}>›</span>}
                </div>
              ))}
            </div>
          )}
          <button
            className={styles.fechar}
            onClick={onFechar}
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <div className={styles.conteudo}>
          {/* ETAPA 1 */}
          {etapa === 1 && (
            <>
              <h2 className={styles.titulo}>Resumo do pedido</h2>
              <div className={styles.produtoRow}>
                <div>
                  <p className={styles.produtoNome}>Coleira Inteligente</p>
                  <p className={styles.produtoSub}>Cor: {corNome}</p>
                  <p className={styles.produtoSub}>Quantidade: {quantidade}</p>
                </div>
                <span className={styles.produtoPreco}>
                  R$ {(precoNum * quantidade).toFixed(2).replace(".", ",")}
                </span>
              </div>
              <div className={styles.linha} />
              <div className={styles.resumoRow}>
                <span>Subtotal</span>
                <span>
                  R$ {(precoNum * quantidade).toFixed(2).replace(".", ",")}
                </span>
              </div>
              <div className={styles.resumoRow}>
                <span>Frete</span>
                <span className={freteValor === 0 ? styles.gratis : ""}>
                  {freteValor === 0
                    ? "GRÁTIS"
                    : `R$ ${freteValor.toFixed(2).replace(".", ",")}`}
                </span>
              </div>
              <div className={styles.linha} />
              <div className={`${styles.resumoRow} ${styles.totalRow}`}>
                <span>Total</span>
                <span>R$ {total.toFixed(2).replace(".", ",")}</span>
              </div>
              {!freteInfo && (
                <p className={styles.aviso}>
                  * Calcule o frete na página para ver o valor exato
                </p>
              )}
              <button
                className={styles.btnPrimario}
                onClick={() => setEtapa(2)}
              >
                Continuar para entrega →
              </button>
            </>
          )}

          {/* ETAPA 2 */}
          {etapa === 2 && (
            <>
              <h2 className={styles.titulo}>Endereço de entrega</h2>
              <div className={styles.form}>
                <div className={styles.formRow}>
                  <div className={`${styles.formGroup} ${styles.flex2}`}>
                    <label className={styles.label}>Nome completo</label>
                    <input
                      className={styles.input}
                      placeholder="João da Silva"
                      value={formEndereco.nome}
                      onChange={(e) =>
                        setFormEndereco({
                          ...formEndereco,
                          nome: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className={`${styles.formGroup} ${styles.flex1}`}>
                    <label className={styles.label}>CPF</label>
                    <input
                      className={styles.input}
                      placeholder="000.000.000-00"
                      value={formEndereco.cpf}
                      onChange={(e) =>
                        setFormEndereco({
                          ...formEndereco,
                          cpf: fmt.cpf(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={`${styles.formGroup} ${styles.flex1}`}>
                    <label className={styles.label}>CEP</label>
                    <input
                      className={styles.input}
                      placeholder="00000-000"
                      value={formEndereco.cep}
                      onChange={(e) =>
                        setFormEndereco({
                          ...formEndereco,
                          cep: fmt.cep(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className={`${styles.formGroup} ${styles.flex3}`}>
                    <label className={styles.label}>Rua / Avenida</label>
                    <input
                      className={styles.input}
                      placeholder="Rua das Flores"
                      value={formEndereco.rua}
                      onChange={(e) =>
                        setFormEndereco({
                          ...formEndereco,
                          rua: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={`${styles.formGroup} ${styles.flex1}`}>
                    <label className={styles.label}>Número</label>
                    <input
                      className={styles.input}
                      placeholder="123"
                      value={formEndereco.numero}
                      onChange={(e) =>
                        setFormEndereco({
                          ...formEndereco,
                          numero: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className={`${styles.formGroup} ${styles.flex2}`}>
                    <label className={styles.label}>Complemento</label>
                    <input
                      className={styles.input}
                      placeholder="Apto 42 (opcional)"
                      value={formEndereco.complemento}
                      onChange={(e) =>
                        setFormEndereco({
                          ...formEndereco,
                          complemento: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className={`${styles.formGroup} ${styles.flex2}`}>
                    <label className={styles.label}>Bairro</label>
                    <input
                      className={styles.input}
                      placeholder="Centro"
                      value={formEndereco.bairro}
                      onChange={(e) =>
                        setFormEndereco({
                          ...formEndereco,
                          bairro: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={`${styles.formGroup} ${styles.flex3}`}>
                    <label className={styles.label}>Cidade</label>
                    <input
                      className={styles.input}
                      placeholder="São Paulo"
                      value={formEndereco.cidade}
                      onChange={(e) =>
                        setFormEndereco({
                          ...formEndereco,
                          cidade: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className={`${styles.formGroup} ${styles.flex1}`}>
                    <label className={styles.label}>Estado</label>
                    <select
                      className={styles.input}
                      value={formEndereco.estado}
                      onChange={(e) =>
                        setFormEndereco({
                          ...formEndereco,
                          estado: e.target.value,
                        })
                      }
                    >
                      <option value="">UF</option>
                      {UFS.map((uf) => (
                        <option key={uf} value={uf}>
                          {uf}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className={styles.botoesRow}>
                <button
                  className={styles.btnSecundario}
                  onClick={() => setEtapa(1)}
                >
                  ← Voltar
                </button>
                <button
                  className={styles.btnPrimario}
                  disabled={!enderecoValido}
                  onClick={() => setEtapa(3)}
                >
                  Continuar para pagamento →
                </button>
              </div>
            </>
          )}

          {/* ETAPA 3 */}
          {etapa === 3 && (
            <>
              <h2 className={styles.titulo}>Forma de pagamento</h2>
              <div className={styles.metodos}>
                {[
                  { id: "cartao", label: "Cartão de crédito" },
                  { id: "pix", label: "Pix" },
                  { id: "boleto", label: "Boleto" },
                ].map((m) => (
                  <button
                    key={m.id}
                    className={`${styles.metodoBtn} ${metodoPagamento === m.id ? styles.metodoBtnAtivo : ""}`}
                    onClick={() => setMetodoPagamento(m.id)}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {metodoPagamento === "cartao" && (
                <div className={styles.form}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Número do cartão</label>
                    <input
                      className={styles.input}
                      placeholder="0000 0000 0000 0000"
                      value={formCartao.numero}
                      onChange={(e) =>
                        setFormCartao({
                          ...formCartao,
                          numero: fmt.cartao(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Nome impresso no cartão
                    </label>
                    <input
                      className={styles.input}
                      placeholder="JOÃO DA SILVA"
                      value={formCartao.nome}
                      onChange={(e) =>
                        setFormCartao({
                          ...formCartao,
                          nome: e.target.value.toUpperCase(),
                        })
                      }
                    />
                  </div>
                  <div className={styles.formRow}>
                    <div className={`${styles.formGroup} ${styles.flex1}`}>
                      <label className={styles.label}>Validade</label>
                      <input
                        className={styles.input}
                        placeholder="MM/AA"
                        value={formCartao.validade}
                        onChange={(e) =>
                          setFormCartao({
                            ...formCartao,
                            validade: fmt.validade(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className={`${styles.formGroup} ${styles.flex1}`}>
                      <label className={styles.label}>CVV</label>
                      <input
                        className={styles.input}
                        placeholder="000"
                        maxLength={4}
                        value={formCartao.cvv}
                        onChange={(e) =>
                          setFormCartao({
                            ...formCartao,
                            cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                          })
                        }
                      />
                    </div>
                    <div className={`${styles.formGroup} ${styles.flex2}`}>
                      <label className={styles.label}>Parcelas</label>
                      <select
                        className={styles.input}
                        value={parcelas}
                        onChange={(e) => setParcelas(Number(e.target.value))}
                      >
                        {parcelasOpcoes.map((p) => (
                          <option key={p.n} value={p.n}>
                            {p.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {metodoPagamento === "pix" && (
                <div className={styles.pixBox}>
                  <div className={styles.pixQr}>
                    <svg viewBox="0 0 100 100" width={140} height={140}>
                      {[0, 1, 2, 3, 4, 5, 6].map((row) =>
                        [0, 1, 2, 3, 4, 5, 6].map((col) => {
                          const fill =
                            (row < 3 && col < 3) ||
                            (row < 3 && col > 3) ||
                            (row > 3 && col < 3) ||
                            (row === 3 && col === 3) ||
                            Math.random() > 0.5;
                          return fill ? (
                            <rect
                              key={`${row}-${col}`}
                              x={col * 14 + 1}
                              y={row * 14 + 1}
                              width={12}
                              height={12}
                              rx={1}
                              fill="#1a1a2e"
                            />
                          ) : null;
                        }),
                      )}
                    </svg>
                  </div>
                  <p className={styles.pixValor}>
                    R$ {total.toFixed(2).replace(".", ",")}
                  </p>
                  <p className={styles.pixSub}>
                    Escaneie o QR Code ou copie a chave Pix
                  </p>
                  <button className={styles.btnCopiar}>Copiar chave Pix</button>
                  <p className={styles.pixAviso}>
                    Confirmação em até 5 minutos
                  </p>
                </div>
              )}

              {metodoPagamento === "boleto" && (
                <div className={styles.boletoBox}>
                  <p className={styles.pixValor}>
                    R$ {total.toFixed(2).replace(".", ",")}
                  </p>
                  <p className={styles.pixSub}>Vencimento em 3 dias úteis</p>
                  <div className={styles.boletoLinha}>
                    <span className={styles.boletoCodigo}>
                      1234.56789 0001.234567 89012.345678 9 00010000029990
                    </span>
                  </div>
                  <button className={styles.btnCopiar}>
                    Copiar código de barras
                  </button>
                  <p className={styles.pixAviso}>
                    Confirmação em até 2 dias úteis após o pagamento
                  </p>
                </div>
              )}

              <div className={styles.resumoFinal}>
                <div className={styles.resumoRow}>
                  <span>Total</span>
                  <strong>R$ {total.toFixed(2).replace(".", ",")}</strong>
                </div>
                <div className={styles.resumoRow}>
                  <span>Entregar em</span>
                  <span>
                    {formEndereco.cidade} — {formEndereco.estado}
                  </span>
                </div>
              </div>
              <div className={styles.botoesRow}>
                <button
                  className={styles.btnSecundario}
                  onClick={() => setEtapa(2)}
                >
                  ← Voltar
                </button>
                <button
                  className={styles.btnPrimario}
                  onClick={confirmarPedido}
                  disabled={processando}
                >
                  {processando ? "Processando..." : "Confirmar pedido"}
                </button>
              </div>
            </>
          )}

          {/* ETAPA 4 */}
          {etapa === 4 && (
            <div className={styles.sucesso}>
              <div className={styles.suecessoIcone}>✓</div>
              <h2 className={styles.sucessoTitulo}>Pedido confirmado!</h2>
              <p className={styles.sucessoSub}>
                Seu pedido foi recebido e está sendo preparado. Você receberá um
                e-mail com os detalhes e o código de rastreio.
              </p>
              <div className={styles.sucessoResumo}>
                <div className={styles.resumoRow}>
                  <span>Pedido</span>
                  <strong>{numeroPedido}</strong>
                </div>
                <div className={styles.resumoRow}>
                  <span>Produto</span>
                  <span>Coleira Inteligente</span>
                </div>
                <div className={styles.resumoRow}>
                  <span>Quantidade</span>
                  <span>{quantidade}</span>
                </div>
                <div className={styles.resumoRow}>
                  <span>Total pago</span>
                  <strong>R$ {total.toFixed(2).replace(".", ",")}</strong>
                </div>
                <div className={styles.resumoRow}>
                  <span>Entrega para</span>
                  <span>
                    {formEndereco.cidade} — {formEndereco.estado}
                  </span>
                </div>
              </div>
              <button className={styles.btnPrimario} onClick={onFechar}>
                Fechar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
