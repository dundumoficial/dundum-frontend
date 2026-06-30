const BASE_URL = import.meta.env.VITE_API_URL;

let _getToken = () => sessionStorage.getItem("dundum_token");

export function setTokenGetter(fn) {
  _getToken = fn;
}

function buildHeaders() {
  const token = _getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function handleResponse(res) {
  if (!res.ok) {
    let message = `Erro ${res.status}`;
    try {
      const body = await res.json();
      message = body.message || body.error || message;
    } catch {
      // body não era JSON, mantém mensagem genérica
    }
    throw new Error(message);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  get(path) {
    return fetch(`${BASE_URL}${path}`, {
      headers: buildHeaders(),
      credentials: "include",
    }).then(handleResponse);
  },

  post(path, body) {
    return fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: buildHeaders(),
      credentials: "include",
      body: JSON.stringify(body),
    }).then(handleResponse);
  },

  put(path, body) {
    return fetch(`${BASE_URL}${path}`, {
      method: "PUT",
      headers: buildHeaders(),
      credentials: "include",
      body: JSON.stringify(body),
    }).then(handleResponse);
  },

  patch(path, body) {
    return fetch(`${BASE_URL}${path}`, {
      method: "PATCH",
      headers: buildHeaders(),
      credentials: "include",
      body: JSON.stringify(body),
    }).then(handleResponse);
  },

  delete(path) {
    return fetch(`${BASE_URL}${path}`, {
      method: "DELETE",
      headers: buildHeaders(),
      credentials: "include",
    }).then(handleResponse);
  },

  upload(path, body) {
    const token = _getToken();
    return fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
      body: body,
    }).then(handleResponse);
  },
};
