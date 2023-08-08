
import { getPossibleMoves } from "./kamisado.js";

import { Player } from "./player.js";

import { Board, Pos } from "./statics.js";

import { View } from "./view.js";

export class PlayerHuman extends Player {

  private view: View;

  public constructor () {

    super();

    this.view = new View();

  }

  public getMove ( board: Board ): Pos {

    const move = this.view.getMove( board );

    return move;

  }

}

