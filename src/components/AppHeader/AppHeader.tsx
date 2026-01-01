import { TotalCoinsHeader } from "../TotalCoinsHeader/TotalCoinsHeader";
import styles from "./AppHeader.module.css";
export const AppHeader = () => {
  return (
    <header className={styles["app-header"]}>
      <TotalCoinsHeader />
    </header>
  );
};
