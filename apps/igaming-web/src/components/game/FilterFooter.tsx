import { memo } from "react";

interface FilterFooterProps {
  gamesCount: number;
  onReset: () => void;
  hasActiveFilters: boolean;
}

const FilterFooter = memo(({ gamesCount, onReset, hasActiveFilters }: FilterFooterProps) => {
  return (
    <div className="game-filter__footer">
      <div aria-live="polite" className="sr-only">
        Showing {gamesCount} games
      </div>
      <div className="game-filter__count">Games amount: {gamesCount}</div>
      <button
        className="game-filter__reset"
        onClick={onReset}
        disabled={!hasActiveFilters}
        style={{
          opacity: hasActiveFilters ? 1 : 0.5,
          cursor: hasActiveFilters ? "pointer" : "not-allowed",
        }}
      >
        Reset
      </button>
    </div>
  );
});

FilterFooter.displayName = "FilterFooter";

export default FilterFooter;
