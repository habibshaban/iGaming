import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  DataSchema,
  type DataShape,
  type Provider,
  type Group,
  tryParseJson,
} from "igaming-shared";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type DataIndexes = {
  allowedGameIds: Set<number>;
  gameIdToGroupIds: Map<number, number[]>;
  providerById: Map<number, Provider>;
  groupById: Map<number, Group>;
};

export type DataStore = {
  data: DataShape;
  indexes: DataIndexes;
};

let cache: DataStore | null = null;

export async function loadData(
  filePath = path.resolve(__dirname, "data.json")
): Promise<DataStore> {
  if (cache) return cache;

  const raw = await fs.readFile(filePath, "utf8");
  const json = tryParseJson(raw);

  const parsed = DataSchema.safeParse(json);
  if (!parsed.success) {
    throw new Error("data.json failed schema validation");
  }

  const data = parsed.data;
  const indexes = buildIndexes(data);

  cache = { data, indexes };
  console.log(
    `Loaded ${data.games.length} games, ${data.providers.length} providers, ${data.groups.length} groups`
  );
  return cache;
}

export function buildIndexes(data: DataShape): DataIndexes {
  const providerById = new Map(data.providers.map((p) => [p.id, p]));
  const groupById = new Map(data.groups.map((g) => [g.id, g]));

  const gameIdToGroupIds = new Map<number, number[]>();
  for (const grp of data.groups) {
    for (const gameId of grp.games) {
      const list = gameIdToGroupIds.get(gameId);
      if (list) list.push(grp.id);
      else gameIdToGroupIds.set(gameId, [grp.id]);
    }
  }

  const allowedGameIds = new Set(gameIdToGroupIds.keys());
  return { allowedGameIds, gameIdToGroupIds, providerById, groupById };
}
