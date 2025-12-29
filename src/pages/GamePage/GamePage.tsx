import { useCallback, useEffect } from "react";
import { useGameBoard } from "../../hooks/useGameBoard";
import styles from "./GamePage.module.css";
import { AppLogo } from "../../components/AppLogo/AppLogo";
import { FramedBox } from "../../components/FramedBox/FramedBox";
import { GameBoard } from "../../components/GameBoard/GameBoard";
import { BaseButton } from "../../components/BaseButton/BaseButton";
import { CoinIcon } from "../../components/CoinIcon/CoinIcon";
import { startViewTransition } from "../../utils/dom.utils";
import { useSwalModal } from "../../hooks/useModal";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import coinAnimation from "../../assets/lotties/coin_animation.lottie?url";

export const GamePage = () => {
  const {
    gameBoard,
    loading,
    error,
    setGameCardExposed,
    resetGameBoard,
    gameStatus,
    fetchGameBoard,
    maxPrize,
    balance,
  } = useGameBoard();

  const { showModal } = useSwalModal();

  const showCashOutModal = useCallback(
    (remainingPrize: number) => {
      return showModal({
        title: "Are you sure?",
        html: (
          <>
            <p className="cash-out-modal-subtitle">You can still win:</p>
            <div className="animated-coin-wrapper">
              <span className="animated-coin-amount">{remainingPrize}</span>
              <DotLottieReact className="animated-coin" src={coinAnimation} loop autoplay />
            </div>
          </>
        ),
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "Cash Out",
        cancelButtonText: "Continue Playing",
      });
    },
    [showModal],
  );

  const handleCashOut = async () => {
    if (gameStatus !== "in-progress") return;
    const remainingPrize = maxPrize - balance;
    const result = await showCashOutModal(remainingPrize);
    if (result.isConfirmed) {
      startViewTransition(resetGameBoard);
    }
  };

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
          <BaseButton variant="secondary" fullWidth onClick={handleCashOut}>
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
