import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { api } from "../services/api.js";

const ThemeContext = createContext({
  tema: "claro",
  setTema: () => {},
  toggleTema: () => {},
  inicializarTema: () => {},
});

export function ThemeProvider({ children }) {
  const [tema, setTemaState] = useState("claro");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", tema);
  }, [tema]);

  const inicializarTema = useCallback((temaDoServidor) => {
    if (temaDoServidor === "escuro" || temaDoServidor === "claro") {
      setTemaState(temaDoServidor);
    }
  }, []);

  const setTema = useCallback(async (novoTema) => {
    if (novoTema !== "claro" && novoTema !== "escuro") return;
    setTemaState(novoTema);
    try {
      await api.patch("/users/tema", { tema: novoTema });
    } catch (err) {
      console.error("Erro ao salvar tema:", err);
    }
  }, []);

  const toggleTema = useCallback(() => {
    setTemaState((t) => {
      const novo = t === "claro" ? "escuro" : "claro";
      api
        .patch("/users/tema", { tema: novo })
        .catch((err) => console.error("Erro ao salvar tema:", err));
      return novo;
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{ tema, setTema, toggleTema, inicializarTema }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTema() {
  return useContext(ThemeContext);
}
