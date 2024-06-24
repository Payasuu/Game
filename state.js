import { Dust, Fire } from "./particles.js";
const states = {
    IDLE: 0,
    WALK: 1,
    RUNNING: 2,
    FLYING: 3,
    JUMP: 4,
    DEFENSE: 5,
    SLIDE: 6
}

class State {
    constructor (game) {
        this.game = game;
        this.maxTimer = 20;
        this.timer = 0;
        
    }
}
export class Idle extends State {
    constructor (game) {
        super(game);
    }

    enter () {
        this.game.player.maxFrame = 0
        this.game.player.frameY = 0;
        this.game.player.maxFrame = 13;
    }

    stateChanger (input) {
        if (input.includes('ArrowRight')) {
            this.game.player.stateHandler(states.RUNNING, 1.5)
        }
        else if (input.includes('ArrowLeft')) {
            this.game.player.stateHandler(states.WALK, 0.6)
        }
        else if (input.includes('ArrowUp')) {
            this.game.player.stateHandler(states.JUMP, 1)
        }
        else if (input.includes(' ')) {
            this.game.player.stateHandler(states.FLYING, 3)
        }
        else if (input.includes('z')) {
            this.game.player.stateHandler(states.DEFENSE, 0)
        }
        else if (input.includes('ArrowDown') && this.game.player.onGround()) {
            this.game.player.stateHandler(states.SLIDE, 1.5);
        }
    }
}
export class Walk extends State {
    constructor (game) {
        super(game);
    }

    enter () {
        this.game.player.maxFrame = 0
        this.game.player.frameY = 1;
        this.game.player.maxFrame = 9;
       
    }

    stateChanger (input) {
        this.game.particles.push(new Dust(this, this.game.player.x + (this.game.player.width * 0.3), this.game.player.y + this.game.player.height))
        
        if (input.includes('ArrowRight')) {
            this.game.player.stateHandler(states.RUNNING, 1.5)
        }
        else if (input.includes(' ')) {
            this.game.player.stateHandler(states.FLYING, 3)
        }
        else if (input.includes('ArrowUp')) {
            this.game.player.stateHandler(states.JUMP, 1)
        }
        else if (input.includes('z') && this.game.player.onGround()) {
            this.game.player.stateHandler(states.DEFENSE, 0);
        }
        else if (input.includes('ArrowDown') && this.game.player.onGround()) {
            this.game.player.stateHandler(states.SLIDE, 1.5);
        }
    }
}
export class Running extends State {
    constructor (game) {
        super(game);
    }

    enter () {
        this.game.player.maxFrame = 0
        this.game.player.frameY = 2;
        this.game.player.maxFrame = 7;
    }

    stateChanger (input) {
        this.game.particles.push(new Dust(this, this.game.player.x + (this.game.player.width * 0.3), this.game.player.y + this.game.player.height))
        if (!input.includes('ArrowRight')) {
            this.game.player.stateHandler(states.WALK, 0.6)
        }
        else if (input.includes(' ')) {
            this.game.player.stateHandler(states.FLYING, 3)
        }
        else if (input.includes('z') && this.game.player.onGround()) {
            this.game.player.stateHandler(states.DEFENSE, 0);
        }
        else if (input.includes('ArrowDown') && this.game.player.onGround()) {
            this.game.player.stateHandler(states.SLIDE, 1.5);
        }
    }
}

export class Flying extends State {
    constructor (game) {
        super(game);
    }

    enter () {
        this.game.player.maxFrame = 0
        this.game.player.frameY = 3;
        this.game.player.maxFrame = 6;
        this.game.player.weight = 0;
        
        
    }

    stateChanger (input) {
        this.game.particles.push(new Fire(this, this.game.player.x + (this.game.player.width * 0.5), this.game.player.y + (this.game.player.height * 0.5)))
        if (this.game.player.x > this.game.width - this.game.player.width) this.game.player.x = this.game.width - this.game.player.width
        if (input.includes('ArrowRight')) {
            this.game.player.speed += 15;
        }
        else if (input.includes('ArrowLeft')) {
            this.game.player.speed = -15;
        }
        else if (input.includes('ArrowDown')) {
            this.game.player.vy = 15;
            
        }
        else if (input.includes('ArrowUp')) {
            this.game.player.vy = -15;
        }
        else if (!input.includes(' ')) {
            this.game.player.stateHandler(states.JUMP, 1);
        }
        else {
            this.game.player.vy = 0;
        }
    
    }
}

export class Jump extends State {
    constructor (game) {
        super(game);
    }

    enter () {
        this.game.player.maxFrame = 0
        this.game.player.frameY = 5;
        this.game.player.maxFrame = 5;
        this.game.player.weight = 1;
       
        
    }

    stateChanger (input) {
        
        if (this.game.player.onGround()) {
            this.game.player.stateHandler(states.WALK, 0.6)
        }
       
    }
}

export class Defense extends State {
    constructor (game) {
        super(game);
    }

    enter () {
        this.game.player.maxFrame = 0
        this.game.player.frameY = 6;
        this.game.player.maxFrame = 2;
   
    }

    stateChanger (input) {
        
        if (!input.includes('z') && this.game.player.onGround()) {
            this.game.player.stateHandler(states.IDLE, 0)
        }
        else if (input.includes('ArrowRight')) {
            this.game.player.speed = 0;
        }
        else if (input.includes('ArrowLeft')) {
            this.game.player.speed = 0;
        }
        else if (input.includes('ArrowUp')) {
            this.game.player.y = this.game.width - this.game.player.height;
        }
    }
}

export class Slide extends State {
    constructor (game) {
        super(game);
    }

    enter () {
        this.game.player.maxFrame = 0
        this.game.player.frameY = 7;
        this.game.player.maxFrame = 2;
        
        
    }

    stateChanger (input) {
        if (this.timer > this.maxTimer) {
            this.timer = 0
            
            this.game.player.stateHandler(states.WALK, 0.6)
        }
        else {
            this.timer ++;
            this.game.player.speed += this.timer
        }
       
    }
}