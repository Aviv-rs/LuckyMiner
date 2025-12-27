export type GameCardDto = { isWinning: boolean };
export type GameCard = { isWinning: boolean; isExposed: boolean };

export type GameBoardDto = GameCardDto[][];
export type GameBoard = GameCard[][];

export type GameDto = {
  board: GameBoardDto;
  amountPerWin: number;
};

export type Game = {
  board: GameBoard;
  amountPerWin: number;
};
