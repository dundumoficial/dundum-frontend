import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig.js";
import { setTokenGetter } from "../services/api.js";
import { api } from "../services/api.js";
import { useTema } from "./ThemeContext.jsx";

const BASE_URL = import.meta.env.VITE_API_URL;
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

const AuthContext = createContext(null);

const TOKEN_KEY = "dundum_token";

function salvarToken(token) {
  if (token) sessionStorage.setItem(TOKEN_KEY, token);
  else sessionStorage.removeItem(TOKEN_KEY);
}

function lerToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function AuthProvider({ children }) {
  const accessTokenRef = useRef(lerToken());
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const { inicializarTema } = useTema();

  // registra o getter no api.js para que todas as chamadas incluam o token
  useEffect(() => {
    setTokenGetter(() => accessTokenRef.current);
  }, []);

  // salva sessão no estado
  const salvarSessao = useCallback(
    (dadosUsuario, token) => {
      accessTokenRef.current = token;
      salvarToken(token);
      setUsuario(dadosUsuario);
      // aplica o tema vindo do servidor imediatamente
      if (dadosUsuario?.tema) {
        inicializarTema(dadosUsuario.tema);
      }
    },
    [inicializarTema],
  );

  // verifica sessão existente ao montar
  useEffect(() => {
    const token = lerToken();
    if (!token) {
      setCarregando(false);
      return;
    }

    // verifica se o token ainda é válido no backend
    fetch(`${BASE_URL}/users/verificar-sessao`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Sessão inválida");
        return res.json();
      })
      .then((data) => {
        const dadosUsuario = data.usuario ?? data;
        if (dadosUsuario?.id) {
          accessTokenRef.current = token;
          const usuarioFormatado = {
            id: dadosUsuario.id,
            nome: dadosUsuario.nome,
            email: dadosUsuario.email,
            foto: dadosUsuario.foto,
            telefone: dadosUsuario.telefone,
            iniciais: dadosUsuario.nome?.charAt(0).toUpperCase() ?? "U",
            plano: dadosUsuario.plano ?? "gratuito",
            tema: dadosUsuario.tema ?? "claro",
            temSenha: data.temSenha ?? true,
            loginGoogle: data.temSenha === false,
          };
          setUsuario(usuarioFormatado);
          if (dadosUsuario.tema) inicializarTema(dadosUsuario.tema);
        }
      })
      .catch(() => {
        salvarToken(null);
        accessTokenRef.current = null;
      })
      .finally(() => setCarregando(false));
  }, []);

  // se o usuário sair da conta Google externamente, desloga aqui também
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      if (!fbUser && usuario?.loginGoogle) {
        accessTokenRef.current = null;
        salvarToken(null);
        setUsuario(null);
      }
    });
    return unsub;
  }, [usuario]);

  // login com e-mail e senha
  const loginEmail = useCallback(
    async (email, senha, lembrarMe = false) => {
      const res = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha, lembrarMe }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erro ao fazer login");
      }

      const data = await res.json();
      salvarSessao(
        {
          id: data.id,
          nome: data.nome,
          email: data.email,
          foto: data.foto,
          telefone: data.telefone,
          iniciais: data.nome?.charAt(0).toUpperCase() ?? "U",
          plano: data.plano ?? "gratuito",
          tema: data.tema ?? "claro",
          temSenha: data.temSenha ?? true,
          loginGoogle: data.temSenha === false,
        },
        data.token,
      );
      return data;
    },
    [salvarSessao],
  );

  // login com Google
  const loginGoogle = useCallback(async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const fbUser = result.user;

    const res = await fetch(`${BASE_URL}/users/login/social`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: fbUser.displayName,
        email: fbUser.email,
        foto: fbUser.photoURL,
      }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Erro ao fazer login com Google");
    }

    const data = await res.json();
    salvarSessao(
      {
        id: data.id,
        nome: data.nome,
        email: data.email,
        foto: data.foto,
        telefone: data.telefone,
        iniciais: data.nome?.charAt(0).toUpperCase() ?? "U",
        plano: data.plano ?? "gratuito",
        tema: data.tema ?? "claro",
        temSenha: data.temSenha ?? true,
        loginGoogle: data.temSenha === false,
      },
      data.token,
    );
    return data;
  }, [salvarSessao]);

  // cadastro com e-mail
  const cadastrarComCodigo = useCallback(
    async (nome, email, senha, codigo) => {
      const res = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha, codigo }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erro ao criar conta");
      }

      const data = await res.json();
      salvarSessao(
        {
          id: data.id,
          nome: data.nome,
          email: data.email,
          foto: data.foto ?? null,
          telefone: data.telefone ?? null,
          iniciais: data.nome?.charAt(0).toUpperCase() ?? "U",
          plano: data.plano ?? "gratuito",
          tema: data.tema ?? "claro",
          temSenha: data.temSenha ?? true,
          loginGoogle: data.temSenha === false,
        },
        data.token,
      );
      return data;
    },
    [salvarSessao],
  );

  // enviar código de verificação
  const enviarCodigoCadastro = useCallback(async (nome, email) => {
    const res = await fetch(`${BASE_URL}/users/enviar-codigo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Erro ao enviar código");
    }
    return res.json();
  }, []);

  // recuperação de senha
  const recuperarSenha = useCallback(async (email) => {
    const res = await fetch(`${BASE_URL}/users/recuperar-senha`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Erro ao enviar e-mail");
    }
  }, []);

  // altera plano no backend e atualiza o estado local
  const alterarPlano = useCallback(async (planoId) => {
    const data = await api.patch("/users/plano", { plano_id: planoId });
    setUsuario((prev) => (prev ? { ...prev, plano: data.plano } : prev));
    return data;
  }, []);

  // atualiza dados pessoais do usuário
  const atualizarUsuario = useCallback(async (dados) => {
    const data = await api.patch("/users/perfil", dados);
    setUsuario((prev) =>
      prev
        ? {
            ...prev,
            nome: data.nome ?? prev.nome,
            email: data.email ?? prev.email,
            foto: data.foto ?? prev.foto,
            telefone:
              data.telefone !== undefined ? data.telefone : prev.telefone,
            iniciais:
              (data.nome ?? prev.nome)?.charAt(0).toUpperCase() ??
              prev.iniciais,
          }
        : prev,
    );
    return data;
  }, []);

  // altera senha do usuário autenticado
  const alterarSenha = useCallback(async (senhaAtual, novaSenha) => {
    return api.patch("/users/senha", { senhaAtual, novaSenha });
  }, []);

  // logout
  const logout = useCallback(async () => {
    const token = accessTokenRef.current;

    if (token) {
      try {
        await fetch(`${BASE_URL}/users/logout`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {
        // ignora falha de rede no logout
      }
    }

    try {
      await signOut(auth);
    } catch {
      // ignora
    }

    accessTokenRef.current = null;
    salvarToken(null);
    setUsuario(null);
  }, []);

  const autenticado = Boolean(usuario && accessTokenRef.current);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        autenticado,
        carregando,
        loginEmail,
        loginGoogle,
        cadastrarComCodigo,
        enviarCodigoCadastro,
        recuperarSenha,
        alterarPlano,
        atualizarUsuario,
        alterarSenha,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  return ctx;
}
