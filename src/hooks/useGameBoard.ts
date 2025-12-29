import { useCallback, useState, useMemo, useRef } from "react";
import type { Game, GameCard, GameStatus } from "../types/game.types";
import { gameApi } from "../api/game.api";

export const useGameBoard = () => {
  const [gameBoard, setGameBoard] = useState<Game | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const exposedCards = useRef<Set<GameCard>>(new Set());

  const fetchGameBoard = useCallback(
    async (forceRefresh: boolean = false) => {
      if (!forceRefresh && gameBoard) {
        return gameBoard;
      }
      setLoading(true);
      try {
        const gameBoardResponse = await gameApi.getGameBoard();
        if (!gameBoardResponse) return;
        setGameBoard(gameBoardResponse);
        return gameBoardResponse;
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    },
    [gameBoard],
  );

  const cardPositionMap = useMemo(() => {
    const map = new Map<number, [number, number]>();
    gameBoard?.board.forEach((row, rowIndex) => {
      row.forEach((card, columnIndex) => {
        map.set(card.id, [rowIndex, columnIndex]);
      });
    });
    return map;
  }, [gameBoard?.board]);

  const setGameCardExposed = useCallback(
    (cardId: number) => {
      setGameBoard((prevGameState) => {
        const [cardRow, cardColumn] = cardPositionMap.get(cardId) || [];
        if (typeof cardRow !== "number" || typeof cardColumn !== "number" || !prevGameState) return prevGameState;
        const board = [...prevGameState.board];
        const card = board[cardRow][cardColumn];
        card.isExposed = true;
        exposedCards.current.add(card);
        return {
          ...prevGameState,
          board,
        };
      });
    },
    [cardPositionMap],
  );

  const resetGameBoard = useCallback(() => {
    fetchGameBoard(true);
    exposedCards.current.clear();
  }, [fetchGameBoard, exposedCards]);

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

  return {
    gameBoard,
    loading,
    error,
    fetchGameBoard,
    setGameCardExposed,
    exposedCards,
    resetGameBoard,
    maxPrize,
    balance,
    gameStatus,
  };
};
