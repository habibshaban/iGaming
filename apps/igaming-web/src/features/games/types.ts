import type { SortOption } from "@/constants/filters";

export interface GameFilters {
  searchQuery: string;
  selectedProviders: Set<number>;
  selectedGroups: Set<number>;
  sortOption: SortOption;
  columnsCount: number;
}
