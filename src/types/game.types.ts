export type GameBoardDto = { isWinning: boolean }[][];
export type GameBoard = { isWinning: boolean; isExposed: boolean }[][];

export type GameDto = {
  board: GameBoardDto;
  amountPerWin: number;
};

export type Game = {
  board: GameBoard;
  amountPerWin: number;
};
