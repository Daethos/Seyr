export default class NewText {
    constructor(ctx, x, y, string, style, origin, game) {
        this.game = game;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.text = string;
        this.code = style;
        this.style = this.initStyle(style);
        this.origin = this.initOrigin(origin);
        this.obj = this.createText();
    };

    initStyle(key) {
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
            wordWrap: {
                width: 340,
                useAdvancedWrap: true
            },
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
        };
        return style;
    };

    initOrigin(origin) {
        if (typeof origin === 'number') {
            return {
                x: origin,
                y: origin
            };
        } else if (typeof origin === 'object') {
            return origin;
        };

        return {
            x: 0.5,
            y: 0.5
        };
    };

    createText () {
        let obj = this.ctx.add.text(
            this.x,
            this.y,
            this.text,
            this.style,
        );

        obj.setOrigin(this.origin.x, this.origin.y);
        return obj;
    };

    destroy () {
        this.obj.destroy(); 
        this.obj = false;
    };
      
    // Setters 
    setText(string) {
        this.obj.text = string;
        this.obj.setText(string);
    };
    setX(x) {
        this.x = x;
        this.obj.setX(x);
    };
    setY(y) {
        this.y = y;
        this.obj.setY(y);
    };
    setOrigin(origin) {
        this.origin = this.initOrigin(origin);
        this.obj.setOrigin(origin);
    };
    setDepth(depth) {
        this.obj.setDepth(depth);
    };
    setScrollFactor(scrollX, scrollY) {
        this.obj.setScrollFactor(scrollX, scrollY);
    };

    // Getters 
    getCenter() {
        return this.obj.getCenter();
    };
    getTopLeft() {
        return this.obj.getTopLeft();
    };
    getTopRight() {
        return this.obj.getTopRight();
    };
    getBottomLeft() {
        return this.obj.getBottomLeft();
    };
    getBottomRight() {
        return this.obj.getBottomRight();
    };
};