import { getPossibleMoves } from "./kamisado.js";
import { Player } from "./player.js";
import { Board, Pos } from "./statics.js";

export class PlayerRandom extends Player {
  getMove(board: Board): Pos {
    const moves = getPossibleMoves(board);

    const r = Math.round(Math.random() * (moves.length - 1));

    return moves[r];
  }
}
