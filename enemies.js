let hu = screen.height/100
let wu = screen.width/100

export let enemies = []
export let ENEMY_IMG
export let ENEMY_IDLE_IMG
export let ENEMY_SHOOTER_IMG

export let i = 1
const ran = [-1,1]

import {GameObject, circles} from "./initGameObj.js"
import {itzhak} from "./player.js"
import { Shot, shots, createShot } from "./shots.js"
import { deleteObj } from "./deleteObj.js"
import { initRoll } from "./items.js"

export function initEnemies() {
    ENEMY_IMG = new Image()
    ENEMY_IMG.src = "media/ENEMY.png"
    ENEMY_IDLE_IMG = new Image()
    ENEMY_IDLE_IMG.src = "media/IDLE.png"
    ENEMY_SHOOTER_IMG = new Image()
    ENEMY_SHOOTER_IMG.src = "media/SHOOTER.png"
                            // img , x , y , width , height , speed , hp, type
    enemies.push(new Enemy(ENEMY_IDLE_IMG, 47.5*wu, 90*hu, 5*wu, 5*wu, 0.2*wu, 30, "attacker"))
    // enemies.push(new Enemy(ENEMY_SHOOTER_IMG, 47.5*wu, 90*hu, 5*wu, 5*wu, 0.2*wu, 30, "shooter"))
}

export class Enemy extends GameObject {
    constructor(img, x, y, width, height, speed, hp, type) {
        super(img, x, y, width, height)
        
        this.tempX = x
        this.tempY = y

        this.speed = speed
        this.speedX
        this.speedY

        this.hp = hp

        this.type = type

        this.attack = false
        this.randDir = getRandDir(this)
        
        this.target = "player"
        if (this.type == "shooter") {
            this.img = ENEMY_SHOOTER_IMG
            this.shootinter = setInterval(() => {
                if ((itzhak.maxX() < this.x)&&(itzhak.y == this.y || itzhak.maxY() < this.maxY() && itzhak.maxY() > this.y || itzhak.y < this.maxY() && itzhak.y > this.y || itzhak.y < this.y && itzhak.maxY() > this.maxY())) {
                createShot("Left", this)
                }
                if ((itzhak.x > this.maxX())&&(itzhak.y == this.y || itzhak.maxY() < this.maxY() && itzhak.maxY() > this.y || itzhak.y < this.maxY() && itzhak.y > this.y || itzhak.y < this.y && itzhak.maxY() > this.maxY())) {
                createShot("Right", this)
                }
                if ((itzhak.maxY() < this.y)&&(itzhak.x == this.x || itzhak.maxX() < this.maxX() && itzhak.maxX() > this.x || itzhak.x < this.maxX() && itzhak.x > this.x || itzhak.x < this.x && itzhak.maxX() > this.maxX())) {
                createShot("Up", this)
                }
                if ((itzhak.y > this.maxY())&&(itzhak.x == this.x || itzhak.maxX() < this.maxX() && itzhak.maxX() > this.x || itzhak.x < this.maxX() && itzhak.x > this.x || itzhak.x < this.x && itzhak.maxX() > this.maxX())) {
                createShot("Down", this)
                }
            }, 1000);
        } else {

        }
    }

    updatePos() {

        if (this.attack) {
            this.speedX = ((itzhak.x-this.x)/((Math.abs(itzhak.x-this.x) + Math.abs(itzhak.y-this.y))))
            this.speedY = ((itzhak.y-this.y)/((Math.abs(itzhak.y-this.y) + Math.abs(itzhak.x-this.x))))
        } else {            
            this.speedX = this.randDir[0]
            this.speedY = this.randDir[1]
        }
        
        this.tempX += this.speedX * this.speed
        this.tempY += this.speedY * this.speed

        if(this.tempX < 0) {
            this.tempX = 0
        }

        if(this.tempX + this.width > screen.width){
            this.tempX = screen.width - this.width
        } 
        
        if(this.tempY < 0){
            this.tempY = 0
        }
        
        if(this.tempY + this.height > screen.height) {
            this.tempY = screen.height - this.height
        } 
        
        for (let shot of shots) {
            if (this.col[1] == shot && shot.target == "enemy") {
                this.hit = true
                this.hp -= itzhak.damage
                deleteObj(shot, shots)
                if (this.hp <= 0){
                    deleteObj(this, enemies) ; 
                    if (enemies.length == 0) {
                        // Cleared all enemies
                        initRoll()
                    }
                }
            }
        }
        
    }

    update() {

        this.x = this.tempX
        this.y = this.tempY

    }

}


function getRandDir(obj) {
    if (obj.type == "attacker") {
        obj.img = ENEMY_IDLE_IMG
        randomizeAttack(obj)
    } else {
        setTimeout(() => {
            obj.randDir = getRandDir(obj)
        }, 1000);
    }
    let randSpeedX = (Math.floor(Math.random() * 10) - 5) / 10
    let randSpeedY =  ran[Math.floor(Math.random() * 2)]*( 0.5 - Math.abs(randSpeedX) )
    return [randSpeedX,randSpeedY]
}

function randomizeAttack(obj) {
    let randTime = Math.floor(Math.random() * 2000) + 500
    setTimeout(() => {
        obj.attack = true
        obj.img = ENEMY_IMG
        setTimeout(() => {
            getRandDir(obj)
            obj.attack = false
        }, randTime*2);
    }, randTime);
}