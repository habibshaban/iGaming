import { z } from "zod";

export const ProviderSchema = z.object({
  id: z.number(),
  name: z.string(),
  logo: z.string(),
});

export const GameSchema = z.object({
  id: z.number(),
  name: z.string(),
  provider: z.number(),
  cover: z.string().optional(),
  coverLarge: z.string().optional(),
  date: z.string(), // ISO
});

export const GroupSchema = z.object({
  id: z.number(),
  name: z.string(),
  games: z.array(z.number()),
});

export const DataSchema = z.object({
  games: z.array(GameSchema),
  providers: z.array(ProviderSchema),
  groups: z.array(GroupSchema),
});
export type DataShape = z.infer<typeof DataSchema>;
