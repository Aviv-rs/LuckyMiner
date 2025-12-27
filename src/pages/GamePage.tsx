import { useEffect } from "react";
import { useGameBoard } from "../hooks/useGameBoard";

export const GamePage = () => {
  const { gameBoard, loading, error, fetchGameBoard } = useGameBoard();

  useEffect(() => {
    fetchGameBoard();
  }, [fetchGameBoard]);

  return (
    <div>
      {loading && <div className="loader">Loading...</div>}
      {error && <div className="error">An error has occured, please try again later</div>}
      {gameBoard && <div className="">Game Page</div>}
    </div>
  );
};
