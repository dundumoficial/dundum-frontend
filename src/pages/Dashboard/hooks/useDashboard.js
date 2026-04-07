import { useState, useEffect } from "react";
import {
  mockUsuario,
  mockPet,
  mockBatimentos,
  mockRespiracao,
  mockPassos,
  mockSono,
  mockRelatorio,
  mockNotificacoes,
  mockEstadoEmocional,
  mockBateria,
  mockPetPos,
} from "../data/mockData";

// substituir "fetcher" por api.get(url)
function useFetch(fetcher) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    Promise.resolve(fetcher())
      .then((d) => {
        if (!cancelled) {
          setData(d);
          setLoading(false);
        }
      })

      .catch((e) => {
        if (!cancelled) {
          setError(e);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []); // eslint-disable-line

  return { data, loading, error };
}

// trocar o mock pelo fetch real
// Ex: useFetch(() => api.get("/usuario"))
export const useUsuario = () => useFetch(() => mockUsuario);
export const usePet = () => useFetch(() => mockPet);
export const useBatimentos = () => useFetch(() => mockBatimentos);
export const useRespiracao = () => useFetch(() => mockRespiracao);
export const usePassos = () => useFetch(() => mockPassos);
export const useSono = () => useFetch(() => mockSono);
export const useRelatorio = () => useFetch(() => mockRelatorio);
export const useNotificacoes = () => useFetch(() => mockNotificacoes);
export const useEstadoEmocional = () => useFetch(() => mockEstadoEmocional);
export const useBateria = () => useFetch(() => mockBateria);
export const usePetPos = () => useFetch(() => mockPetPos);
