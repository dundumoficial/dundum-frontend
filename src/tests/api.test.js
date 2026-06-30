import { describe, it, expect, vi, beforeEach } from "vitest";
import { api, setTokenGetter } from "../services/api.js";

const BASE = "http://localhost:3000";

// configura variável de ambiente para os testes
vi.stubEnv("VITE_API_URL", BASE);

describe("api service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setTokenGetter(() => null); // sem token por padrão
    global.fetch = vi.fn();
  });

  it("GET: chama a URL correta", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ ok: true }),
    });

    await api.get("/users/dashboard");

    expect(fetch).toHaveBeenCalledWith(
      `${BASE}/users/dashboard`,
      expect.objectContaining({
        headers: expect.objectContaining({ "Content-Type": "application/json" }),
        credentials: "include",
      })
    );
  });

  it("GET: inclui Authorization quando token disponível", async () => {
    setTokenGetter(() => "meu-token-jwt");
    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({}),
    });

    await api.get("/users/profile");

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer meu-token-jwt",
        }),
      })
    );
  });

  it("GET: lança Error em resposta não-ok", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ message: "Não encontrado" }),
    });

    await expect(api.get("/inexistente")).rejects.toThrow("Não encontrado");
  });

  it("GET: usa mensagem genérica se body não é JSON", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => { throw new Error("not json"); },
    });

    await expect(api.get("/erro")).rejects.toThrow("Erro 500");
  });

  it("POST: envia body como JSON", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ criado: true }),
    });

    await api.post("/auth/verify", { idToken: "abc" });

    const chamada = fetch.mock.calls[0];
    expect(chamada[1].method).toBe("POST");
    expect(JSON.parse(chamada[1].body)).toEqual({ idToken: "abc" });
  });

  it("DELETE: usa método DELETE", async () => {
    global.fetch.mockResolvedValueOnce({ ok: true, status: 204, json: async () => null });

    await api.delete("/pets/123");

    expect(fetch.mock.calls[0][1].method).toBe("DELETE");
  });

  it("retorna null para resposta 204", async () => {
    global.fetch.mockResolvedValueOnce({ ok: true, status: 204 });

    const resultado = await api.delete("/recurso/1");
    expect(resultado).toBeNull();
  });
});
