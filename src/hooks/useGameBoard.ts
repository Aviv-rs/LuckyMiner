import { useCallback, useState, useMemo } from "react";
import type { Game } from "../types/game.types";
import { gameApi } from "../api/game.api";

export const useGameBoard = () => {
  const [gameBoard, setGameBoard] = useState<Game | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
        board[cardRow][cardColumn].isExposed = true;
        return {
          ...prevGameState,
          board,
        };
      });
    },
    [cardPositionMap],
  );

  return { gameBoard, loading, error, fetchGameBoard, setGameCardExposed };
};
