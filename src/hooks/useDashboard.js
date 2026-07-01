import { useState, useEffect, useCallback } from "react";
import { api } from "../services/api.js";

export function calcularPermissoes(planoNome) {
  const p = (planoNome ?? "gratuito")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return {
    bpm: true,
    localizacao: true,
    passos: p === "intermediario" || p === "premium",
    sono: p === "intermediario" || p === "premium",
    rpm: p === "premium",
    relatorios: p === "premium",
  };
}

const coordenadas = [-23.673284, -46.698625];

export const DEFAULT_DATA = {
  usuario: { nome: "", email: "", iniciais: "?", foto: null },
  plano: "gratuito",
  permissoes: {
    bpm: true,
    localizacao: true,
    passos: false,
    rpm: false,
    sono: false,
    relatorios: false,
  },
  pet: null,
  bateria: 0,
  batimentos: [],
  respiracao: [],
  passos: 0,
  sono: 0,
  localizacao: coordenadas,
  notificacoes: [],
  relatorio: null,
};

export function useDashboard() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregar = useCallback(() => {
    setLoading(true);
    setError(null);
    api
      .get("/users/dashboard")
      .then((d) => {
        setData((prev) => ({ ...prev, ...d }));
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return { data, loading, error, recarregar: carregar };
}
