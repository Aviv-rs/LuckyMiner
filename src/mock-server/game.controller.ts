import type { GameDto } from "../types/game.types";
import { generateRandomNumberInRange, generateUniqueId } from "../utils/generate.utils";

const gameBoardSize = 3;
const minLosingCardsCount = 1;
const maxLosingCardsCount = 3;

export const gameController = {
  _getRandomBoolean: () => {
    return Math.random() < 0.5;
  },
  _generateBoard: () => {
    const board = Array.from({ length: gameBoardSize }, () =>
      Array.from({ length: gameBoardSize }, () => ({
        id: generateUniqueId(),
        isWinning: true,
      })),
    );

    if (maxLosingCardsCount < minLosingCardsCount) {
      throw new Error("maxLosingCardsCount must be greater than or equal to minLosingCardsCount");
    }
    const losingCardsCount = generateRandomNumberInRange(minLosingCardsCount, maxLosingCardsCount);

    const randomIndices = new Set<number>();
    while (randomIndices.size < losingCardsCount) {
      const randomIndex = generateRandomNumberInRange(0, board.length - 1);
      randomIndices.add(randomIndex);
      board[randomIndex][randomIndex].isWinning = false;
    }

    return board;
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
