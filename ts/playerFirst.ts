import { getPossibleMoves } from "./kamisado.js";
import { Player } from "./player.js";
import { Board, Pos } from "./statics.js";

export class PlayerFirst extends Player {
  getMove(board: Board): Pos {
    return getPossibleMoves(board)[0];
  }
}
