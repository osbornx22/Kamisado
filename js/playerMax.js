import { getPossibleMoves } from "./kamisado.js";
import { Player } from "./player.js";
export class PlayerMax extends Player {
    getMove(board) {
        const moves = getPossibleMoves(board);
        let maxDelta = -100;
        let maxMove = -1;
        for (let i = 0; i < moves.length; i++) {
            const tempX = moves[i][0];
            const tempY = moves[i][1];
            const tempDelta = Math.sqrt(Math.pow(tempX, 2) + Math.pow(tempY, 2));
            if (tempDelta > maxDelta) {
                maxDelta = tempDelta;
                maxMove = i;
            }
        }
        return moves[maxMove];
    }
}
