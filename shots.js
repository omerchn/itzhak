let hu = screen.height/100
let wu = screen.width/100

export let shots = []

let SHOT_IMG

export let shotVelocity = {enemy:0.2*wu, player:0.15*wu}
export let shotSize = {s:2*wu}

//300
let shotCurve = 300

export let fireRate = {r:500}

import {GameObject, GameObjects, circles} from "./initGameObj.js"
import {itzhak} from "./player.js"
import {enemies} from "./enemies.js"


import {dirs} from "./binds.js"

import {deleteObj} from "./deleteObj.js"



export class Shot extends GameObject {
    constructor(x, y, dir, sX, sY, size, target) {
        super(SHOT_IMG, x, y, size, size)
        this.dir = dir
        this.tempX = x
        this.tempY = y

        this.target = target

        if (this.dir == "Left" || this.dir == "Right") {
            this.shotSway = sY
        } else {
            this.shotSway = sX
        }
    }

    updatePos() {
        this.dir == "Left" ? this.tempX -= shotVelocity[this.target] : null
        this.dir == "Right" ? this.tempX += shotVelocity[this.target] : null
        this.dir == "Up" ? this.tempY -= shotVelocity[this.target] : null
        this.dir == "Down" ? this.tempY += shotVelocity[this.target] : null

        if (this.dir == "Left" || this.dir == "Right") {
            this.tempY += this.shotSway/shotCurve
        } else {
            this.tempX += this.shotSway/shotCurve
        }
        

    }

    update() {
        if (this.tempX > -2*wu && this.tempX < screen.width) {
            this.x = this.tempX
        } else {
            deleteObj(this, shots)
        }
        if (this.tempY > -2*hu && this.tempY < screen.height) {
            this.y = this.tempY
        } else {
            deleteObj(this, shots)
        }
    }
}

export function initShots() {
    SHOT_IMG = new Image()
    SHOT_IMG.src = "media/SHOT.png"
    
    shootInter()
    function shootInter() {
        shoot()
        setTimeout(() => {
            shootInter()
        }, fireRate.r);
    }
}

function shoot() {
    for (let d of dirs) {
        itzhak["shoot"+d] == true ? createShot(d) : null
    }
}

export function createShot(dir, obj=itzhak) {
    if (obj == itzhak) {
        shots.push(new Shot(obj.x, obj.y, dir, obj.speedX, obj.speedY, shotSize.s, obj.target))
    } else {
        shots.push(new Shot(obj.x, obj.y, dir, obj.speedX, obj.speedY, obj.width/2, obj.target))
    }
}