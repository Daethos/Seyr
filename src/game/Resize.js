
export const resizeGame = () => {
    // Width-Height Ration of Game Resolution
    let game_ratio = 360 / 640;

    // Make Div Full Height of Browser and Keep the Ratin of Game Resolution
    let div = document.getElementById('story-game');
    div.style.width = (window.innerHeight * game_ratio) + 'px';
    div.style.height = window.innerHeight + 'px';

    // Check if Device DPI messes up the Width-Height Ratio
    let canvas = document.getElementsByTagName('canvas')[0];

    let dpi_w = (parseInt(div.style.width) / canvas.width);
    let dpi_h = (parseInt(div.style.height) / canvas.width);

    let height = window.innerHeight * (dpi_w / dpi_h);
    let width = height * game_ratio;

    // Scale Canvas
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

}