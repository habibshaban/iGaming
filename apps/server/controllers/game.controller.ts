import type { RequestHandler } from "express";
import type { GameService } from "../services/game.service.js";

type GameControllerType = {
  getGames: RequestHandler;
  getProviders: RequestHandler;
  getGroups: RequestHandler;
};

export function GameController(gameService: GameService): GameControllerType {
  const getGames: RequestHandler = (_req, res) => {
    const { games, groupedGameIds } = gameService.getGames();
    res.json({
      games,
      groupedGameIds: Array.from(groupedGameIds),
    });
  };

  const getProviders: RequestHandler = (_req, res) => {
    const providers = gameService.getProviders();
    res.json({ providers });
  };

  const getGroups: RequestHandler = (_req, res) => {
    const groups = gameService.getGroups();
    res.json({ groups });
  };

  return { getGames, getProviders, getGroups };
}
