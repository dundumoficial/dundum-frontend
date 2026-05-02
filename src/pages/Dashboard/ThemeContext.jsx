import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

const ThemeContext = createContext({
  tema: "claro",
  setTema: () => {},
  toggleTema: () => {},
});

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState("claro");

  const toggleTema = useCallback(() => {
    setTema((t) => (t === "claro" ? "escuro" : "claro"));
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", tema);
  }, [tema]);

  return (
    <ThemeContext.Provider value={{ tema, setTema, toggleTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTema() {
  return useContext(ThemeContext);
}
