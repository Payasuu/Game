export class UI {
    constructor (game) {
        this.game = game;
        this.fontSize = 40;
        this.fontFamily = 'Arial'
    }

    draw (ctx) {
        ctx.font = this.fontSize + 'px ' + this.fontFamily;
        ctx.textAlign = 'left';
        ctx.fillStyle = 'black';
        ctx.fillText('Score: ' + this.game.score, 20, 50)

        ctx.fillText('Time: ' + this.game.time, 20, 90)
    }
}