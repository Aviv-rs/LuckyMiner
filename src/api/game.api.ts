import { gameController } from "../mock-server/game.controller";
import { transformGameBoardDtoToGameBoard } from "../transformers/game.transformer";
import type { Game } from "../types/game.types";

export const gameApi = {
  getGameBoard: async (): Promise<Game | undefined> => {
    try {
      const gameDto = await gameController.getGameBoard();
      return {
        board: transformGameBoardDtoToGameBoard(gameDto.board),
        amountPerWin: gameDto.amountPerWin,
      };
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw error;
    }
  },
};
