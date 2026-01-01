import { FramedBox } from "../FramedBox/FramedBox";
import CrownIcon from "../../assets/graphics/crown_shadow_no_pad.svg?react";
import styles from "./WinningCardsCounter.module.css";

interface WinningCardsCounterProps {
  exposedWinningCardsCount: number;
  totalWinningCards: number;
}

export const WinningCardsCounter = ({ exposedWinningCardsCount, totalWinningCards }: WinningCardsCounterProps) => {
  return (
    <FramedBox
      title="Next Prize"
      titleStyle="square"
      className={styles["winning-cards-counter"]}
      titleClassName={styles["winning-cards-counter-title"]}
    >
      <span className={styles["winning-cards-counter-value"]}>
        <CrownIcon className={styles["winning-cards-counter-icon"]} />
        <strong>{exposedWinningCardsCount}</strong>/{totalWinningCards}
      </span>
    </FramedBox>
  );
};
