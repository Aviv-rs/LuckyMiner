import styles from "./HowToPlayButton.module.css";
import { useSwalModal } from "../../hooks/useModal";
import { BaseIcon } from "../BaseIcon/BaseIcon";
import CrownIcon from "../../assets/graphics/crown_shadow.svg?react";
import BombIcon from "../../assets/graphics/bomb_shadow.svg?react";

export const HowToPlayButton = () => {
  const { showModal } = useSwalModal();

  const openHowToPlayModal = () => {
    showModal({
      title: "How to Play Lucky Miner",
      html: (
        <div className={styles["how-to-play-modal-content"]}>
          <p>Lucky Miner is a card game where you can win coins by revealing cards. Click a card to reveal it.</p>
          <p>
            When flipping a winning card marked with a green icon{" "}
            <span className={styles["how-to-play-modal-icon"]}>
              <CrownIcon />
            </span>
            , you will earn the next prize shown on the board bottom.
          </p>
          <p>
            If you flip a losing card marked with a red icon{" "}
            <span className={styles["how-to-play-modal-icon"]}>
              <BombIcon />
            </span>{" "}
            , you will lose the game and all your winnings.
          </p>
          <p>You can cash out your winnings at any time by clicking the "Cash Out" button.</p>
          <p>The game is over when you have flipped all the cards or you have cashed out your winnings.</p>
        </div>
      ),
      showCloseButton: true,
      showCancelButton: false,
      confirmButtonText: "Got it",
    });
  };

  return (
    <button onClick={openHowToPlayModal}>
      <BaseIcon icon="info" />
    </button>
  );
};
