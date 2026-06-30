import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ModalAdotarPet from "../modals/ModalAdotarPet/ModalAdotarPet.jsx";

const PET_MOCK = {
  id: "1",
  nome: "Thor",
  idade: "2 anos",
  cidade: "São Paulo, SP",
  img: null,
};

function renderModal(props = {}) {
  const onClose = props.onClose ?? vi.fn();
  return {
    onClose,
    ...render(
      <MemoryRouter>
        <ModalAdotarPet pet={PET_MOCK} onClose={onClose} {...props} />
      </MemoryRouter>
    ),
  };
}

afterEach(() => {
  document.body.style.overflow = "";
});

describe("ModalAdotarPet", () => {
  it("renderiza o nome do pet no formulário", () => {
    renderModal();
    expect(screen.getByText("Thor")).toBeInTheDocument();
  });

  it("renderiza todos os campos obrigatórios", () => {
    renderModal();
    expect(screen.getByLabelText("Seu nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Telefone")).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByLabelText("Tipo de moradia")).toBeInTheDocument();
    expect(screen.getByLabelText("Tem outros pets?")).toBeInTheDocument();
  });

  it("aplica máscara de telefone corretamente", () => {
    renderModal();
    const inputTelefone = screen.getByLabelText("Telefone");
    fireEvent.change(inputTelefone, { target: { value: "11987654321" } });
    expect(inputTelefone.value).toBe("(11) 98765-4321");
  });

  it("exibe tela de sucesso após submeter o formulário", async () => {
    renderModal();

    fireEvent.change(screen.getByLabelText("Seu nome"), {
      target: { value: "João Silva" },
    });
    fireEvent.change(screen.getByLabelText("E-mail"), {
      target: { value: "joao@email.com" },
    });
    fireEvent.change(screen.getByLabelText("Telefone"), {
      target: { value: "11987654321" },
    });
    fireEvent.change(
      screen.getByLabelText(/por que quer adotar/i),
      { target: { value: "Tenho muito amor para dar." } }
    );

    fireEvent.click(screen.getByText("Enviar solicitação de adoção"));

    await waitFor(() => {
      expect(screen.getByText("Solicitação enviada!")).toBeInTheDocument();
    });
  });

  it("chama onClose ao clicar em Fechar na tela de sucesso", async () => {
    const { onClose } = renderModal();

    fireEvent.change(screen.getByLabelText("Seu nome"), { target: { value: "A" } });
    fireEvent.change(screen.getByLabelText("E-mail"), { target: { value: "a@a.com" } });
    fireEvent.change(screen.getByLabelText("Telefone"), { target: { value: "11999999999" } });
    fireEvent.change(screen.getByLabelText(/por que/i), { target: { value: "B" } });
    fireEvent.click(screen.getByText("Enviar solicitação de adoção"));

    await waitFor(() => screen.getByText("Solicitação enviada!"));
    fireEvent.click(screen.getByText("Fechar"));
    expect(onClose).toHaveBeenCalled();
  });
});
