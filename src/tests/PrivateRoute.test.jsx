import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { RotaPrivada, RotaPublica } from "../routes/PrivateRoute.jsx";

const mockAuth = {
  autenticado: false,
  carregando: false,
};

vi.mock("../contexts/AuthContext.jsx", () => ({
  useAuth: () => mockAuth,
}));

vi.mock("../components/PageLoader/PageLoader.jsx", () => ({
  default: () => <p>Carregando...</p>,
}));

function renderRota(componente, rota = "/protegida") {
  return render(
    <MemoryRouter initialEntries={[rota]}>
      <Routes>
        <Route path="/login" element={<p>Página de Login</p>} />
        <Route path="/dashboard" element={<p>Dashboard</p>} />
        <Route path="/protegida" element={componente} />
        <Route path="/publica" element={<p>Página Pública</p>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("RotaPrivada", () => {
  it("redireciona para /login se não autenticado", () => {
    mockAuth.autenticado = false;
    mockAuth.carregando = false;
    renderRota(<RotaPrivada><p>Área privada</p></RotaPrivada>);
    expect(screen.getByText("Página de Login")).toBeInTheDocument();
    expect(screen.queryByText("Área privada")).not.toBeInTheDocument();
  });

  it("exibe o conteúdo se autenticado", () => {
    mockAuth.autenticado = true;
    mockAuth.carregando = false;
    renderRota(<RotaPrivada><p>Área privada</p></RotaPrivada>);
    expect(screen.getByText("Área privada")).toBeInTheDocument();
  });

  it("exibe PageLoader enquanto carregando", () => {
    mockAuth.autenticado = false;
    mockAuth.carregando = true;
    renderRota(<RotaPrivada><p>Área privada</p></RotaPrivada>);
    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });
});

describe("RotaPublica", () => {
  it("exibe o conteúdo se NÃO autenticado", () => {
    mockAuth.autenticado = false;
    mockAuth.carregando = false;
    renderRota(<RotaPublica><p>Login page</p></RotaPublica>);
    expect(screen.getByText("Login page")).toBeInTheDocument();
  });

  it("redireciona para /dashboard se autenticado", () => {
    mockAuth.autenticado = true;
    mockAuth.carregando = false;
    renderRota(<RotaPublica><p>Login page</p></RotaPublica>);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.queryByText("Login page")).not.toBeInTheDocument();
  });

  it("exibe PageLoader enquanto carregando", () => {
    mockAuth.autenticado = false;
    mockAuth.carregando = true;
    renderRota(<RotaPublica><p>Login page</p></RotaPublica>);
    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });
});
