export const addBorderToText = (game, text) => {
    // Create a container for the text and border
    let container = game.add.container(
      // Set container position to the top-left corner of the text
      text.x - text.width * text.originX,
      text.y - text.height * text.originY
    );
    container.add(text);
    container.setSize(text.width, text.height);
    container.setInteractive();
    container.setScrollFactor(0, 0);
  
    // Add a border to the container
    let border = game.add.rectangle(
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
};
