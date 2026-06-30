import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "dundum_cart";

function cartReducer(state, action) {
  switch (action.type) {
    case "ADICIONAR": {
      const existente = state.find((i) => i.id === action.item.id);
      if (existente) {
        return state.map((i) =>
          i.id === action.item.id ? { ...i, qtd: i.qtd + 1 } : i,
        );
      }
      return [...state, { ...action.item, qtd: 1 }];
    }
    case "REMOVER":
      return state.filter((i) => i.id !== action.id);
    case "ALTERAR_QTD":
      return state.map((i) =>
        i.id === action.id ? { ...i, qtd: Math.max(1, action.qtd) } : i,
      );
    case "LIMPAR":
      return [];
    case "RESTAURAR":
      return action.itens;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [itens, dispatch] = useReducer(cartReducer, [], () => {
    try {
      const salvo = sessionStorage.getItem(STORAGE_KEY);
      return salvo ? JSON.parse(salvo) : [];
    } catch {
      return [];
    }
  });

  // persiste no sessionStorage a cada mudança
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(itens));
    } catch {
      // quota exceeded, ignora silenciosamente
    }
  }, [itens]);

  const totalItens = itens.reduce((acc, i) => acc + i.qtd, 0);
  const totalPreco = itens.reduce((acc, i) => acc + i.preco * i.qtd, 0);

  const adicionar = (item) => dispatch({ type: "ADICIONAR", item });
  const remover = (id) => dispatch({ type: "REMOVER", id });
  const alterarQtd = (id, qtd) => dispatch({ type: "ALTERAR_QTD", id, qtd });
  const limpar = () => dispatch({ type: "LIMPAR" });

  return (
    <CartContext.Provider
      value={{
        itens,
        totalItens,
        totalPreco,
        adicionar,
        remover,
        alterarQtd,
        limpar,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de <CartProvider>");
  return ctx;
}
