import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider, useAuth } from "../contexts/AuthContext.jsx";

// mock firebase auth
vi.mock("../config/firebaseConfig.js", () => ({
  auth: {},
}));

vi.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signInWithPopup: vi.fn(),
  GoogleAuthProvider: class GoogleAuthProvider {},
  sendPasswordResetEmail: vi.fn(),
  confirmPasswordReset: vi.fn(),
  verifyPasswordResetCode: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn((auth, cb) => {
    cb(null); // sem usuário logado por padrão
    return vi.fn(); // função de unsubscribe
  }),
  updateProfile: vi.fn(),
}));

global.fetch = vi.fn();

// componente auxiliar
function ConsumidorAuth() {
  const { usuario, autenticado, carregando } = useAuth();
  if (carregando) return <p>Carregando...</p>;
  return (
    <div>
      <p data-testid="autenticado">{autenticado ? "sim" : "nao"}</p>
      <p data-testid="usuario">{usuario?.nome ?? "nenhum"}</p>
    </div>
  );
}

function renderComProvider() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <ConsumidorAuth />
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe("AuthContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("inicia sem usuário autenticado", async () => {
    renderComProvider();
    await waitFor(() => {
      expect(screen.getByTestId("autenticado")).toHaveTextContent("nao");
    });
  });

  it("exibe 'nenhum' quando não há usuário", async () => {
    renderComProvider();
    await waitFor(() => {
      expect(screen.getByTestId("usuario")).toHaveTextContent("nenhum");
    });
  });

  it("fornece função logout sem lançar erro", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true });

    function ComponenteLogout() {
      const { logout } = useAuth();
      return <button onClick={() => logout()}>Sair</button>;
    }

    render(
      <MemoryRouter>
        <AuthProvider>
          <ComponenteLogout />
        </AuthProvider>
      </MemoryRouter>,
    );

    await act(async () => {
      fireEvent.click(screen.getByText("Sair"));
    });
  });
});
