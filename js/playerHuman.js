import { Player } from "./player.js";
import { View } from "./view.js";
export class PlayerHuman extends Player {
    view;
    constructor() {
        super();
        this.view = new View();
    }
    getMove(board) {
        const move = this.view.getMove(board);
        return move;
    }
}
