import type { Game, Group } from "@/lib/interfaces";
import type { SortOption } from "@/constants/filters";
import type { GameFilters } from "./types";

const normalizeString = (str: string): string => {
  return str.toLowerCase().trim();
};

export const filterGames = (
  games: Game[],
  filters: GameFilters,
  groups: Group[],
  groupedGameIds: Set<number>
): Game[] => {
  const { searchQuery, selectedProviders, selectedGroups } = filters;

  if (!searchQuery && selectedProviders.size === 0 && selectedGroups.size === 0) {
    return games.filter((game) => groupedGameIds.has(game.id));
  }

  const normalizedQuery = normalizeString(searchQuery);

  let groupFilteredGameIds: Set<number> | null = null;
  if (selectedGroups.size > 0) {
    groupFilteredGameIds = new Set<number>();
    groups.forEach((group) => {
      if (selectedGroups.has(group.id)) {
        group.games.forEach((gameId) => groupFilteredGameIds!.add(gameId));
      }
    });
  } // O(n^2)

  return games.filter((game) => {
    if (!groupedGameIds.has(game.id)) return false;

    if (normalizedQuery && !normalizeString(game.name).includes(normalizedQuery)) {
      return false;
    }

    if (selectedProviders.size > 0 && !selectedProviders.has(game.provider)) {
      return false;
    }

    if (groupFilteredGameIds && !groupFilteredGameIds.has(game.id)) {
      return false;
    }

    return true;
  });
};

export const sortGames = (games: Game[], sortOption: SortOption): Game[] => {
  const gamesCopy = [...games];
  switch (sortOption) {
    case "A-Z":
      return gamesCopy.sort((a, b) => a.name.localeCompare(b.name));
    case "Z-A":
      return gamesCopy.sort((a, b) => b.name.localeCompare(a.name));
    case "Newest":
      return gamesCopy.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });
    default:
      return gamesCopy;
  }
};

export const filterAndSortGames = (
  games: Game[] | undefined,
  filters: GameFilters,
  groups: Group[],
  groupedGameIds: Set<number>
): Game[] => {
  if (!games) return [];
  const filtered = filterGames(games, filters, groups, groupedGameIds);
  const sorted = sortGames(filtered, filters.sortOption);
  return sorted;
};
