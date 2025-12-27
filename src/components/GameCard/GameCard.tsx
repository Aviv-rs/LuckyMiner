import styles from "./GameCard.module.css";
import type { GameCard as GameCardType } from "../../types/game.types";
import BombIcon from "../../assets/bomb_shadow.svg?react";
import CrownIcon from "../../assets/crown_shadow.svg?react";

export const GameCard = ({ gameCard }: { gameCard: GameCardType }) => {
  return (
    <div className={styles["game-card"]}>
      {gameCard.isExposed ? <>{gameCard.isWinning ? <CrownIcon /> : <BombIcon />}</> : <></>}
    </div>
  );
};
