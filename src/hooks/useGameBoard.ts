import { useCallback, useState } from "react";
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

  return { gameBoard, loading, error, fetchGameBoard };
};
