export class Background {
    constructor (game) {
        this.game = game;
        this.width = 2048;
        this.height = 800;
        this.x = 0;
        this.y = 0;
        this.layer1Image = backgroundImage1;
        this.layer2Image = backgroundImage2;
        this.layer3Image = backgroundImage3;
        this.layer4Image = backgroundImage4;
        this.layer5Image = backgroundImage5;
        this.layer6Image = backgroundImage6;
        this.layer7Image = backgroundImage7;
        this.layer1 = new Layer(this.game, this.layer1Image, 0.2, this.width, this.height);
        this.layer2 = new Layer(this.game, this.layer2Image, 0.4, this.width, this.height);
        this.layer3 = new Layer(this.game, this.layer3Image, 0.6, this.width, this.height);
        this.layer4 = new Layer(this.game, this.layer4Image, 1.2, this.width, this.height);
        this.layer5 = new Layer(this.game, this.layer5Image, 1, this.width, this.height);
        this.layer6 = new Layer(this.game, this.layer6Image, 1.2, this.width, this.height);
        this.layer7 = new Layer(this.game, this.layer7Image, 2, this.width, this.height);
        this.layer = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5, this.layer6, 
                      this.layer7
        ]
    }

    update () {
        this.layer.forEach(layer => {
            layer.update();
        })
    }

    draw (ctx) {
        this.layer.forEach(layer => {
            layer.draw(ctx);
        })
    }
}

class Layer {
    constructor (game, image, speed, width, height) {
        this.game = game;
        this.image = image;
        this.speedModifier = speed;
        this.width = width;
        this.height = height;
        this.gameSpeed = this.game.speed;
        this.x = 0;
        this.y = 0;
    }

    update () {
        this.x -= this.speedModifier * this.game.speed;
        if (this.x < 0 - this.width) {
            this.x = 0
        }
    }

    draw (ctx) {
        ctx.drawImage(this.image, this.x + this.speedModifier, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width - this.speedModifier, this.y, this.width, this.height)
    }
}