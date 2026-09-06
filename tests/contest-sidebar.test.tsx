import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import ContestSidebar from "@/features/game-engine/components/ContestSidebar";
import { describe, it, expect } from "vitest";

const join = vi.fn();

vi.mock("@/features/game-engine/hooks/useContest", () => ({
  useContests: () => ({
    contests: [
      {
        gameId: 42,
        title: "Quiz Linux créé",
        status: "waiting",
        totalQuestions: 10,
      },
    ],
  }),
  useJoinContest: () => ({ join }),
}));

vi.mock("@/features/game-engine/context/ContestContext", () => ({
  useContestContext: () => ({ joinedContest: null, setJoinedContest: vi.fn() }),
}));

describe("ContestSidebar", () => {
  it("affiche un contest créé et permet au joueur de le rejoindre", () => {
    render(<ContestSidebar />);

    expect(screen.getByText("Quiz Linux créé")).toBeInTheDocument();
    expect(screen.getByText("En attente")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Rejoindre" })).toBeEnabled();
  });
});
