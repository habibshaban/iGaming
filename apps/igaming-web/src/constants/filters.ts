export const SORT_OPTIONS = ["A-Z", "Z-A", "Newest"] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];
