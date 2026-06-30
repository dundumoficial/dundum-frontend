import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { RotaPrivada, RotaPublica } from "./PrivateRoute.jsx";
import useScrollToTop from "../hooks/useScrollToTop.js";
import PageLoader from "../components/PageLoader/PageLoader.jsx";
import Header from "../components/Header/Header.jsx";
import HeaderLogado from "../components/HeaderLogado/HeaderLogado.jsx";
import { useHeader } from "../hooks/useHeader.js";

// rotas leves
import Home from "../pages/Home/Home.jsx";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.jsx";

// rotas lazy
const Produtos = lazy(() => import("../pages/Produtos/Produtos.jsx"));
const SobreNos = lazy(() => import("../pages/SobreNos/SobreNos.jsx"));
const Comunidade = lazy(() => import("../pages/Comunidade/Comunidade.jsx"));
const CentralDeAjuda = lazy(
  () => import("../pages/CentralDeAjuda/CentralDeAjuda.jsx"),
);
const TermosCondicoes = lazy(
  () => import("../pages/TermosCondicoes/TermosCondicoes.jsx"),
);
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard.jsx"));
const Login = lazy(() => import("../pages/Login/Login.jsx"));
const Cadastro = lazy(() => import("../pages/Cadastro/Cadastro.jsx"));
const NovaSenha = lazy(() => import("../pages/NovaSenha/NovaSenha.jsx"));

function Layout({ children }) {
  const tipo = useHeader();
  return (
    <>
      {tipo === "padrao" && <Header />}
      {tipo === "logado" && <HeaderLogado />}
      {children}
    </>
  );
}

function AppContent() {
  useScrollToTop();
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/sobrenos" element={<SobreNos />} />
          <Route path="/comunidade" element={<Comunidade />} />
          <Route path="/centraldeajuda" element={<CentralDeAjuda />} />
          <Route path="/termoscondicoes" element={<TermosCondicoes />} />
          <Route
            path="/login"
            element={
              <RotaPublica>
                <Login />
              </RotaPublica>
            }
          />
          <Route
            path="/cadastro"
            element={
              <RotaPublica>
                <Cadastro />
              </RotaPublica>
            }
          />
          <Route
            path="/novasenha"
            element={
              <RotaPublica>
                <NovaSenha />
              </RotaPublica>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RotaPrivada>
                <Dashboard />
              </RotaPrivada>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default function Router() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
