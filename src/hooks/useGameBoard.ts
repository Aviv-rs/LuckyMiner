import { useCallback, useState, useMemo, useRef } from "react";
import type { Game, GameCard } from "../types/game.types";
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

  return { gameBoard, loading, error, fetchGameBoard, setGameCardExposed, exposedCards, resetGameBoard };
};
