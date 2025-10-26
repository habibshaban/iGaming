import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { SORT_OPTIONS, type SortOption } from "@/constants/filters";

function withParamsUpdate(
  setSearchParams: ReturnType<typeof useSearchParams>[1],
  updater: (p: URLSearchParams) => void
) {
  setSearchParams(
    (prev) => {
      const next = new URLSearchParams(prev);
      updater(next);
      if (next.toString() === prev.toString()) return prev;
      return next;
    },
    { replace: true }
  );
}

function toggleCsvParam(p: URLSearchParams, key: string, id: number) {
  const current = (p.get(key) ?? "").split(",").filter(Boolean);
  const idStr = String(id);

  const has = current.includes(idStr);
  const next = has ? current.filter((x) => x !== idStr) : [...current, idStr];

  if (next.length) p.set(key, next.join(","));
  else p.delete(key);
}

function setOrDelete(p: URLSearchParams, key: string, value: string | undefined | null) {
  if (value && value.length) p.set(key, value);
  else p.delete(key);
}

export const useGameFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    const searchQuery = searchParams.get("search") ?? "";

    const toNumSet = (key: string) =>
      new Set(
        (searchParams.get(key) ?? "")
          .split(",")
          .filter(Boolean)
          .map((x) => Number(x))
          .filter((n) => Number.isFinite(n))
      );

    const selectedProviders = toNumSet("providers");
    const selectedGroups = toNumSet("groups");

    const sortRaw = (searchParams.get("sort") ?? "A-Z") as SortOption;
    const sortOption = SORT_OPTIONS.includes(sortRaw) ? sortRaw : "A-Z";

    const colParsed = Number.parseInt(searchParams.get("columns") ?? "2", 10);
    const columnsCount = Number.isFinite(colParsed) ? Math.min(4, Math.max(1, colParsed)) : 2;

    return { searchQuery, selectedProviders, selectedGroups, sortOption, columnsCount };
  }, [searchParams]);

  const updateSearchQuery = useCallback(
    (query: string) => {
      withParamsUpdate(setSearchParams, (p) => setOrDelete(p, "search", query.trim()));
    },
    [setSearchParams]
  );

  const toggleProvider = useCallback(
    (providerId: number) => {
      withParamsUpdate(setSearchParams, (p) => toggleCsvParam(p, "providers", providerId));
    },
    [setSearchParams]
  );

  const toggleGroup = useCallback(
    (groupId: number) => {
      withParamsUpdate(setSearchParams, (p) => toggleCsvParam(p, "groups", groupId));
    },
    [setSearchParams]
  );

  const setSortOption = useCallback(
    (option: SortOption) => {
      withParamsUpdate(setSearchParams, (p) => p.set("sort", option));
    },
    [setSearchParams]
  );

  const setColumnsCount = useCallback(
    (count: number) => {
      const clamped = Math.min(6, Math.max(1, count));
      withParamsUpdate(setSearchParams, (p) => p.set("columns", String(clamped)));
    },
    [setSearchParams]
  );

  const resetFilters = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.searchQuery.trim() !== "" ||
      filters.selectedProviders.size > 0 ||
      filters.selectedGroups.size > 0 ||
      filters.sortOption !== "A-Z"
    );
  }, [filters]);

  return {
    filters,
    updateSearchQuery,
    toggleProvider,
    toggleGroup,
    setSortOption,
    setColumnsCount,
    resetFilters,
    hasActiveFilters,
  };
};
