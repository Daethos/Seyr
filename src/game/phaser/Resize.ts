
export const resizeGame = (): void => {
    let game_ratio: number = 640 / 960;

    let div = document.getElementById('story-game')!;
    div.style.width = (window.innerHeight * game_ratio) + 'px';
    div.style.height = window.innerHeight + 'px';

    let canvas = document.getElementsByTagName('canvas')[0];

    let dpi_w: number = (parseInt(div.style.width) / canvas.width);
    let dpi_h: number = (parseInt(div.style.height) / canvas.width);

    let height: number = window.innerHeight * (dpi_w / dpi_h);
    let width: number = height * game_ratio;

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
};