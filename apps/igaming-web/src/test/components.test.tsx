import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import GameList from "@/components/game/GameList";
import type { Game } from "@/lib/interfaces";

const mockGames: Game[] = [
  { id: 1, name: "Game One", provider: 1, date: "2024-01-15", cover: "cover1.jpg" },
  { id: 2, name: "Game Two", provider: 2, date: "2024-02-20" },
];

describe("GameList", () => {
  it("renders games", () => {
    render(<GameList games={mockGames} />);

    expect(screen.getByAltText("Game One")).toBeInTheDocument();
    expect(screen.getByText("Game Two")).toBeInTheDocument();
  });

  it("renders empty grid when no games", () => {
    const { container } = render(<GameList games={[]} />);
    const grid = container.querySelector(".games-grid");

    expect(grid).toBeInTheDocument();
    expect(grid?.children).toHaveLength(0);
  });
});
