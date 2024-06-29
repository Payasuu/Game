import { Idle, Walk, Running, Flying, Jump, Defense, Slide } from "./state.js";
import { Collision } from "./collision.js";
export class Player {
    constructor (game) {
        this.game = game;
        this.width = 110;
        this.height = 100;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.image = playerImage;
        this.marginGround = 80
        this.fps = 20;
        this.frameInterval = 1000 / this.fps
        this.frameTimer = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 13;
        this.speed = 0;
        this.vy = 0;
        this.weight = 1;
        this.state = [new Idle(this.game), new Walk(this.game), new Running(this.game), new Flying(this.game),
                      new Jump(this.game), new Defense(this.game), new Slide(this.game)
        ];
        this.currentState = this.state[0];
        

    }
    stateHandler (state, speed) {
        this.game.speed = speed * this.game.maxSpeed;
        this.currentState = this.state[state];
        this.currentState.enter();
    }

    update (deltaTime, input) {
        this.checkCollision()
        this.currentState.stateChanger(input)
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
        // horizontal movements
        this.x += this.speed;
        if (input.includes('ArrowRight') && this.currentState !== this.state[6]) {
            this.speed = 8;
        }

        else if (input.includes('ArrowLeft') && this.currentState !== this.state[6]) {
            this.speed = -6;
        }

        else if (input.includes('ArrowUp') && this.onGround()) {
            this.vy -= 20;
           
        }
        else {
            this.speed = 0;
        }
        if (this.x < 0) this.x = 0;
        else if (this.x > this.game.width - this.width/2) this.x = this.game.width - this.width/2

        // vertical movements
        this.y += this.vy;
        if (!this.onGround()) {
            this.vy += this.weight;
        }
        else {
            this.vy = 0;
        }
        if (this.y > this.game.height - this.height - this.marginGround) {
            this.y = this.game.height - this.height - this.marginGround
        }
        else if (this.y < 0) this.y = 0;
        
    }
    onGround () {
        return this.y >= this.game.height - this.height - this.marginGround;
    }
    draw (ctx) {
        ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    
    checkCollision () {
        this.game.enemies.forEach(enemy => {
            if (enemy.x < this.x + this.width /2&& 
                enemy.x + enemy.spriteWidth > this.x &&
                enemy.y < this.y + this.height && 
                enemy.y + enemy.spriteHeight > this.y
            ){
                enemy.markForDeletion = true;
                this.game.score++;
                this.game.collision.push(new Collision(this, enemy.x, enemy.y))
                if (this.currentState === this.state[3] ||
                    this.currentState === this.state[6]
                ){}
                else {
                    this.stateHandler(5, 0)
                    this.game.lives--;
                    if (this.game.lives <= 0) {
                        this.game.gameOver = true;
                    }
                }
            }
        });
    }
}