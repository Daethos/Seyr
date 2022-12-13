import Phaser from "phaser";

export default function createVirtualJoystick(game) {
    // Create the virtual joystick
    var joystick = game.plugins.add(Phaser.VirtualJoystick);
  
    // Set the size and position of the joystick
    joystick.fixedTop = 10;
    joystick.fixedLeft = 10;
    joystick.fixedBottom = null;
    joystick.fixedRight = null;
    joystick.baseSprite.width = 200;
    joystick.baseSprite.height = 200;
  
    // Create a circle that represents the movement area of the joystick
    var circle = game.add.graphics(0, 0);
    circle.lineStyle(2, 0xffffff);
    circle.beginFill(0x000000, 0);
    circle.drawCircle(100, 100, 100);
  
    // Set the movement area of the joystick to be the circle we just created
    joystick.touchMoveCircle = circle;
  
    // Return the joystick so it can be used in the game
    return joystick;
  }
  