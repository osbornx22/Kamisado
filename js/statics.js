export const size = 8;
export const white = 1;
export const black = -1;
export const noFig = 0;
export const orange = { code: 1, name: "orange" };
export const blue = { code: 2, name: "blue" };
export const purple = { code: 3, name: "purple" };
export const pink = { code: 4, name: "pink" };
export const yellow = { code: 5, name: "yellow" };
export const red = { code: 6, name: "red" };
export const green = { code: 7, name: "green" };
export const brown = { code: 8, name: "brown" };
export const noPos = [-1, -1];
export const markFactor = 10;
export const colors = [
    [orange, blue, purple, pink, yellow, red, green, brown],
    [red, orange, pink, green, blue, yellow, brown, purple],
    [green, pink, orange, red, purple, brown, yellow, blue],
    [pink, purple, blue, orange, brown, green, red, yellow],
    [yellow, red, green, brown, orange, blue, purple, pink],
    [blue, yellow, brown, purple, red, orange, pink, green],
    [purple, brown, yellow, blue, green, pink, orange, red],
    [brown, green, red, yellow, pink, purple, blue, orange],
];
export function getFigColorName(fig) {
    let fig2 = Math.abs(fig);
    if (fig2 > size)
        fig2 /= markFactor;
    // console.log( "fig2: " + fig2 );
    for (let y = 0; y < size; y++) {
        const col = colors[0][y];
        if (fig2 == col.code)
            return col.name;
    }
    throw new Error("cannot find color name of fig");
}
