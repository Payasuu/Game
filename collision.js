export class Collision {
    constructor (game, x, y) {
        this.game = game;
        this.image = collisionImage
        this.x = x;
        this.y = y;
        this.spriteWidth = 100;
        this.spriteHeight = 90;
        this.maxFrame = 5;
        this.frameX = 0;
        this.markForDeletion = false
        this.fps = 15;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0
    }

    draw (ctx) {
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
    }

    update (deltaTime) {
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            }
            else {
                this.frameX = 0;
                this.markForDeletion = true;
            }
        }
        else {
            this.frameTimer += deltaTime
        }
        
    }
}