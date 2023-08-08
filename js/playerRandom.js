import { getPossibleMoves } from "./kamisado.js";
import { Player } from "./player.js";
export class PlayerRandom extends Player {
    getMove(board) {
        const moves = getPossibleMoves(board);
        const r = Math.round(Math.random() * (moves.length - 1));
        return moves[r];
    }
}
