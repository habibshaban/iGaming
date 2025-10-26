import type { DataShape, Provider, Group, Game } from "igaming-shared";

export interface Repo {
  games: Game[];
  providers: Provider[];
  groups: Group[];
  groupedGameIds: Set<number>;
  providerById: Map<number, Provider>;
}

export function buildRepo(data: DataShape): Repo {
  const groupedGameIds = new Set<number>();
  for (const grp of data.groups) {
    for (const id of grp.games) groupedGameIds.add(id);
  }

  const providerById = new Map<number, Provider>(data.providers.map((p) => [p.id, p]));

  const groupedCount = data.games.reduce((acc, g) => acc + (groupedGameIds.has(g.id) ? 1 : 0), 0);
  console.log(`Repository built: ${groupedCount}/${data.games.length} games are in groups`);

  return {
    games: data.games,
    providers: data.providers,
    groups: data.groups,
    groupedGameIds,
    providerById,
  };
}

export const isGameGrouped = (repo: Repo, gameId: number) => repo.groupedGameIds.has(gameId);
