import type { Repo } from "../data/repo.js";
import type { Game, Provider, Group } from "igaming-shared";

export type GameService = {
  getGames: () => { games: Game[]; groupedGameIds: Set<number> };
  getProviders: () => Provider[];
  getGroups: () => Group[];
};

export function createGameService(repo: Repo): GameService {
  return {
    getGames: () => {
      return {
        games: repo.games,
        groupedGameIds: repo.groupedGameIds,
      };
    },
    getProviders: () => repo.providers,
    getGroups: () => repo.groups,
  };
}
