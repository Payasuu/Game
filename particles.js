class Particles {
    constructor (game) {
        this.game = game;
        this.markForDeletion = false
    }

    update () {
        if (this.size < 0.5) this.markForDeletion = true;
        this.x -= this.speedX;
        this.y -= this.speedY;
        this.size *= 0.95;
    }
}

export class Dust extends Particles {
    constructor (game, x, y) {
        super(game);
        this.x = x;
        this.y = y;
        this.speedX = Math.random() * 2;
        this.speedY = Math.random();
        this.size = Math.random() * 6 + 6;
    }

    draw (ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 20);
        ctx.fillStyle = 'rgb(250, 250, 250, 0.1)';
        ctx.fill();
    }
}