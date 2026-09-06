import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import AddQuizForm from "@/features/admin/components/AddQuizForm";
import { describe, it, expect } from "vitest";

const createQuiz = vi.fn();

vi.mock("@/features/admin/hooks/useQuiz", () => ({
  useCreateQuiz: () => ({ createQuiz }),
}));

vi.mock("react-hot-toast", () => ({
  default: { success: vi.fn(), error: vi.fn() },
}));

describe("AddQuizForm", () => {
  it("envoie les informations du contest créé par l'administrateur", async () => {
    localStorage.setItem("id", "7");
    const user = userEvent.setup();
    render(<AddQuizForm onClose={vi.fn()} />);

    await user.type(screen.getByLabelText("Titre du quiz"), "Quiz Docker");
    const totalQuestions = screen.getByLabelText("Nombre de questions");
    await user.clear(totalQuestions);
    await user.type(totalQuestions, "12");
    await user.click(screen.getByRole("button", { name: "Créer le quiz" }));

    expect(createQuiz).toHaveBeenCalledWith(
      { title: "Quiz Docker", totalQuestions: 12, createdBy: 7 },
      expect.objectContaining({
        onSuccess: expect.any(Function),
        onError: expect.any(Function),
      }),
    );
  });

  it("bloque la création sans titre", async () => {
    const user = userEvent.setup();
    render(<AddQuizForm onClose={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: "Créer le quiz" }));

    expect(
      screen.getByText("Le titre du quiz est obligatoire."),
    ).toBeInTheDocument();
    expect(createQuiz).not.toHaveBeenCalled();
  });
});
