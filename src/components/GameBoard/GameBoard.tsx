import type { GameBoard as GameBoardType } from "../../types/game.types";
import { GameCard } from "../GameCard/GameCard";
import styles from "./GameBoard.module.css";

export const GameBoard = ({ gameBoard }: { gameBoard: GameBoardType }) => {
  return (
    <div className={styles["game-board"]}>
      {gameBoard.flat().map((gameCard) => (
        <GameCard key={gameCard.id} gameCard={gameCard} />
      ))}
    </div>
  );
};
