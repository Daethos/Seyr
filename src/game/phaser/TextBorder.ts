export const addBorderToText = (game: { add: { container: (arg0: number, arg1: number) => any; rectangle: (arg0: any, arg1: any, arg2: any, arg3: any, arg4: number, arg5: number) => any; }; }, text: { x: number; width: number; originX: number; y: number; height: number; originY: number; }) => {
    let container = game.add.container(
      text.x - text.width * text.originX,
      text.y - text.height * text.originY
    );
    container.add(text);
    container.setSize(text.width, text.height);
    container.setInteractive();
    container.setScrollFactor(0, 0);
  
    let border = game.add.rectangle(
      container.x,
      container.y,
      container.width,
      container.height,
      0xFFFFFF,
      1
    );
    container.add(border);
  
    return container;
};
