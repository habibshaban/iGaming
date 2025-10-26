import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import type { Game, Provider, Group } from "@/lib/interfaces";

const mockGames: Game[] = [
  { id: 1, name: "Game 1", provider: 1, date: "2024-01-15" },
  { id: 2, name: "Game 2", provider: 2, date: "2024-02-20" },
];

const mockProviders: Provider[] = [
  { id: 1, name: "Provider 1", logo: "logo1.png" },
  { id: 2, name: "Provider 2", logo: "logo2.png" },
];

const mockGroups: Group[] = [{ id: 1, name: "Popular", games: [1, 2] }];

export const handlers = [
  http.get("*/games", () => {
    return HttpResponse.json({
      games: mockGames,
      groupedGameIds: [1, 2],
    });
  }),

  http.get("*/providers", () => {
    return HttpResponse.json({
      providers: mockProviders,
    });
  }),

  http.get("*/groups", () => {
    return HttpResponse.json({
      groups: mockGroups,
    });
  }),
];

export const server = setupServer(...handlers);
