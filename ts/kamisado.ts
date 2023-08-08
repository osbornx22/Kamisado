
import { Player } from "./player.js"

import { Board, size, colors, white, black, noFig, Pos, markFactor, noPos, } from "./statics.js"

let isLogOn = false

function log ( text: string ) {

  if ( isLogOn )
    console.log( text )

}

export function getWinner ( board: Board ): number {

  for ( let y = 0; y < size; y++ ) {

    if ( board[ 0 ][ y ] < 0 )
      return black

    if ( board[ size - 1 ][ y ] > 0 )
      return white

  }

  if ( isBlockCycle( board ) ) {

    const markFig = getMarkedFig( board )
    const markPlayer = Math.sign( markFig )
    return markPlayer

  }

  return 0

}

export function startGame ( playerBlack: Player, playerWhite: Player, logON: boolean ): number {

  isLogOn = logON

  const board = getStartBoard()

  let round = 1

  while ( !isGameOver( board ) ) {
    log( getBoardString( board ) )
    log( "is game over: " + isGameOver( board ) )
    log( "round: " + round++ )
    log( "turn: " + getTurn( board ) )
    log( "possible moves: " + getMovesString( getPossibleMoves( board ) ) )

    // play(board);

    const turn = getTurn( board )

    let move: Pos

    if ( turn == black ) move = playerBlack.getMove( board )
    else move = playerWhite.getMove( board )

    log( "move: " + move )

    const moveIsDone = tryMove( move, board )

    log( "moveIsDone: " + moveIsDone )
  }

  log( getBoardString( board ) )

  const winner = getWinner( board )

  log( "winner: " + winner )

  log( "round: " + round++ )
  log( "turn: " + getTurn( board ) )
  log( "possible moves: " + getMovesString( getPossibleMoves( board ) ) )

  return winner
}

function getStringWithSpaces ( text1: string ): string {
  const minLen = 3
  const len = text1.length
  const dif = minLen - len

  const text2 = " ".repeat( dif ) + text1

  return text2
}

function getBoardString ( board: Board ): string {
  let string = "\n"
  for ( let x = 0; x < size; x++ ) {
    for ( let y = 0; y < size; y++ ) {
      string +=
        x +
        "," +
        y +
        "," +
        colors[ x ][ y ] +
        "," +
        getStringWithSpaces( board[ x ][ y ] + "" ) +
        " | "
    }
    string += "\n"
  }
  return string
}

export function getStartBoard (): Board {
  const board: Board = []
  for ( let x = 0; x < size; x++ ) {
    board[ x ] = []
    for ( let y = 0; y < size; y++ ) {
      if ( x === 0 ) board[ x ][ y ] = white * colors[ x ][ y ].code
      else if ( x === size - 1 ) board[ x ][ y ] = black * colors[ x ][ y ].code
      else board[ x ][ y ] = noFig
    }
  }
  return board
}

function isGameOver ( board: Board ): boolean {
  if ( isPlayerOnWinLine( board ) ) {
    // log("player is on win line");
    return true
  }

  if ( isBlockCycle( board ) ) {
    // log("block cycle");
    return true
  }

  return false
}

function isPlayerOnWinLine ( board: Board ): boolean {
  for ( let y = 0; y < size; y++ ) {
    if ( board[ 0 ][ y ] < 0 || board[ size - 1 ][ y ] > 0 ) return true
  }

  return false
}

function isBlockCycle ( board1: Board ): boolean {
  const board2 = getBoardCopy( board1 )

  const marks: number[] = []

  while ( isBlocked( board2 ) ) {
    const mark = getMarkedFig( board2 )

    if ( marks.includes( mark ) ) {
      return true
    }

    marks.push( mark )

    markNext( board2 )
  }

  return false
}

// get a board with a marked fig
// marks the next fig based on last mark field pos and color
// removes mark from last mark
function markNext ( board: Board ) {
  // get mark pos
  const oldPos = getMarkPos( board )
  // get marked fig
  const oldFig = board[ oldPos[ 0 ] ][ oldPos[ 1 ] ]

  // get other player
  const oldPlayer = Math.sign( oldFig )

  // log("markNext oldPlayer: " + oldPlayer);

  // get color from last target field
  const oldFieldCol = colors[ oldPos[ 0 ] ][ oldPos[ 1 ] ]

  // calc next player
  const newPlayer = oldPlayer * -1

  // calc next fig based on last target field and player
  const newFig = oldFieldCol.code * newPlayer

  // get pos from next fig to mark
  const newPos = getPos( newFig, board )

  // mark next fig
  board[ newPos[ 0 ] ][ newPos[ 1 ] ] *= markFactor

  // remove mark from last marked fig
  board[ oldPos[ 0 ] ][ oldPos[ 1 ] ] /= markFactor
}

function getPos ( fig: number, board: Board ): Pos {
  for ( let x = 0; x < size; x++ ) {
    for ( let y = 0; y < size; y++ ) {
      if ( board[ x ][ y ] === fig ) return [ x, y ]
    }
  }

  return noPos
}

