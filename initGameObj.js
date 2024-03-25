let hu = screen.height / 100
let wu = screen.width / 100

import {context} from "./main.js"

export let GameObjects = []

export let circles = new Map()

export class GameObject {
    constructor(img, x, y, width, height) {
        this.img = img
        this.x = x
        this.y = y
        this.width = width
        this.height = height

        // collision [direction] = [ true/false , object collided with ]
        this.collision = []
        this.col = []

        this.response = new SAT.Response()

        this.hit = false

        GameObjects.push(this)
        
        circles.set(this, (new SAT.Circle(new SAT.Vector((this.x+(this.height/2)),(this.y+(this.width/2))), this.width/2)))
    }

    maxX() {
        return this.x + this.width
    }

    maxY() {
        return this.y + this.height
    }

    draw() {
        if (this.hit) {
            context.filter = `invert(1)`
            setTimeout(() => {
            context.filter = `invert(0)`
                this.hit = false
            }, 100);
            context.drawImage(this.img, this.x, this.y, this.width, this.height)
        }
        else {
            context.filter = `invert(0)`
            context.drawImage(this.img, this.x, this.y, this.width, this.height)
        }
    }

    collide () {
        this.col = [false, undefined]
        this.collision["left"] = [false, undefined]
        this.collision["right"] = [false, undefined]
        this.collision["up"] = [false, undefined]
        this.collision["down"] = [false, undefined]

        circles.get(this).pos.x = this.x+(this.width/2)
        circles.get(this).pos.y = this.y+(this.height/2)

        
        for (let obj of GameObjects) {
            if (SAT.testCircleCircle(circles.get(this), circles.get(obj), this.response) && this != obj) {
                this.col = [true, obj]
            }    
        }    
        
        // for (let obj of GameObjects) {
        //     if (obj != this) {
        //         if (
        //             (obj.maxX() < this.maxX() && obj.maxX() >= this.x) && 
        //             (obj.y == this.y || obj.maxY() < this.maxY() && obj.maxY() > this.y || obj.y < this.maxY() && obj.y > this.y || obj.y < this.y && obj.maxY() > this.maxY())
        //             ) {
        //                 this.collision["left"] = [true, obj]
        //                 this.col = [true, obj]
        //             }
        //         if (
        //             (obj.x > this.x && obj.x <= this.maxX()) && 
        //             (obj.y == this.y || obj.maxY() < this.maxY() && obj.maxY() > this.y || obj.y < this.maxY() && obj.y > this.y || obj.y < this.y && obj.maxY() > this.maxY())
        //             ) {
        //                 this.collision["right"] = [true, obj]
        //                 this.col = [true, obj]
        //             }
        //         if (
        //             (obj.y > this.y && obj.y <= this.maxY()) && 
        //             (obj.x == this.x || obj.maxX() < this.maxX() && obj.maxX() > this.x || obj.x < this.maxX() && obj.x > this.x || obj.x < this.x && obj.maxX() > this.maxX())
        //             ) {
        //                 this.collision["up"] = [true, obj]
        //                 this.col = [true, obj]
        //             }
        //         if (
        //             (obj.maxY() < this.maxY() && obj.maxY() >= this.y) && 
        //             (obj.x == this.x || obj.maxX() < this.maxX() && obj.maxX() > this.x || obj.x < this.maxX() && obj.x > this.x || obj.x < this.x && obj.maxX() > this.maxX())
        //             ) {
        //                 this.collision["down"] = [true, obj]
        //                 this.col = [true, obj]
        //             }
        //     }
        // }       
        
        
    }
}

