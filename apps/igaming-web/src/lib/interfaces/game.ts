import type { Game, Provider, Group } from "igaming-shared";

export interface GamesResponse {
  games: Game[];
  groupedGameIds: Set<number>;
}

export interface ProvidersResponse {
  providers: Provider[];
}

export interface GroupsResponse {
  groups: Group[];
}

export type { Game, Provider, Group };
