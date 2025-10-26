import { Suspense } from "react";
import { useGames } from "@/features/games";

import GameList from "@/components/game/GameList";
import LoadingFallback from "@/components/LoadingFallback";

const HomeContent = () => {
  const { data } = useGames();

  return (
    <>
      <section className="game-list-section" aria-label="Game results">
        <GameList games={data.games} />
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
