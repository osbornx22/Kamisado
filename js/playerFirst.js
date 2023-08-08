import { getPossibleMoves } from "./kamisado.js";
import { Player } from "./player.js";
export class PlayerFirst extends Player {
    getMove(board) {
        return getPossibleMoves(board)[0];
    }
}
