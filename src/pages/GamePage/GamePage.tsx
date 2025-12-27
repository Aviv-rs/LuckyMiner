import { useEffect } from "react";
import { useGameBoard } from "../../hooks/useGameBoard";
import styles from "./GamePage.module.css";
import { AppLogo } from "../../components/AppLogo";

export const GamePage = () => {
  const { gameBoard, loading, error, fetchGameBoard } = useGameBoard();

  useEffect(() => {
    fetchGameBoard();
  }, [fetchGameBoard]);

  return (
    <div className={styles["game-page"]}>
      {loading && <div className="loader">Loading...</div>}
      {error && <div className="error">An error has occured, please try again later</div>}
      {gameBoard && (
        <div>
          <AppLogo />
        </div>
      )}
    </div>
  );
};
