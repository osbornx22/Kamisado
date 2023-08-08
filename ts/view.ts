
import { getStartBoard } from "./kamisado.js";

import { Board, Pos, colors, getFigColorName, noFig, noPos, size, } from "./statics.js";

let board = getStartBoard();

function myClick ( this: HTMLCanvasElement ) {

  const x = Number( this.getAttribute( "x" ) );
  const y = Number( this.getAttribute( "y" ) );

  console.log( x, y );

}

function paint ( can: HTMLCanvasElement, fig: number ) {

  // resize canvas to size of table data element

  const s = can.offsetHeight;
  can.width = s;
  can.height = s;

  // prepare painting figures

  const ctx = can.getContext( "2d" )!;
  const markS = s / 2;
  const playS = markS * 0.8;
  const figS = playS * 0.5;

  if ( fig == noFig )
    return;

  // mark

  if ( Math.abs( fig ) > size ) {

    ctx.beginPath();
    ctx.arc( s / 2, s / 2, markS, 0, 2 * Math.PI );
    ctx.fillStyle = "grey";
    ctx.fill();

  }

  // player

  ctx.beginPath();

  ctx.arc( s / 2, s / 2, playS, 0, 2 * Math.PI );

  if ( fig > 0 ) ctx.fillStyle = "white";

  else ctx.fillStyle = "black";

  ctx.fill();

  // fig

  ctx.beginPath();

  ctx.arc( s / 2, s / 2, figS, 0, 2 * Math.PI );
  ctx.fillStyle = getFigColorName( fig );

  ctx.fill();

}

function resize () {

  const cans = document.getElementsByTagName( "canvas" );

  for ( let i = 0; i < cans.length; i++ ) {

    const can = cans[ i ];

    const x = Number( can.getAttribute( "x" ) );
    const y = Number( can.getAttribute( "y" ) );

    const fig = board[ x ][ y ];

    paint( can, fig );

  }

}

export class View {

  getMove ( board2: Board ): Pos {

    board = board2;

    resize();

    const monitor = "";

    // TODO

    throw new Error( "todo return move human playerd" );

  }

  constructor () {

    // this.generateTable();

    resize();

    resize();

    onresize = resize;

    const cans = document.getElementsByTagName( "canvas" );

    for ( let i = 0; i < cans.length; i++ ) {

      const can = cans[ i ];
      can.addEventListener( "click", myClick );

    }

  }

  generateTable () {

    const tbl = document.createElement( "table" );

    for ( let x = 0; x < size; x++ ) {

      const row = document.createElement( "tr" );

      for ( let y = 0; y < size; y++ ) {

        const cell = document.createElement( "td" );

        cell.style.backgroundColor = colors[ x ][ y ].name;

        // cell.style.cursor = "pointer";

        // canvas begin

        const canvas = document.createElement( "canvas" );

        canvas.setAttribute( "x", x + "" );
        canvas.setAttribute( "y", y + "" );

        canvas.addEventListener( "click", myClick );

        // console.log(this.cans[x][y]);

        // paint(canvas, x, y);

        cell.appendChild( canvas );

        // canvas end

        row.appendChild( cell );

      }

      tbl.appendChild( row );

    }

    document.body.appendChild( tbl );

  }

}

