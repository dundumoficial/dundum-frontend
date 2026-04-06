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
import PrivateRoute from "./PrivateRoute.jsx";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Produtos />} path="/produtos" />
        <Route element={<SobreNos />} path="/sobrenos" />
        <Route element={<Comunidade />} path="/comunidade" />
        <Route element={<CentralDeAjuda />} path="/centraldeajuda" />
        <Route element={<Login />} path="/login" />
        <Route element={<Cadastro />} path="/cadastro" />
        <Route element={<NovaSenha />} path="/novasenha" />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
