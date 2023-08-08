import { Board, Pos } from "./statics.js";

export abstract class Player {
  abstract getMove(board: Board): Pos;
}
