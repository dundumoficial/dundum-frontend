import { useAuth } from "../contexts/AuthContext.jsx";
import { useLocation } from "react-router-dom";

const ROTAS_SEM_HEADER = [
  "/login",
  "/cadastro",
  "/novasenha",
  "/termoscondicoes",
  "/dashboard",
];

const ROTAS_VALIDAS = [
  "/",
  "/produtos",
  "/sobrenos",
  "/comunidade",
  "/centraldeajuda",
  "/termoscondicoes",
  "/login",
  "/cadastro",
  "/novasenha",
  "/dashboard",
];

export function useHeader() {
  const { autenticado } = useAuth();
  const { pathname } = useLocation();

  const semHeader = ROTAS_SEM_HEADER.some((r) => pathname.startsWith(r));
  if (semHeader) return "nenhum";

  const rotaExiste = ROTAS_VALIDAS.includes(pathname);
  if (!rotaExiste) return "nenhum";

  // usuário logado em página pública -> HeaderLogado
  if (autenticado) return "logado";

  // usuário não logado -> Header padrão
  return "padrao";
}
