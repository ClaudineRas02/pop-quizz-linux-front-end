import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import PlayerList from "@/features/admin/components/PlayerList";
import { describe, it, expect } from "vitest";

vi.mock("@/features/admin/hooks/usePlayer", () => ({
  usePlayer: () => ({
    isLoading: false,
    error: null,
    players: [
      {
        playerId: 1,
        username: "Ada",
        email: "ada@example.com",
        avatarUrl: "/ada.png",
        createdAt: "2026-01-10",
      },
      {
        playerId: 2,
        username: "Linus",
        email: "linus@example.com",
        avatarUrl: "/linus.png",
        createdAt: "2026-01-11",
      },
    ],
  }),
  useDeletePlayer: () => ({ deletePlayer: vi.fn(), isPending: false }),
}));

vi.mock("react-hot-toast", () => ({
  default: { success: vi.fn(), error: vi.fn() },
}));

describe("PlayerList", () => {
  it("affiche les joueurs et applique la recherche administrateur", () => {
    const { rerender } = render(<PlayerList />);

    expect(screen.getByText("Ada")).toBeInTheDocument();
    expect(screen.getByText("Linus")).toBeInTheDocument();
    expect(screen.getByText(/Total :/)).toHaveTextContent("2 Joueurs");

    rerender(<PlayerList search="linus@example.com" />);
    expect(screen.queryByText("Ada")).not.toBeInTheDocument();
    expect(screen.getByText("Linus")).toBeInTheDocument();
    expect(screen.getByText(/Total :/)).toHaveTextContent("1 Joueur");
  });
});
