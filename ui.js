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
        ctx.fillText('Time: ' + Math.floor(this.game.time * 0.001), 20, 90)
        for (let i = 0; i < this.game.lives; i++) {
            ctx.drawImage(liveImage, 30 * i + 20, 100)
        }
        
        if (this.game.gameOver) {
            if (this.game.score > 100) {
            ctx.fillText('YOU WIN!', 502, 303)
            ctx.fillStyle = 'white';
            ctx.fillText('YOU WIN!', 500, 300);
            }
        else {
            ctx.fillText('GAME OVER!', 502, 303)
            ctx.fillStyle = 'white';
            ctx.fillText('GAME OVER!', 500, 300);
            }

        }
    }
    
}
