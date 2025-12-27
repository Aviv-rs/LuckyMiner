import { useEffect, useMemo, useState } from "react";
import { useGameBoard } from "../../hooks/useGameBoard";
import styles from "./GamePage.module.css";
import { AppLogo } from "../../components/AppLogo/AppLogo";
import { FramedBox } from "../../components/FramedBox/FramedBox";
import { GameBoard } from "../../components/GameBoard/GameBoard";

export const GamePage = () => {
  const { gameBoard, loading, error, fetchGameBoard } = useGameBoard();
  const [balance] = useState(0);

  const maxPrize = useMemo(() => {
    if (!gameBoard) return 0;
    const winningCards = gameBoard?.board.flat().filter((card) => card.isWinning);
    return winningCards?.length * gameBoard.amountPerWin;
  }, [gameBoard]);

  useEffect(() => {
    fetchGameBoard();
  }, [fetchGameBoard]);

  return (
    <div className={styles["game-page"]}>
      {loading && <div className="loader">Loading...</div>}
      {error && <div className="error">An error has occured, please try again later</div>}
      {gameBoard && (
        <div className={styles["game-page-content"]}>
          <AppLogo />
          <div className={styles["game-board-header"]}>
            <FramedBox title="Balance">{balance}</FramedBox>
            <FramedBox title="Max Prize" frameColor="white">
              {maxPrize}
            </FramedBox>
          </div>
          <FramedBox contentFrameStyle="square">
            <GameBoard gameBoard={gameBoard.board} />
          </FramedBox>
        </div>
      )}
    </div>
  );
};
