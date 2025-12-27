import type { GameDto } from "../types/game.types";
import { generateUniqueId } from "../utils/generate.utils";
const gameBoardSize = 3;

export const gameController = {
  _getRandomBoolean: () => {
    return Math.random() < 0.5;
  },
  _generateBoard: () => {
    return Array.from({ length: gameBoardSize }, () =>
      Array.from({ length: gameBoardSize }, () => ({
        id: generateUniqueId(),
        isWinning: gameController._getRandomBoolean(),
      })),
    );
  },
  getGameBoard: async (): Promise<GameDto> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          board: gameController._generateBoard(),
          amountPerWin: 10,
        });
      }, 0);
    });
  },
};
