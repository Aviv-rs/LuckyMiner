import { useEffect, useMemo } from "react";
import { useGameBoard } from "../../hooks/useGameBoard";
import styles from "./GamePage.module.css";
import { AppLogo } from "../../components/AppLogo/AppLogo";
import { FramedBox } from "../../components/FramedBox/FramedBox";
import { GameBoard } from "../../components/GameBoard/GameBoard";
import type { GameStatus } from "../../types/game.types";
import { BaseButton } from "../../components/BaseButton/BaseButton";
import { CoinIcon } from "../../components/CoinIcon/CoinIcon";
import { startViewTransition } from "../../utils/dom.utils";

export const GamePage = () => {
  const { gameBoard, loading, error, setGameCardExposed, resetGameBoard, exposedCards, fetchGameBoard } =
    useGameBoard();

  const maxPrize = useMemo(() => {
    if (!gameBoard) return 0;
    return gameBoard.board.flat().filter((card) => card.isWinning).length * gameBoard.amountPerWin;
  }, [gameBoard]);

  const balance: number = useMemo<number>(() => {
    if (!gameBoard || !exposedCards.current.size) return 0;
    const exposedLosingCards = Array.from(exposedCards.current).filter((card) => !card.isWinning);
    if (exposedLosingCards.length > 0) return 0;
    return exposedCards.current.size * gameBoard.amountPerWin;
  }, [gameBoard, exposedCards]);

  const gameStatus = useMemo<GameStatus>(() => {
    if (!gameBoard) return "first-round";
    const exposedLosingCards = Array.from(exposedCards.current).filter((card) => !card.isWinning);
    if (exposedLosingCards.length > 0) return "lose";
    else if (balance === 0 && exposedCards.current.size > 0) return "cashed-out";
    else if (exposedCards.current.size > 0) return "in-progress";
    else return "first-round";
  }, [gameBoard, exposedCards, balance]);

  const handleGameCardExposed = (cardId: number) => {
    if (gameStatus === "lose" || gameStatus === "cashed-out") return;
    setGameCardExposed(cardId);
  };

  const gameBoardFooter = () => {
    switch (gameStatus) {
      case "cashed-out":
      case "lose":
        return (
          <BaseButton fullWidth onClick={() => startViewTransition(resetGameBoard)}>
            Play Again
          </BaseButton>
        );
      case "in-progress":
        return (
          <BaseButton variant="secondary" fullWidth onClick={() => {}}>
            Cash Out
          </BaseButton>
        );
    }
  };

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
            <FramedBox title="Balance">
              <CoinIcon /> {balance}
            </FramedBox>
            <FramedBox title="Max Prize" frameColor="white">
              <CoinIcon /> {maxPrize}
            </FramedBox>
          </div>
          <FramedBox contentFrameStyle="square">
            <GameBoard gameBoard={gameBoard.board} setGameCardExposed={handleGameCardExposed} />
          </FramedBox>
          {gameStatus !== "first-round" && <div className={styles["game-board-footer"]}>{gameBoardFooter()}</div>}
        </div>
      )}
    </div>
  );
};
