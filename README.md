<div align="center">
  <img width="1584" height="262" alt="DunDum Banner" src="https://github.com/user-attachments/assets/ff2cced0-4fb6-4d3f-8fe4-ef475bfec573" />
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
│   │   ├── DashboardTransition/
│   │   ├── Footer/
│   │   └── Header/
│   ├── config/
│   │   └── firebaseConfig.js
│   ├── hooks/
│   │   ├── useDashboard.js
│   │   └── useScrollToTop.js
│   ├── modals/
│   │   ├── ModalBase/
│   │   ├── ModalCompra/
│   │   ├── ModalConfiguracoes/
│   │   ├── ModalConfirmarEmail/
│   │   ├── ModalNotificacoes/
│   │   ├── ModalPerfil/
│   │   ├── ModalPet/
│   │   ├── ModalPlano/
│   │   └── ModalRecuperarSenha/
│   ├── pages/
│   │   ├── Cadastro/
│   │   ├── CentralDeAjuda/
│   │   ├── Comunidade/
│   │   ├── Dashboard/
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── NovaSenha/
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
    <td><code>/sobrenos</code></td>
    <td>Equipe, Missão, visão e valores da DunDum</td>
  </tr>
  <tr>
    <td>👥 Comunidade</td>
    <td><code>/comunidade</code></td>
    <td>Veterinários parceiros e pets para adoção</td>
  </tr>
  <tr>
    <td>❓ Central de Ajuda</td>
    <td><code>/centraldeajuda</code></td>
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
git clone https://github.com/dundumoficial/dundum-frontend.git
cd dundum-frontend

# Instale as dependências
npm install

# Rode o projeto
npm run dev
```

Acesse em: `http://localhost:5173`

### Rodar os testes

```bash
# Executa os testes uma única vez
npm run test:run

# Executa os testes em modo watch
npm run test

# Gera o relatório de cobertura
npm run test:coverage
```

## Como fazer um Pull Request

### 1. Acesse a branch `development`

```bash
git checkout development
git pull origin development
```

### 2. Faça suas alterações e commits

```bash
# Adicione os arquivos modificados
git add .

# Crie um commit com mensagem clara
git commit -m "feat: adiciona componente de notificação"
```

> **Boas práticas de commit:**
>
> - Escreva mensagens no imperativo e em minúsculas
> - Seja objetivo: descreva _o que_ foi feito, não _como_
> - Prefira commits pequenos e focados em uma única mudança

> **Padrão de nomenclatura:**
>
> - `feat` — nova funcionalidade
> - `fix` — correção de bug
> - `style` — ajustes visuais ou de CSS
> - `refactor` — refatoração de código
> - `docs` — atualização de documentação

### 3. Envie as alterações para o repositório remoto

```bash
git push origin development
```

### 4. Abra o Pull Request no GitHub

1. Acesse o repositório em [github.com/dundumoficial/dundum-frontend](https://github.com/dundumoficial/dundum-frontend)
2. Clique em **"Compare & pull request"**
3. Certifique-se de que o PR está apontando de `development` → `development`
4. Preencha o PR com:
   - **Título** claro e objetivo
   - **Descrição** explicando o que foi alterado e o motivo
   - **Screenshots** (se houver mudanças visuais)
5. Solicite revisão de pelo menos um membro da equipe
6. Clique em **"Create pull request"**

---

<img width="100%" src="https://capsule-render.vercel.app/api?type=rect&height=4&color=454ade" />

<p align="center"><sub>© 2026 DunDum</sub></p>
