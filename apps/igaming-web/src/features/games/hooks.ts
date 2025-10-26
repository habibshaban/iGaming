import { useSuspenseQuery } from "@tanstack/react-query";
import { gamesApi } from "@/lib/api/games";
import type { Provider, Group, GamesResponse } from "@/lib/interfaces";

export const GAMES_KEY = ["games"];
export const PROVIDERS_KEY = ["providers"];
export const GROUPS_KEY = ["groups"];

export const useGames = () => {
  return useSuspenseQuery<GamesResponse>({
    queryKey: GAMES_KEY,
    queryFn: gamesApi.getGames,
  });
};

export const useProviders = () => {
  return useSuspenseQuery<Provider[]>({
    queryKey: PROVIDERS_KEY,
    queryFn: gamesApi.getProviders,
  });
};

export const useGroups = () => {
  return useSuspenseQuery<Group[]>({
    queryKey: GROUPS_KEY,
    queryFn: gamesApi.getGroups,
  });
};
