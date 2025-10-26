import { memo } from "react";
import type { Game } from "igaming-shared";
import EmptyState from "./EmptyState";

interface GameListProps {
  games: Game[];
  columnsCount?: number;
}

const GameList = memo(({ games, columnsCount = 2 }: GameListProps) => {
  if (!games.length) {
    return <EmptyState message="No games available." />;
  }
  return (
    <ul
      className="games-grid"
      style={
        {
          "--columns-count": columnsCount,
        } as React.CSSProperties
      }
      role="list"
    >
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
