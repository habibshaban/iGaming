import { apiClient } from "./client";
import type {
  GamesResponse,
  ProvidersResponse,
  GroupsResponse,
  Provider,
  Group,
  Game,
} from "@/lib/interfaces";

export const gamesApi = {
  getGames: async (): Promise<GamesResponse> => {
    const {
      data: { games = [], groupedGameIds = [] },
    } = await apiClient.get<{ games: Game[]; groupedGameIds: number[] }>("/games");
    return {
      games,
      groupedGameIds: new Set(groupedGameIds),
    };
  },

  getProviders: async (): Promise<Provider[]> => {
    const {
      data: { providers = [] },
    } = await apiClient.get<ProvidersResponse>("/providers");
    return providers;
  },

  getGroups: async (): Promise<Group[]> => {
    const {
      data: { groups = [] },
    } = await apiClient.get<GroupsResponse>("/groups");
    return groups;
  },
};
