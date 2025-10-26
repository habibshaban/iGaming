import { describe, it, expect } from "vitest";
import { filterGames, sortGames, filterAndSortGames } from "@/features/games/utils";
import type { Game, Group } from "@/lib/interfaces";

const mockGames: Game[] = [
  { id: 1, name: "Zeus Strike", provider: 1, date: "2024-01-15" },
  { id: 2, name: "Ancient Egypt", provider: 1, date: "2024-02-20" },
  { id: 3, name: "Book of Ra", provider: 2, date: "2024-01-10" },
  { id: 4, name: "Wild West", provider: 2, date: "2024-03-05" },
  { id: 5, name: "Aztec Gold", provider: 3, date: "2024-01-25" },
];

const mockGroups: Group[] = [
  { id: 1, name: "Popular", games: [1, 2, 3] },
  { id: 2, name: "New", games: [4, 5] },
];

const mockGroupedGameIds = new Set([1, 2, 3, 4, 5]);

describe("filterGames", () => {
  it("returns only grouped games when no filters applied", () => {
    const filters = {
      searchQuery: "",
      selectedProviders: new Set<number>(),
      selectedGroups: new Set<number>(),
      sortOption: "A-Z" as const,
      columnsCount: 2,
    };

    const result = filterGames(mockGames, filters, mockGroups, mockGroupedGameIds);
    expect(result).toHaveLength(5);
  });

  it("filters games by search query", () => {
    const filters = {
      searchQuery: "zeus",
      selectedProviders: new Set<number>(),
      selectedGroups: new Set<number>(),
      sortOption: "A-Z" as const,
      columnsCount: 2,
    };

    const result = filterGames(mockGames, filters, mockGroups, mockGroupedGameIds);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Zeus Strike");
  });

  it("filters games by provider", () => {
    const filters = {
      searchQuery: "",
      selectedProviders: new Set([1]),
      selectedGroups: new Set<number>(),
      sortOption: "A-Z" as const,
      columnsCount: 2,
    };

    const result = filterGames(mockGames, filters, mockGroups, mockGroupedGameIds);
    expect(result).toHaveLength(2);
    expect(result.every((game) => game.provider === 1)).toBe(true);
  });

  it("filters games by group", () => {
    const filters = {
      searchQuery: "",
      selectedProviders: new Set<number>(),
      selectedGroups: new Set([1]),
      sortOption: "A-Z" as const,
      columnsCount: 2,
    };

    const result = filterGames(mockGames, filters, mockGroups, mockGroupedGameIds);
    expect(result).toHaveLength(3);
    expect(result.map((g) => g.id)).toEqual([1, 2, 3]);
  });

  it("combines multiple filters", () => {
    const filters = {
      searchQuery: "ancient",
      selectedProviders: new Set([1]),
      selectedGroups: new Set([1]),
      sortOption: "A-Z" as const,
      columnsCount: 2,
    };

    const result = filterGames(mockGames, filters, mockGroups, mockGroupedGameIds);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Ancient Egypt");
  });
});

describe("sortGames", () => {
  it("sorts games A-Z", () => {
    const result = sortGames(mockGames, "A-Z");
    expect(result[0].name).toBe("Ancient Egypt");
    expect(result[result.length - 1].name).toBe("Zeus Strike");
  });

  it("sorts games Z-A", () => {
    const result = sortGames(mockGames, "Z-A");
    expect(result[0].name).toBe("Zeus Strike");
    expect(result[result.length - 1].name).toBe("Ancient Egypt");
  });

  it("sorts games by newest", () => {
    const result = sortGames(mockGames, "Newest");
    expect(result[0].name).toBe("Wild West");
    expect(result[result.length - 1].name).toBe("Book of Ra");
  });
});

describe("filterAndSortGames", () => {
  it("returns empty array when games undefined", () => {
    const filters = {
      searchQuery: "",
      selectedProviders: new Set<number>(),
      selectedGroups: new Set<number>(),
      sortOption: "A-Z" as const,
      columnsCount: 2,
    };

    const result = filterAndSortGames(undefined, filters, mockGroups, mockGroupedGameIds);
    expect(result).toEqual([]);
  });

  it("filters and sorts games", () => {
    const filters = {
      searchQuery: "",
      selectedProviders: new Set([1, 2]),
      selectedGroups: new Set<number>(),
      sortOption: "Z-A" as const,
      columnsCount: 2,
    };

    const result = filterAndSortGames(mockGames, filters, mockGroups, mockGroupedGameIds);
    expect(result).toHaveLength(4);
    expect(result[0].name).toBe("Zeus Strike");
    expect(result[result.length - 1].name).toBe("Ancient Egypt");
  });
});
