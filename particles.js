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

export class Fire extends Particles {
    constructor (game, x, y) {
        super(game);
        this.image = fireImage;
        this.x = x;
        this.y = y;
        this.speedX = 1;
        this.speedY = 1;
        this.size = Math.random() * 100 + 100;
        this.angle = 0;
        this.va = Math.random() * 0.2 - 0.1;
    }

    update () {
        super.update();
        this.angle += this.va;
        this.x += Math.sin(this.angle);
    }

    draw (ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.size * 0.2, this.size * 0.2);
       
    }
}