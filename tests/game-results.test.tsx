import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import GameResults from "@/features/game-engine/components/GameResults";
import {describe, it, expect} from "vitest";

vi.mock("@/features/game-engine/services/contest.service", () => ({
  ContestService: {
    getMyLeaderboard: vi.fn().mockResolvedValue({
      rank: 1,
      username: "Ada",
      avatarUrl: "/ada.png",
      correctAnswers: 8,
      wrongAnswers: 2,
      firstBloodCount: 3,
      avgResponseTime: 1.4,
    }),
  },
}));

describe("GameResults", () => {
  it("affiche les statistiques du joueur à la fin du contest", async () => {
    render(
      <MemoryRouter>
        <GameResults gameId={42} score={80} onBackToLobby={vi.fn()} />
      </MemoryRouter>,
    );

    expect(await screen.findByText("Ada")).toBeInTheDocument();
    expect(screen.getByText("80")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("1.4s")).toBeInTheDocument();
    expect(screen.getByText("#1")).toBeInTheDocument();
  });
});
