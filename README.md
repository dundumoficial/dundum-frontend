<div align="center">
  <img width="1584" height="262" alt="DunDum Banner" src="https://github.com/user-attachments/assets/862c5f4e-2952-4a41-9068-715fd53e47e8" />
</div>

<img width="100%" src="https://capsule-render.vercel.app/api?type=rect&height=4&color=454ade" />

<br/>

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=soft&height=120&color=454ade&text=DunDum%20Front-End&fontColor=FFFFFF&fontSize=42&fontAlignY=60&animation=fadeIn" width="60%" />
</div>

<br/>

<div align="center">

![React](https://img.shields.io/badge/React-454ade?style=flat-square&logo=react&logoColor=white&labelColor=1b1f3b)
![TypeScript](https://img.shields.io/badge/TypeScript-454ade?style=flat-square&logo=typescript&logoColor=white&labelColor=1b1f3b)
![JavaScript](https://img.shields.io/badge/JavaScript-454ade?style=flat-square&logo=javascript&logoColor=white&labelColor=1b1f3b)

</div>

<br/>

<img width="100%" src="https://capsule-render.vercel.app/api?type=rect&height=4&color=454ade" />

<br/>

## 📁 Estrutura do Projeto

```
dundum-frontend/
├── public/
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── img/
│   │   └── videos/
│   ├── components/
│   │   ├── Footer/
│   │   └── Header/
│   ├── modals/
│   │   ├── NovaSenha/
│   │   └── RecuperarSenha/
│   ├── pages/
│   │   ├── Cadastro/
│   │   ├── CentralDeAjuda/
│   │   ├── Comunidade/
│   │   ├── Dashboard/
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── Produtos/
│   │   └── SobreNos/
│   ├── routes/
│   │   ├── PrivateRoute.jsx
│   │   └── Router.jsx
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── .env
└── package.json
```

---

## 🖥️ Páginas

<table>
  <tr>
    <th>Página</th>
    <th>Rota</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td>🏠 Home</td>
    <td><code>/</code></td>
    <td>Página principal com apresentação da DunDum e CTA</td>
  </tr>
  <tr>
    <td>🛍️ Produtos</td>
    <td><code>/produtos</code></td>
    <td>Apresentação da coleira inteligente e planos</td>
  </tr>
  <tr>
    <td>🐾 Sobre nós</td>
    <td><code>/sobre</code></td>
    <td>Missão, visão, valores e equipe</td>
  </tr>
  <tr>
    <td>👥 Comunidade</td>
    <td><code>/comunidade</code></td>
    <td>Fórum e troca de experiências entre tutores</td>
  </tr>
  <tr>
    <td>❓ Central de Ajuda</td>
    <td><code>/ajuda</code></td>
    <td>FAQ e suporte ao usuário</td>
  </tr>
  <tr>
    <td>🔐 Login / Cadastro</td>
    <td><code>/login</code> · <code>/cadastro</code></td>
    <td>Autenticação e criação de conta</td>
  </tr>
  <tr>
    <td>📊 Dashboard</td>
    <td><code>/dashboard</code></td>
    <td>Monitoramento de sinais vitais, localização e alertas do pet</td>
  </tr>
</table>

---

## ⚙️ Como rodar localmente

### Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

> **Windows:** é necessário liberar a execução de scripts no PowerShell. Abra o PowerShell como administrador e execute:
>
> ```powershell
> Set-ExecutionPolicy RemoteSigned
> ```

### Instalação

```bash
# Clone o repositório
git clone https://github.com/dundum-frontend/dundum-frontend.git
cd dundum-frontend

# Instale as dependências
npm install

# Rode o projeto
npm run dev
```

Acesse em: `http://localhost:5173`

<img width="100%" src="https://capsule-render.vercel.app/api?type=rect&height=4&color=454ade" />

<p align="center"><sub>© 2026 DunDum</sub></p>
