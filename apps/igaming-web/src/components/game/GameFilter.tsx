import { useState, memo } from "react";
import SearchInput from "@/components/SearchInput";
import MenuIcon from "@/assets/icons/menu-icon.svg";
import { SORT_OPTIONS, type SortOption } from "@/constants/filters";
import type { Group, Provider } from "igaming-shared";
import FilterSection from "./FilterSection";
import ColumnSelector from "./ColumnSelector";
import FilterFooter from "./FilterFooter";

interface GameFilterProps {
  providers: Provider[];
  gameGroups: Group[];
  gamesCount: number;
  filterHelpers: {
    filters: {
      searchQuery: string;
      selectedProviders: Set<number>;
      selectedGroups: Set<number>;
      sortOption: SortOption;
      columnsCount: number;
    };
    updateSearchQuery: (query: string) => void;
    toggleProvider: (id: number) => void;
    toggleGroup: (id: number) => void;
    setSortOption: (option: SortOption) => void;
    setColumnsCount: (count: number) => void;
    resetFilters: () => void;
    hasActiveFilters: boolean;
  };
}

const GameFilter = memo(({ providers, gameGroups, gamesCount, filterHelpers }: GameFilterProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const {
    filters,
    updateSearchQuery,
    toggleProvider,
    toggleGroup,
    setSortOption,
    setColumnsCount,
    resetFilters,
    hasActiveFilters,
  } = filterHelpers;

  const toggleFilters = () => {
    setShowFilters((v) => !v);
  };

  return (
    <div className="game-filter" role="search" data-open={showFilters}>
      <SearchInput
        placeholder="Search"
        value={filters.searchQuery}
        onChange={(e) => updateSearchQuery(e.target.value)}
      />

      <aside
        className="game-filter__filters"
        data-open={showFilters}
        aria-hidden={!showFilters}
        aria-label="Filter options"
      >
        <FilterSection
          title="Providers"
          items={providers}
          selectedItems={filters.selectedProviders}
          onToggle={toggleProvider}
        />
        <FilterSection
          title="Game groups"
          items={gameGroups}
          selectedItems={filters.selectedGroups}
          onToggle={toggleGroup}
        />
        <FilterSection
          title="Sorting"
          items={SORT_OPTIONS.map((option) => ({ id: option, name: option }))}
          selectedItems={new Set([filters.sortOption])}
          onToggle={(id) => setSortOption(id as SortOption)}
        />
        <ColumnSelector selectedColumn={filters.columnsCount} onSelectColumn={setColumnsCount} />
        <FilterFooter
          gamesCount={gamesCount}
          onReset={resetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </aside>

      <button className="game-filter__button" onClick={toggleFilters} aria-expanded={showFilters}>
        <img src={MenuIcon} alt="" aria-hidden="true" className="game-filter__button-icon" />
        {showFilters ? "Hide filters" : "Show filters"}
      </button>
    </div>
  );
});

GameFilter.displayName = "GameFilter";

export default GameFilter;
