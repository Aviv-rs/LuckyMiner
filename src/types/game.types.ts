export interface GameCardDto {
  id: number;
  isWinning: boolean;
}
export interface GameCard extends GameCardDto {
  isExposed: boolean;
}

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
