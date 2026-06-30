import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import PageLoader from "../components/PageLoader/PageLoader.jsx";

export function RotaPrivada({ children }) {
  const { autenticado, carregando } = useAuth();

  if (carregando) return <PageLoader />;
  if (!autenticado) return <Navigate to="/login" replace />;
  return children;
}

export function RotaPublica({ children }) {
  const { autenticado, carregando } = useAuth();

  if (carregando) return <PageLoader />;
  if (autenticado) return <Navigate to="/dashboard" replace />;
  return children;
}
