import type { GameBoard, GameBoardDto } from "../types/game.types";

export const transformGameBoardDtoToGameBoard = (gameBoardDto: GameBoardDto): GameBoard => {
  return gameBoardDto.map((row) => row.map((cell) => ({ isWinning: cell.isWinning, isExposed: false })));
};
