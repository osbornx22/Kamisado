import { getPossibleMoves } from "./kamisado.js";
import { Player } from "./player.js";
import { Board, Pos } from "./statics.js";

export class PlayerMin extends Player {
  getMove(board: Board): Pos {
    const moves = getPossibleMoves(board);

    let minDelta = 100;
    let minMove = -1;

    for (let i = 0; i < moves.length; i++) {
      const tempX = moves[i][0];
      const tempY = moves[i][1];
      const tempDelta = Math.sqrt(Math.pow(tempX, 2) + Math.pow(tempY, 2));

      if (tempDelta < minDelta) {
        minDelta = tempDelta;
        minMove = i;
      }
    }

    return moves[minMove];
  }
}
