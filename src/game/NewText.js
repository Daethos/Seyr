import Phaser from 'phaser';

export default class NewText {
    constructor(ctx, x, y, string, style, origin) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.text = string;
        this.code = style;
        this.style = this.initStyle(style);
        this.origin = this.initOrigin(origin);
        this.obj = this.createText();
        if (this.code.toLowerCase() === 'play') {
            this.getBorder(this.obj);
        }
    }

    initStyle(key) {
        console.log(key, 'The Key of the new Text')
        let style = {
            fontFamily: 'Cinzel',
            fontSize: 16,
            color: '#fdf6d8',
            backgroundColor: '#800080',
            stroke: '#FFFFFF',
            strokeThickness: 2,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000000',
                blur: 2,
                stroke: true,
                fill: true
            },
            align: 'center',
            padding: 5,
        };
        switch (key.toLowerCase()) {
            case 'title':
                style.fontSize = 32;
                break;
            case 'preload':
                style.fontSize = 24;
                break;
            case 'play':
                style.strokeThickness = 1;
                style.shadow.blur = 1;
                break;
        }
        return style;
    }

    initOrigin(origin) {
        if (typeof origin === 'number') {
            return {
                x: origin,
                y: origin
            }
        } else if (typeof origin === 'object') {
            return origin;
        }

        return {
            x: 0.5,
            y: 0.5
        }
    }

    createText () {
        console.log(this.style, 'THis Style')
        let obj = this.ctx.add.text(
            this.x,
            this.y,
            this.text,
            this.style,
        );

        obj.setOrigin(this.origin.x, this.origin.y);

        return obj;
    }

    destroy () {
        this.obj.destroy();

        this.obj = false;
    }

    getBorder(text) {
        console.log('Get Border')
        let container = this.ctx.add.container(
          // Set container position to the top-left corner of the text
          text.x - text.width * text.originX,
          text.y - text.height * text.originY
        );
        container.add(text);
        container.setSize(text.width, text.height);
        container.setInteractive();
        container.setScrollFactor(0, 0);
      
        // Add a border to the container
        let border = this.ctx.add.rectangle(
          // Set border position to the top-left corner of the container
          container.x,
          container.y,
          container.width,
          container.height,
          0xFFFFFF,
          1
        );
        container.add(border);
      
        return container;
      }
      

    // Setters 
    setText(string) {
        this.obj.text = string;
        this.obj.setText(string);
    }
    setX(x) {
        this.x = x;
        this.obj.setX(x);
    }
    setY(y) {
        this.y = y;
        this.obj.setY(y);
    }
    setOrigin(origin) {
        this.origin = this.initOrigin(origin);
        this.obj.setOrigin(origin);
    }
    setDepth(depth) {
        this.obj.setDepth(depth);
    }
    setScrollFactor(scrollX, scrollY) {
        this.obj.setScrollFactor(scrollX, scrollY);
    }

    // Getters 
    getCenter() {
        return this.obj.getCenter();
    }
    getTopLeft() {
        return this.obj.getTopLeft();
    }
    getTopRight() {
        return this.obj.getTopRight();
    }
    getBottomLeft() {
        return this.obj.getBottomLeft();
    }
    getBottomRight() {
        return this.obj.getBottomRight();
    }
}