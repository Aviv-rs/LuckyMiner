import styles from "./GameCard.module.css";
import type { GameCard as GameCardType } from "../../types/game.types";
import BombIcon from "../../assets/graphics/bomb_shadow.svg?react";
import CrownIcon from "../../assets/graphics/crown_shadow.svg?react";
import FlameEffect from "../../assets/graphics/flame_effect.svg?react";

export const GameCard = ({ gameCard, onClick }: { gameCard: GameCardType; onClick: () => void }) => {
  return (
    <div className={`${styles["game-card-container"]}`}>
      <div onClick={onClick} className={`${styles["game-card"]} ${gameCard.isExposed && styles["game-card-exposed"]}`}>
        <div className={styles["game-card-front"]}></div>
        <div
          className={`${styles["game-card-back"]} ${gameCard.isWinning && gameCard.isExposed ? styles["game-card-winning"] : ""}`}
        >
          {gameCard.isExposed && (
            <div
              className={gameCard.isWinning ? styles["game-card-content-winning"] : styles["game-card-content-losing"]}
            >
              {gameCard.isWinning ? <CrownIcon /> : <BombIcon />}
            </div>
          )}
        </div>
      </div>
      {/* This is a hack to get the losing card flame effect to work */}
      <FlameEffect aria-hidden="true" style={{ width: 0, height: 0 }} />
    </div>
  );
};
