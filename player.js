let hu = screen.height/100
let wu = screen.width/100

export let itzhak
let ITZHAK_IMG
export let itzhakCir

let fps = 0
let checkedFps = false

export let gameOver = false

import {GameObject, circles} from "./initGameObj.js"
import {enemies} from "./enemies.js"
import { initArrow } from "./arrow.js"
import { context } from "./main.js"
import { score } from "./items.js"
import { shots } from "./shots.js"

 
export function initItzhak() {
    ITZHAK_IMG = new Image()
    ITZHAK_IMG.src = "media/ITZHAK.png"
    itzhak = new Player(ITZHAK_IMG, 47.5 * wu, 90 * hu, 5 * wu, 5 * wu)

    initArrow()

    window.requestAnimationFrame(checkFps)

    setTimeout(() => {
        checkedFps = true
        console.log("refresh rate:",fps);
    }, 1000);
 
}

export class Player extends GameObject {
    constructor(img, x, y, width, height) {
        super(img, x, y, width, height)

        this.moveLeft = false
        this.moveRight = false
        this.moveUp = false
        this.moveDown = false

        this.shootLeft = false
        this.shootRight = false
        this.shootUp = false
        this.shootDown = false

        this.facing = "Right"

        this.speedX = 0
        this.speedY = 0

        //40,1
        this.speed = 30
        this.accl = 1*wu

        this.canStartShooting = true

        this.hp = 100
        this.damage = 20
        this.hitt

        this.target = "enemy"
    }

    updatePos() {    

        for (let shot of shots) {
            if (this.col[1] == shot && shot.target == "player" && !this.hitt) {
                this.hitMe()
            }
        }

        if (this.moveLeft && this.speedX > -this.speed*wu) {
            this.speedX -= this.accl
        } else if (this.speedX < 0) {
            this.speedX += this.accl
        }
        if (this.moveRight && this.speedX < this.speed*wu) {
            this.speedX += this.accl
        } else if (this.speedX > 0) {
            this.speedX -= this.accl
        }
        
        if (this.moveUp && this.speedY > -this.speed*wu) {
            this.speedY -= this.accl
        } else if (this.speedY < 0) {
            this.speedY += this.accl
        }
        if (this.moveDown && this.speedY < this.speed*wu) {
            this.speedY += this.accl
        } else if (this.speedY > 0) {
            this.speedY -= this.accl
        }

        if (enemies.includes(itzhak.col[1]) && !this.hitt) {
            this.hitMe()
        }
        document.getElementById("hp").value = this.hp
         

    }

    update() {
        if (this.speedX > this.accl || this.speedX < -this.accl) {
            this.x += this.speedX/fps
        }
        if (this.speedY > this.accl || this.speedY < -this.accl) {
            this.y += this.speedY/fps
        }

        if(this.x < 0) {
            this.x = 0
            this.speedX = 0    
        } 

        if(this.x + this.width > screen.width){
            this.x = screen.width - this.width
            this.speedX = 0    
        } 
        
        if(this.y < 0){
            this.y = 0
            this.speedY = 0
        }
        
        if(this.y + this.height > screen.height) {
            this.y = screen.height - this.height
            this.speedY = 0
        } 
    }

    hitMe() {
        this.hit = true
        this.hitt = true
        this.hp -= 10
        if (this.hp == 0 && !gameOver) {
            gameOver = true
            $("#endScreen").css('display', 'flex')
            $("#scorePrint").text(score)
            $("#restart").click(()=>{
                location.reload()
            })

        }
        setTimeout(() => {
            this.hitt = false
        }, 1000);
    }
}

function checkFps() {
    fps++
    !checkedFps ? window.requestAnimationFrame(checkFps) : null
}

