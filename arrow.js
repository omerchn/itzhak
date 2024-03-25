let hu = screen.height/100
let wu = screen.width/100

import { GameObject } from "./initGameObj.js";
import { itzhak } from "./player.js";
import { context } from "./main.js";

export let arrows = []
let ARROWRIGHT_IMG
let ARROWLEFT_IMG
let ARROWUP_IMG
let ARROWDOWN_IMG

export function initArrow() {
    ARROWRIGHT_IMG = new Image()
    ARROWRIGHT_IMG.src = "media/arrowRight.svg"
    ARROWLEFT_IMG = new Image()
    ARROWLEFT_IMG.src = "media/arrowLeft.svg"
    ARROWUP_IMG = new Image()
    ARROWUP_IMG.src = "media/arrowUp.svg"
    ARROWDOWN_IMG = new Image()
    ARROWDOWN_IMG.src = "media/arrowDown.svg"
    arrows.push(new Arrow(ARROWRIGHT_IMG, itzhak.x, itzhak.y, 2*wu, 2*wu, itzhak))
}

class Arrow extends GameObject {
    constructor(img, x, y, width, height, player) {
        super(img, x, y, width, height)
        this.player = player
    }

    draw() {
        switch (this.player.facing) {
            case "Right" :
                this.img = ARROWRIGHT_IMG
                this.x = this.player.maxX()+this.width
                this.y = this.player.y
                break
            case "Left" :
                this.img = ARROWLEFT_IMG
                this.x = this.player.x-this.width*2
                this.y = this.player.y
                break
                
            case "Up" :
                this.img = ARROWUP_IMG
                this.x = this.player.x
                this.y = this.player.y-this.width*2
                break
            case "Down" :
                this.img = ARROWDOWN_IMG
                this.x = this.player.x
                this.y = this.player.maxY()+this.width
                break
                
        }
        if (this.player.shootLeft || this.player.shootRight || this.player.shootUp || this.player.shootDown) {
            context.drawImage(this.img, this.x, this.y, this.width, this.height)
        }
    }
} 