function getMarkPos ( board: Board ): Pos {
  for ( let x = 0; x < size; x++ ) {
    for ( let y = 0; y < size; y++ ) {
      if ( Math.abs( board[ x ][ y ] ) > size ) return [ x, y ]
    }
  }

  return noPos
}

function getMarkedFig ( board: Board ): number {
  const markPos = getMarkPos( board )

  if ( markPos === noPos ) return noFig

  return board[ markPos[ 0 ] ][ markPos[ 1 ] ]
}

function isBlocked ( board: Board ): boolean {
  const possibleMoves = getPossibleMoves( board )

  if ( possibleMoves.length === 0 ) return true
  else return false
}

function getMovesString ( moves: Pos[] ): string {
  let s = "(" + moves.length + ") "

  for ( let i = 0; i < moves.length; i++ ) {
    s += moves[ i ] + " | "
  }

  return s
}

export function getPossibleMoves ( board: Board ): Pos[] {
  const moves: Pos[] = []
  const markPos = getMarkPos( board )

  // if first move
  if ( markPos === noPos ) {
    // log("getPossibleMoves first move");
    for ( let y = 0; y < size; y++ ) {
      moves.push( [ size - 1, y ] )
    }
    // log("getPossibleMoves moves: " + getMovesString(moves));

    return moves
  }

  // if not first move

  const markX = markPos[ 0 ]
  const markY = markPos[ 1 ]

  const turn = Math.sign( board[ markX ][ markY ] )

  if ( turn === white ) {
    // white down
    for ( let x = markX + 1; x < size; x++ ) {
      if ( board[ x ][ markY ] == noFig ) moves.push( [ x, markY ] )
      else break
    }

    // white down right

    for ( let i = 1; markX + i < size && markY + i < size; i++ ) {
      if ( board[ markX + i ][ markY + i ] == noFig )
        moves.push( [ markX + i, markY + i ] )
      else break
    }

    // white down left

    for ( let i = 1; markX + i < size && markY - i >= 0; i++ ) {
      if ( board[ markX + i ][ markY - i ] == noFig )
        moves.push( [ markX + i, markY - i ] )
      else break
    }
  } else {
    // black up
    for ( let x = markX - 1; x >= 0; x-- ) {
      if ( board[ x ][ markY ] == noFig ) moves.push( [ x, markY ] )
      else break
    }

    // black up right

    for ( let i = 1; markX - i >= 0 && markY + i < size; i++ ) {
      if ( board[ markX - i ][ markY + i ] == noFig )
        moves.push( [ markX - i, markY + i ] )
      else break
    }

    // black up left

    for ( let i = 1; markX - i >= 0 && markY - i >= 0; i++ ) {
      if ( board[ markX - i ][ markY - i ] == noFig )
        moves.push( [ markX - i, markY - i ] )
      else break
    }
  }

  return moves
}

export function getTurn ( board: Board ): number {
  const mark = getMarkedFig( board )

  // if first move

  if ( mark === noFig ) return black

  // if not first move
  return Math.sign( mark )
}

export function getBoardCopy ( board1: Board ): Board {
  const board2: Board = []
  for ( let x = 0; x < size; x++ ) {
    board2[ x ] = []
    for ( let y = 0; y < size; y++ ) {
      board2[ x ][ y ] = board1[ x ][ y ]
    }
  }
  return board2
}

function tryMove ( move: Pos, board: Board ): boolean {
  if ( isMovePossible( move, board ) ) {
    // log("move is possible");

    doMove( move, board )

    return true
  } else return false
}

function isMovePossible ( move: Pos, board: Board ): boolean {
  // log("isMovePossible move: " + move);

  const moves = getPossibleMoves( board )

  // log("possible moves: (" + moves.length + ") " + getMovesString(moves));

  const isPossible = isMoveIncluded( move, moves )

  // log("isMovePossible isPossible: " + isPossible);

  return isPossible
}

function isMoveIncluded ( move: Pos, moves: Pos[] ): boolean {
  for ( let i = 0; i < moves.length; i++ ) {
    if ( moves[ i ][ 0 ] === move[ 0 ] && moves[ i ][ 1 ] === move[ 1 ] ) return true
  }

  return false
}

export function doMove ( target: Pos, board: Board ) {
  // get pos from fig to move
  const origin = getMarkPos( board )

  // if first move
  if ( origin == noPos ) {
    board[ target[ 0 ] ][ target[ 1 ] ] *= markFactor
    return
  }

  // if not first move

  // log("do move origin: " + origin);

  // copy fig from origin to target field

  board[ target[ 0 ] ][ target[ 1 ] ] = board[ origin[ 0 ] ][ origin[ 1 ] ]

  // clear origin field
  board[ origin[ 0 ] ][ origin[ 1 ] ] = noFig

  // mark next
  markNext( board )

  // if game is over, do not mark next, just return
  if ( isGameOver( board ) ) return

  // game is not over

  while ( isBlocked( board ) ) {
    // if game is not over, means no block cycle, but mark is blocked
    markNext( board )
  }
}
