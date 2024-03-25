let hu = screen.height/100
let wu = screen.width/100

let myInter

let canvas
export let context



import {setBinds, pause} from "./binds.js"
import {GameObjects, circles} from "./initGameObj.js"
import {itzhak, initItzhak, gameOver} from "./player.js"
import {initShots, shots} from "./shots.js"
import {enemies, initEnemies} from "./enemies.js"
import { initRoll } from "./items.js"

$(function(){ 
    canvas = document.getElementById("canvas")
    canvas.setAttribute("width", screen.width)
    canvas.setAttribute("height", screen.height)
    context = canvas.getContext("2d")

    initItzhak()
    initShots()
    
    $("#playButton").click(function(){

        $("#playButton").off()
        $("#startScreen").fadeOut()
    
        myInter = setInterval(() => {
            startAnim()
        }, 1)

        setInterval(() => {
            if (!pause) {
                itzhak.updatePos()
                for (let enemy of enemies) {
                    enemy.updatePos()
                }
            }
        }, 15)

        setInterval(() => {
            if (!pause) {
                for (let shot of shots) {
                    shot.updatePos()
                }        
            }
        }, 2)
        
        
        window.requestAnimationFrame(run)
    })
})


export function run(milis) {
    collide()
    update()
    render()
    if (!gameOver && !pause)
    window.requestAnimationFrame(run)
}

function startAnim() {    
    
    if (itzhak.width < 5*wu) {
        itzhak.width += 0.03*wu
        itzhak.height += 0.03*wu
    }
    if (itzhak.y > 45*hu) {
        itzhak.y -= 0.26*hu
    } else {
        initEnemies()
        setBinds()
        clearInterval(myInter)
    }
}

function update() {
    itzhak.update()
    for (let shot of shots) {
        shot.update()
    }
    for (let enemy of enemies) {
        enemy.update()
    }
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height)

    for (let obj of GameObjects) {
        obj.draw()
    }

}

function collide() {
    for (let obj of GameObjects) {
        obj.collide()
    }
}
