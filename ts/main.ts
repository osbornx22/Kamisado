import { startGame } from "./kamisado.js";
import { Player } from "./player.js";
import { PlayerAI } from "./playerAI0Depth.js";
import { PlayerFirst } from "./playerFirst.js";
import { PlayerHuman } from "./playerHuman.js";
import { PlayerMax } from "./playerMax.js";
import { PlayerMin } from "./playerMin.js";
import { PlayerRandom } from "./playerRandom.js";
import { black, white } from "./statics.js";
import { View } from "./view.js";

function testManyGames ( playerBlack: Player, playerWhite: Player, games: number, isLogOn: boolean ): number {

  let countBlack = 0;

  let countWhite = 0;

  for ( let i = 0; i < games; i++ ) {

    const winner = startGame( playerBlack, playerWhite, isLogOn );

    if ( winner == black )
      countBlack++;

    else if ( winner == white )
      countWhite++;

    else {

      console.log( "winner ist not black or white" );

      return -1;

    }

  }

  console.log( "black wins: " + countBlack );

  console.log( "white wins: " + countWhite );

  const ratio = countBlack / countWhite;

  return ratio;

}

function test () {

  const playerBlack = new PlayerAI( 1 );
  const playerWhite = new PlayerAI( 1 );

  const games = 1;

  const isLogOn = false;

  const ratio = testManyGames( playerBlack, playerWhite, games, isLogOn );

  console.log( "black/white: " + ratio );

}

onload = test2;

function test2 () {

  console.log( "on load test 2 called" );

  const playerBlack = new PlayerFirst();

  const playerWhite = new PlayerHuman();

  const games = 1;

  const isLogOn = false;

  const ratio = testManyGames( playerBlack, playerWhite, games, isLogOn );

  console.log( "ratio black/white: " + ratio );

}

//  test();

// onload = function rofl () {

//   const view = new View();

// };

// view.generateTable();

// console.log(view.cells[0][0].offsetWidth);
