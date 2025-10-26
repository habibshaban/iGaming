import { useGames } from "@/features/games";

import GameList from "@/components/game/GameList";

const Home = () => {
  const { data } = useGames();

  return (
    <div className="home-container">
      <GameList games={data ? data.games : []} />
    </div>
  );
};

export default Home;
