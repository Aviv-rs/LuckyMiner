import styles from "./GameCard.module.css";
import type { GameCard as GameCardType } from "../../types/game.types";
import BombIcon from "../../assets/bomb_shadow.svg?react";
import CrownIcon from "../../assets/crown_shadow.svg?react";

export const GameCard = ({ gameCard, onClick }: { gameCard: GameCardType; onClick: () => void }) => {
  return (
    <div className={styles["game-card"]} onClick={onClick}>
      {gameCard.isExposed ? <>{gameCard.isWinning ? <CrownIcon /> : <BombIcon />}</> : <></>}
    </div>
  );
};
