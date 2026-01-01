import { FramedBox } from "../FramedBox/FramedBox";
import { CoinIcon } from "../CoinIcon/CoinIcon";
import styles from "./NextPrizesBox.module.css";

interface NextPrizesBoxProps {
  nextPrizes: number[];
}

export const NextPrizesBox = ({ nextPrizes }: NextPrizesBoxProps) => {
  return (
    <FramedBox className={styles["next-prizes-box"]} contentClassName={styles["next-prizes-box-content"]}>
      {nextPrizes && nextPrizes.length > 0 ? (
        nextPrizes.map((prize, index) => (
          <span
            className={`${styles["next-prize-item"]} ${index === 0 && styles["next-prize-item-first"]}`}
            style={{ transform: index === 0 ? "none" : `translateX(${index * 10}%)` }}
            key={index}
          >
            <CoinIcon /> {prize}
          </span>
        ))
      ) : (
        <span className={styles["next-prize-item-won"]}>You won! Cash out your winnings to continue playing.</span>
      )}
    </FramedBox>
  );
};
