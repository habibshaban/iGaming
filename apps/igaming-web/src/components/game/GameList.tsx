import { memo } from "react";
import type { Game } from "igaming-shared";

interface GameListProps {
  games: Game[];
}

const GameList = memo(({ games }: GameListProps) => {
  return (
    <ul className="games-grid" role="list">
      {games.map((game) => (
        <GameItem key={game.id} game={game} />
      ))}
    </ul>
  );
});

GameList.displayName = "GameList";

export default GameList;

interface GameItemProps {
  game: Game;
}

const GameItem = memo(({ game }: GameItemProps) => {
  const { cover, name } = game;

  return (
    <li className="game-item">
      {cover ? (
        <img src={cover} alt={name} loading="lazy" decoding="async" className="game-image" />
      ) : (
        <div className="game-image game-placeholder">
          <span>{name}</span>
        </div>
      )}
    </li>
  );
});

GameItem.displayName = "GameItem";
