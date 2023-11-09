import { createMatrix } from "../../Utils/utils";
import { GROUND, MOLE, TileType } from "../Board/Tile";
import { clearBoardAndAddNewMoles, clearBoardAndCountMoles } from "./gameUtils";

describe("gameUtils", () => {
  it("clearBoardAndCountMoles", () => {
    //Create a board with 2 moles
    const board: Array<Array<TileType>> = createMatrix(3, 3, GROUND);
    board[1][1] = MOLE; //(1*3)+1 = 4
    board[2][0] = MOLE; //(2*3)+0 = 6
    const molesPositions: Array<Number> = clearBoardAndCountMoles(board);
    expect(molesPositions).toEqual([4, 6]);
  });

  it("clearBoardAndAddNewMoles", () => {
    //Create a board with 2 moles
    const board: Array<Array<TileType>> = createMatrix(3, 3, GROUND);
    board[1][1] = MOLE; //(1*3)+1 = 4
    board[2][0] = MOLE; //(2*3)+0 = 6
    // Clear the board and add 2 new moles
    const { lostMoles, newBoardMatrix } = clearBoardAndAddNewMoles(board, 2);
    expect(lostMoles).toEqual(2);
    // Clear the board and check there are 2 new moles
    const newMolesPositions: Array<Number> =
      clearBoardAndCountMoles(newBoardMatrix);
    expect(newMolesPositions.length).toEqual(2);
  });
});
