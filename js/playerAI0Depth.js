import { doMove, getBoardCopy, getPossibleMoves, getTurn, getWinner, } from "./kamisado.js";
import { Player } from "./player.js";
import { black, noPos, white } from "./statics.js";
export class PlayerAI extends Player {
    maxDepth;
    constructor(maxDepth) {
        super();
        this.maxDepth = maxDepth;
    }
    getMove(board) {
        const moves = getPossibleMoves(board);
        const turn = getTurn(board);
        let bestMove = noPos;
        let bestRating;
        if (turn == black)
            bestRating = 1000;
        else
            bestRating = -1000;
        const ratings = new Map();
        for (let i = 0; i < moves.length; i++) {
            const move = moves[i];
            const board2 = getBoardCopy(board);
            doMove(move, board2);
            const rating = this.getRating(board2, 1);
            ratings.set(move, rating);
            if ((rating > bestRating && turn == white) ||
                (rating < bestRating && turn == black)) {
                bestRating = rating;
                bestMove = move;
            }
        }
        // console.log(ratings);
        return bestMove;
    }
    getRating(board, depth) {
        const winner = getWinner(board);
        if (winner != 0) {
            return winner / depth;
        }
        if (depth > this.maxDepth)
            return 0;
        const moves = getPossibleMoves(board);
        const turn = getTurn(board);
        let bestMove = noPos;
        let bestRating;
        if (turn == black)
            bestRating = 1000;
        else
            bestRating = -1000;
        for (let i = 0; i < moves.length; i++) {
            const move = moves[i];
            const board2 = getBoardCopy(board);
            doMove(move, board2);
            const rating = this.getRating(board2, depth + 1);
            if ((rating > bestRating && turn == white) ||
                (rating < bestRating && turn == black)) {
                bestRating = rating;
                bestMove = move;
            }
        }
        return bestRating;
    }
}
