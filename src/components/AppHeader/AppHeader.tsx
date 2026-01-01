import { TotalCoinsHeader } from "../TotalCoinsHeader/TotalCoinsHeader";
import { HowToPlayButton } from "../HowToPlayButton/HowToPlayButton";
import styles from "./AppHeader.module.css";

export const AppHeader = () => {
  return (
    <header className={styles["app-header"]}>
      <div className={styles["total-coins-wrapper"]}>
        <TotalCoinsHeader />
      </div>
      <HowToPlayButton />
    </header>
  );
};
