import {
  doMove,
  getBoardCopy,
  getPossibleMoves,
  getTurn,
  getWinner,
} from "./kamisado.js";
import { Player } from "./player.js";
import { Board, Pos, black, noPos, size, white } from "./statics.js";

export class PlayerAI extends Player {
  maxDepth;
  constructor(maxDepth: number) {
    super();
    this.maxDepth = maxDepth;
  }
  getMove(board: Board): Pos {
    const moves = getPossibleMoves(board);

    const turn = getTurn(board);

    let bestMove = noPos;
    let bestRating: number;

    if (turn == black) bestRating = 1000;
    else bestRating = -1000;

    const ratings = new Map<Pos, number>();

    for (let i = 0; i < moves.length; i++) {
      const move = moves[i];

      const board2 = getBoardCopy(board);

      doMove(move, board2);

      const rating = this.getRating(board2, 1);

      ratings.set(move, rating);

      if (
        (rating > bestRating && turn == white) ||
        (rating < bestRating && turn == black)
      ) {
        bestRating = rating;
        bestMove = move;
      }
    }

    // console.log(ratings);

    return bestMove;
  }

  getRating(board: Board, depth: number): number {
    const winner = getWinner(board);

    if (winner != 0) {
      return winner / depth;
    }

    if (depth > this.maxDepth) return 0;

    // TODO heuristic start

    // more free places at enemy line is better
    // less free places at my line is better

    // more possible moves is better
    // less possible moves for enemy is better

    // less depth is better
    // not more depth is better

    // winning ist better
    // not loosing is better

    // less distance to enemy line is better
    // more distance to my line is better

    // 1 depth
    // 2 win
    // 3 possible moves
    // 4 free places on line
    // 5 distance

    // const dist = getDist(board);

    const maxDist = 7;

    const maxDelta = 6;

    // const heuri = (maxDelta / (maxDist - dist) + 1 / depth) / 2;

    // TODO heuristic end

    const moves = getPossibleMoves(board);

    const turn = getTurn(board);

    let bestMove = noPos;
    let bestRating: number;

    if (turn == black) bestRating = 1000;
    else bestRating = -1000;

    for (let i = 0; i < moves.length; i++) {
      const move = moves[i];

      const board2 = getBoardCopy(board);

      doMove(move, board2);

      const rating = this.getRating(board2, depth + 1);

      if (
        (rating > bestRating && turn == white) ||
        (rating < bestRating && turn == black)
      ) {
        bestRating = rating;
        bestMove = move;
      }
    }

    return bestRating;
  }
}
