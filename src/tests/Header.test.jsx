import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../components/Header/Header.jsx";

vi.mock("../../assets/img/logo-azul.webp", () => ({ default: "logo.webp" }));
vi.mock("../../assets/img/user.svg", () => ({ default: "user.svg" }));
vi.mock("../../assets/img/menu.svg", () => ({ default: "menu.svg" }));
vi.mock("../../assets/img/close.svg", () => ({ default: "close.svg" }));

function renderHeader() {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );
}

describe("Header (não autenticado)", () => {
  it("renderiza os links de navegação na nav principal", () => {
    renderHeader();

    const navPrincipal = document.querySelector(
      "nav[aria-label='Navegação principal']",
    );

    expect(navPrincipal).not.toBeNull();

    const { getByText } = within(navPrincipal);
    expect(getByText("Início")).toBeInTheDocument();
    expect(getByText("Produtos")).toBeInTheDocument();
    expect(getByText("Sobre Nós")).toBeInTheDocument();
    expect(getByText("Comunidade")).toBeInTheDocument();
    expect(getByText("Central de Ajuda")).toBeInTheDocument();
  });

  it("renderiza o link de login/cadastro", () => {
    renderHeader();
    expect(screen.getByLabelText(/entrar ou cadastrar/i)).toBeInTheDocument();
  });

  it("abre o menu mobile ao clicar no hamburger", () => {
    renderHeader();
    const btnMenu = screen.getByLabelText("Abrir menu");
    fireEvent.click(btnMenu);
    expect(btnMenu).toHaveAttribute("aria-expanded", "true");
  });

  it("fecha o menu mobile ao clicar no botão fechar", () => {
    renderHeader();
    fireEvent.click(screen.getByLabelText("Abrir menu"));
    fireEvent.click(screen.getByLabelText("Fechar menu"));
    expect(screen.getByLabelText("Abrir menu")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("tem role='banner' no elemento header", () => {
    renderHeader();
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("tem nav com aria-label 'Navegação principal'", () => {
    renderHeader();
    const nav = document.querySelector("nav[aria-label='Navegação principal']");
    expect(nav).not.toBeNull();
  });
});
