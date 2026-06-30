import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CartProvider, useCart } from "../contexts/CartContext.jsx";

const ITEM_MOCK = {
  id: "coleira-azul",
  nome: "Coleira DunDum Azul",
  preco: 299.9,
  cor: "Azul",
};

const ITEM_2 = {
  id: "coleira-rosa",
  nome: "Coleira DunDum Rosa",
  preco: 299.9,
  cor: "Rosa",
};

function CarrinhoTeste() {
  const { itens, totalItens, totalPreco, adicionar, remover, alterarQtd, limpar } = useCart();
  return (
    <div>
      <p data-testid="total-itens">{totalItens}</p>
      <p data-testid="total-preco">{totalPreco.toFixed(2)}</p>
      <ul>
        {itens.map((i) => (
          <li key={i.id} data-testid={`item-${i.id}`}>
            {i.nome} x{i.qtd}
          </li>
        ))}
      </ul>
      <button onClick={() => adicionar(ITEM_MOCK)}>Adicionar azul</button>
      <button onClick={() => adicionar(ITEM_2)}>Adicionar rosa</button>
      <button onClick={() => remover(ITEM_MOCK.id)}>Remover azul</button>
      <button onClick={() => alterarQtd(ITEM_MOCK.id, 3)}>Qtd 3</button>
      <button onClick={limpar}>Limpar</button>
    </div>
  );
}

function renderCarrinho() {
  return render(
    <CartProvider>
      <CarrinhoTeste />
    </CartProvider>
  );
}

describe("CartContext", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("inicia com carrinho vazio", () => {
    renderCarrinho();
    expect(screen.getByTestId("total-itens")).toHaveTextContent("0");
    expect(screen.getByTestId("total-preco")).toHaveTextContent("0.00");
  });

  it("adiciona um item ao carrinho", () => {
    renderCarrinho();
    fireEvent.click(screen.getByText("Adicionar azul"));
    expect(screen.getByTestId("total-itens")).toHaveTextContent("1");
    expect(screen.getByTestId("item-coleira-azul")).toHaveTextContent("x1");
  });

  it("incrementa quantidade ao adicionar o mesmo item", () => {
    renderCarrinho();
    fireEvent.click(screen.getByText("Adicionar azul"));
    fireEvent.click(screen.getByText("Adicionar azul"));
    expect(screen.getByTestId("total-itens")).toHaveTextContent("2");
    expect(screen.getByTestId("item-coleira-azul")).toHaveTextContent("x2");
  });

  it("calcula o total de preço corretamente", () => {
    renderCarrinho();
    fireEvent.click(screen.getByText("Adicionar azul"));
    fireEvent.click(screen.getByText("Adicionar azul"));
    expect(screen.getByTestId("total-preco")).toHaveTextContent("599.80");
  });

  it("remove um item do carrinho", () => {
    renderCarrinho();
    fireEvent.click(screen.getByText("Adicionar azul"));
    fireEvent.click(screen.getByText("Remover azul"));
    expect(screen.getByTestId("total-itens")).toHaveTextContent("0");
  });

  it("altera a quantidade de um item", () => {
    renderCarrinho();
    fireEvent.click(screen.getByText("Adicionar azul"));
    fireEvent.click(screen.getByText("Qtd 3"));
    expect(screen.getByTestId("total-itens")).toHaveTextContent("3");
    expect(screen.getByTestId("item-coleira-azul")).toHaveTextContent("x3");
  });

  it("limpa todo o carrinho", () => {
    renderCarrinho();
    fireEvent.click(screen.getByText("Adicionar azul"));
    fireEvent.click(screen.getByText("Adicionar rosa"));
    fireEvent.click(screen.getByText("Limpar"));
    expect(screen.getByTestId("total-itens")).toHaveTextContent("0");
  });

  it("mantém itens distintos separados", () => {
    renderCarrinho();
    fireEvent.click(screen.getByText("Adicionar azul"));
    fireEvent.click(screen.getByText("Adicionar rosa"));
    expect(screen.getByTestId("total-itens")).toHaveTextContent("2");
    expect(screen.getByTestId("item-coleira-azul")).toBeInTheDocument();
    expect(screen.getByTestId("item-coleira-rosa")).toBeInTheDocument();
  });
});
