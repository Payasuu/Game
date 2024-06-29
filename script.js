import { InputHandler } from "./input.js";
import { Player } from "./player.js";
import { Background } from "./background.js"
import { Zombie, FlyingEnemy, Virus } from "./enemy.js";
import { UI } from "./UI.js";
window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1200;
    canvas.height = 800;

    class Game {
        constructor (gameWidth, gameHeight) {
            this.width = gameWidth;
            this.height = gameHeight;
            this.speed = 0;
            this.maxSpeed = 3
            this.player = new Player(this);
            this.input = new InputHandler();
            this.background = new Background(this)
            this.ui = new UI(this);
            this.enemyInterval = 500;
            this.enemyTimer = 0;
            this.enemyType = ['zombie', 'bat', 'virus'];
            this.enemies = [];
            this.particles = [];
            this.collision = [];
            this.gameOver = false;
            this.score = 0;
            this.time = 0;
            this.maxTime = 100000;
            this.lives = 5;
        }
        //Adding enemy
        update (deltaTime) {
           if (this.enemyTimer > this.enemyInterval) {
            this.enemyTimer = 0;
            this.addEnemy();
           }
           else {
            this.enemyTimer += deltaTime;
           }
        //Deleting enemy from array
           this.enemies.forEach((enemy, index) => {
            if (enemy.markForDeletion) {
               this.enemies.splice(index, 1)
            }
           });
            this.background.update();

            this.player.update(deltaTime, this.input.keys);
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime)
            });
            this.particles.forEach((particles, index) => {
                particles.update();
                if (particles.markForDeletion) {
                    this.particles.splice(index, 1)
                }
            });
            this.collision.forEach((collision, index) => {
                collision.update(deltaTime);
                if(collision.markForDeletion) {
                    this.collision.splice(index, 1);
                }
            });
            this.time += deltaTime;
            if (this.time > this.maxTime) {
                this.gameOver = true;
            }
           
        }

        draw (ctx) {
            this.background.draw(ctx);
            this.player.draw(ctx)   
            this.enemies.forEach(enemy => {
                enemy.draw(ctx)
            });
            this.collision.forEach(collision => {
                collision.draw(ctx);
            });
            this.particles.forEach(particles => {
                particles.draw(ctx);
            });
            
           if (this.particles.length > 50) this.particles.length = 50;
           this.ui.draw(ctx);
        }
        
    addEnemy () {
        const randomEnemies = this.enemyType[Math.floor(Math.random() * this.enemyType.length)]
        if (randomEnemies === 'zombie' && this.speed > 0) {
        this.enemies.push(new Zombie(this))
        }
        else if (randomEnemies === 'bat') {
            this.enemies.push(new FlyingEnemy(this))
        }
        else if (randomEnemies === 'virus') {
            this.enemies.push(new Virus(this))
        }
    }
    }

    let lastTimeStamp = 0;
    const game = new Game(canvas.width, canvas.height);
    function animate (timeStamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const deltaTime = timeStamp - lastTimeStamp;
        lastTimeStamp = timeStamp;
        game.update(deltaTime);
        game.draw(ctx);

        if (!game.gameOver)requestAnimationFrame(animate);
    }
    animate(0);
});