class Enemy {
    constructor (game) {
        this.game = game;
        this.frameX = 0;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps
        this.frameTimer = 0;
        this.markForDeletion = false
    }

    update (deltaTime) {
        this.x -= this.speed + this.game.speed;
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            }
            else {
                this.frameX = 0;
            }
        }
        else {
            this.frameTimer += deltaTime;
        }
        if (this.x < 0 - this.spriteWidth) {
            this.markForDeletion = true;
        }

    }
    draw (ctx) {
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight)
    }
}

export class Zombie extends Enemy {
    constructor (game) {
        super(game);
        this.x = this.game.width;
        this.y = this.game.height - this.game.player.height - this.game.player.marginGround;
        this.spriteWidth = 73;
        this.spriteHeight = 100;
        this.image = zombie;
        this.maxFrame = 4;
        this.speed = 2;
       
       
        
    }

}

export class FlyingEnemy extends Enemy {
    constructor (game) {
        super(game);
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.spriteWidth = 182;
        this.spriteHeight = 100;
        this.image = bat;
        this.maxFrame = 7;
        this.speed = 3;
        this.va = Math.random() * 0.1 + 0.1;
        this.angle = 0;
    }
    draw (ctx) {
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth / 2, this.spriteHeight / 2)
    }

    update (deltaTime) {
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);
    }
}

export class Virus extends Enemy {
    constructor (game) {
        super(game);
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.6
        this.spriteWidth = 103;
        this.spriteHeight = 100;
        this.image = virus;
        this.maxFrame = 6;
        this.speed = 2;
        this.va = Math.random() * 0.1
        this.angle = 0
    }
    draw (ctx) {
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth / 1.5, this.spriteHeight / 1.5)
    }
   update (deltaTime) {
        super.update(deltaTime)
        this.angle += this.va;
        this.y += Math.sin(this.angle);
    
   }
   
}