import Phaser from "phaser";

export default function createVirtualJoystick(game) {
    var joystick = game.plugins.add(Phaser.VirtualJoystick);
  
    joystick.fixedTop = 10;
    joystick.fixedLeft = 10;
    joystick.fixedBottom = null;
    joystick.fixedRight = null;
    joystick.baseSprite.width = 200;
    joystick.baseSprite.height = 200;
  
    var circle = game.add.graphics(0, 0);
    circle.lineStyle(2, 0xffffff);
    circle.beginFill(0x000000, 0);
    circle.drawCircle(100, 100, 100);
  
    joystick.touchMoveCircle = circle;
  
    return joystick;
  }
  