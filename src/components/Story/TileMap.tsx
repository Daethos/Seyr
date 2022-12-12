import React from 'react'

const TileMap = () => {
    // class NewMap {
    //     tileSize: any
    //     wall: HTMLImageElement;
    //     floor: HTMLImageElement;
    //     constructor(tileSize: any) {
    //         this.tileSize = tileSize
    //         this.wall = this.image('GUI_4.png');
    //         this.floor = this.image('GUI_1.png');
    //     }

    //     image(fileName: any) {
    //         const img = new Image();
    //         img.src = process.env.PUBLIC_URL + `/images/${fileName}`;
    //         return img;
    //     }

    //     map = [
    //         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //     ]

    //     draw(canvas: any, ctx: any) {
    //         this.setCanvasSize(canvas);
    //         this.clearCanvas(canvas, ctx);
    //         this.drawMap(ctx);
    //     }

    //     drawMap(ctx: any) {
    //         for (let row = 0; row < this.map.length; row++) {
    //             for (let column = 0; column < this.map[row].length; column++) {
    //                 const tile = this.map[row][column];
    //                 let image = null;
    //                 switch(tile) {
    //                     case 1: image = this.wall;
    //                     break;
    //                 }

    //                 if (image != null)
    //                 ctx.drawImage(image, column * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize)
    //             }
    //         }
    //     }

    //     clearCanvas(canvas: { width: any; height: any; }, ctx: { fillStyle: string; fillRect: (arg0: number, arg1: number, arg2: any, arg3: any) => void; }) {
    //         ctx.fillStyle = 'black';
    //         ctx.fillRect(0,0,canvas.width, canvas.height);
    //     }

    //     setCanvasSize(canvas: { height: number; width: number; }) {
    //         canvas.height = this.map.length * this.tileSize;
    //         canvas.width = this.map[0].length * this.tileSize;
    //     }
    // }


    return (
        <div style={{ color: 'white' }}>

        </div>
    )
}

export default TileMap