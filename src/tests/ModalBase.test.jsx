import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "../modals/ModalBase/ModalBase.jsx";

function renderModal(props = {}) {
  const onClose = props.onClose ?? vi.fn();
  return {
    onClose,
    ...render(
      <Modal titulo="Título de teste" tituloId="test-titulo" onClose={onClose} {...props}>
        <p>Conteúdo do modal</p>
        <button>Ação</button>
      </Modal>
    ),
  };
}

describe("Modal (ModalBase)", () => {
  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("renderiza o título corretamente", () => {
    renderModal();
    expect(screen.getByText("Título de teste")).toBeInTheDocument();
  });

  it("renderiza os filhos (children)", () => {
    renderModal();
    expect(screen.getByText("Conteúdo do modal")).toBeInTheDocument();
  });

  it("chama onClose ao clicar no botão fechar", () => {
    const { onClose } = renderModal();
    fireEvent.click(screen.getByLabelText("Fechar modal"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("chama onClose ao pressionar Escape", () => {
    const { onClose } = renderModal();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("chama onClose ao clicar no overlay", () => {
    const { onClose } = renderModal();
    const overlay = screen.getByRole("dialog");
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("não chama onClose ao clicar dentro do modal", () => {
    const { onClose } = renderModal();
    fireEvent.click(screen.getByText("Conteúdo do modal"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("bloqueia o scroll do body ao montar", () => {
    renderModal();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("tem atributos de acessibilidade corretos", () => {
    renderModal();
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "test-titulo");
  });

  it("renderiza botão de voltar quando onVoltar é fornecido", () => {
    const onVoltar = vi.fn();
    renderModal({ onVoltar });
    const btnVoltar = screen.getByLabelText("Voltar");
    expect(btnVoltar).toBeInTheDocument();
    fireEvent.click(btnVoltar);
    expect(onVoltar).toHaveBeenCalledOnce();
  });

  it("não renderiza botão de voltar quando onVoltar não é fornecido", () => {
    renderModal();
    expect(screen.queryByLabelText("Voltar")).not.toBeInTheDocument();
  });
});
