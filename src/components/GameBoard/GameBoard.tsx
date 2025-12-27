import type { GameBoard as GameBoardType } from "../../types/game.types";
import { GameCard } from "../GameCard/GameCard";
import styles from "./GameBoard.module.css";

export const GameBoard = ({
  gameBoard,
  setGameCardExposed,
}: {
  gameBoard: GameBoardType;
  setGameCardExposed: (cardId: number) => void;
}) => {
  return (
    <div className={styles["game-board"]}>
      {gameBoard.flat().map((gameCard) => (
        <GameCard key={gameCard.id} gameCard={gameCard} onClick={() => setGameCardExposed(gameCard.id)} />
      ))}
    </div>
  );
};
