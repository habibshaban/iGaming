import { describe, it, expect } from "vitest";
import { gamesApi } from "@/lib/api/games";

describe("gamesApi", () => {
  it("fetches games successfully", async () => {
    const result = await gamesApi.getGames();

    expect(result.games).toHaveLength(2);
    expect(result.games[0]).toHaveProperty("id");
    expect(result.games[0]).toHaveProperty("name");
    expect(result.groupedGameIds).toBeInstanceOf(Set);
    expect(result.groupedGameIds.size).toBe(2);
  });

  it("fetches providers successfully", async () => {
    const result = await gamesApi.getProviders();

    expect(result).toHaveLength(2);
    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("name");
    expect(result[0]).toHaveProperty("logo");
  });

  it("fetches groups successfully", async () => {
    const result = await gamesApi.getGroups();

    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("name");
    expect(result[0]).toHaveProperty("games");
    expect(Array.isArray(result[0].games)).toBe(true);
  });
});
