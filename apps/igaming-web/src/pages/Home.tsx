import { Suspense } from "react";
import { useGames, useGroups, useProviders } from "@/features/games";
import { useGameFilters } from "@/features/games/use-game-filters";
import { filterAndSortGames } from "@/features/games/utils";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { useMemo } from "react";

import GameList from "@/components/game/GameList";
import GameFilter from "@/components/game/GameFilter";
import LoadingFallback from "@/components/LoadingFallback";

const HomeContent = () => {
  const { data } = useGames();
  const { data: providers = [] } = useProviders();
  const { data: gameGroups = [] } = useGroups();

  const filterHelpers = useGameFilters();
  const { filters } = filterHelpers;

  const debouncedSearchQuery = useDebounce(filters.searchQuery, 300);

  const debouncedFilters = useMemo(
    () => ({ ...filters, searchQuery: debouncedSearchQuery }),
    [filters, debouncedSearchQuery]
  );

  const filteredGames = useMemo(
    () =>
      filterAndSortGames(
        data?.games,
        debouncedFilters,
        gameGroups,
        data?.groupedGameIds ?? new Set()
      ),
    [data.games, debouncedFilters, gameGroups, data.groupedGameIds]
  );

  return (
    <>
      <section className="game-filter-section" aria-label="Game Filters">
        <GameFilter
          gameGroups={gameGroups}
          providers={providers}
          gamesCount={filteredGames.length}
          filterHelpers={filterHelpers}
        />
      </section>
      <section className="game-list-section" aria-label="Game results">
        <GameList games={filteredGames} columnsCount={filters.columnsCount} />
      </section>
    </>
  );
};

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="sr-only">Game Library</h1>
      <Suspense fallback={<LoadingFallback message="Loading games..." />}>
        <HomeContent />
      </Suspense>
    </div>
  );
};

export default Home;
