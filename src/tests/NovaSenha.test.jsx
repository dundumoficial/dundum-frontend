import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const mockAuth = {
  verificarCodigoReset: vi.fn(),
  confirmarNovaSenha: vi.fn(),
};
vi.mock("../contexts/AuthContext.jsx", () => ({
  useAuth: () => mockAuth,
}));

vi.mock("../components/Footer/Footer.jsx", () => ({ default: () => null }));

import NovaSenha from "../pages/NovaSenha/NovaSenha.jsx";

function renderNovaSenha(params = "oobCode=abc123&mode=resetPassword") {
  return render(
    <MemoryRouter initialEntries={[`/novasenha?${params}`]}>
      <Routes>
        <Route path="/novasenha" element={<NovaSenha />} />
        <Route path="/login" element={<p>Login</p>} />
        <Route path="/recuperarsenha" element={<p>Recuperar</p>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("NovaSenha", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("exibe spinner enquanto verifica o código", () => {
    mockAuth.verificarCodigoReset.mockReturnValue(new Promise(() => {}));
    renderNovaSenha();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("exibe formulário após verificação bem-sucedida", async () => {
    mockAuth.verificarCodigoReset.mockResolvedValue("usuario@email.com");
    renderNovaSenha();
    await waitFor(() => {
      expect(screen.getByLabelText("Nova senha")).toBeInTheDocument();
    });
    expect(screen.getByLabelText("Confirmar senha")).toBeInTheDocument();
  });

  it("exibe erro quando oobCode é inválido", async () => {
    mockAuth.verificarCodigoReset.mockRejectedValue(
      new Error("código inválido"),
    );
    renderNovaSenha();
    await waitFor(() => {
      expect(screen.getByText("Link inválido")).toBeInTheDocument();
    });
  });

  it("mostra erro quando não há oobCode na URL", async () => {
    mockAuth.verificarCodigoReset.mockResolvedValue("email@test.com");
    renderNovaSenha("mode=resetPassword");
    await waitFor(() => {
      expect(screen.getByText("Link inválido")).toBeInTheDocument();
    });
  });

  it("exibe tela de sucesso após redefinir a senha", async () => {
    mockAuth.verificarCodigoReset.mockResolvedValue("usuario@email.com");
    mockAuth.confirmarNovaSenha.mockResolvedValue();
    renderNovaSenha();

    await waitFor(() => screen.getByLabelText("Nova senha"));

    const senha = "Senha@123";
    fireEvent.change(screen.getByLabelText("Nova senha"), {
      target: { value: senha },
    });
    fireEvent.change(screen.getByLabelText("Confirmar senha"), {
      target: { value: senha },
    });

    fireEvent.click(screen.getByRole("button", { name: "Confirmar" }));

    await waitFor(() => {
      expect(screen.getByText(/senha alterada com/i)).toBeInTheDocument();
    });
  });

  it("exibe todos os requisitos de senha", async () => {
    mockAuth.verificarCodigoReset.mockResolvedValue("user@email.com");
    renderNovaSenha();
    await waitFor(() => screen.getByLabelText("Nova senha"));

    expect(screen.getByText("Mínimo 8 caracteres")).toBeInTheDocument();
    expect(screen.getByText("Uma letra maiúscula")).toBeInTheDocument();
    expect(screen.getByText("Um número")).toBeInTheDocument();
    expect(screen.getByText("Um caractere especial")).toBeInTheDocument();
  });
});
