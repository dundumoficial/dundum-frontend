import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
import Produtos from "../pages/Produtos/Produtos.jsx";
import SobreNos from "../pages/SobreNos/SobreNos.jsx";
import Comunidade from "../pages/Comunidade/Comunidade.jsx";
import CentralDeAjuda from "../pages/CentralDeAjuda/CentralDeAjuda.jsx";
import Login from "../pages/Login/Login.jsx";
import Cadastro from "../pages/Cadastro/Cadastro.jsx";
import NovaSenha from "../pages/NovaSenha/NovaSenha.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
// import PrivateRoute from "./PrivateRoute.jsx";
import DashboardTransition from "../components/DashboardTransition/DashboardTransition.jsx";
import useScrollToTop from "../hooks/useScrollToTop.js";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.jsx";
import TermosCondicoes from "../pages/TermosCondicoes/TermosCondicoes.jsx";

function AppContent() {
  useScrollToTop();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/sobrenos" element={<SobreNos />} />
      <Route path="/comunidade" element={<Comunidade />} />
      <Route path="/centraldeajuda" element={<CentralDeAjuda />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/novasenha" element={<NovaSenha />} />
      <Route path="/notfoundpage" element={<NotFoundPage />} />
      <Route path="/termoscondicoes" element={<TermosCondicoes />} />
      <Route
        path="/dashboard"
        element={
          // <PrivateRoute>
          <DashboardTransition>
            <Dashboard />
          </DashboardTransition>
          // </PrivateRoute>
        }
      />
    </Routes>
  );
}

const Router = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default Router;
