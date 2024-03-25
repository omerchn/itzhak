import {itzhak} from "./player.js"
import {createShot, fireRate} from "./shots.js"
import {run} from "./main.js"

export let dirs = ["Left", "Right", "Up", "Down"]

export let pause = false

//arrow keys: 37,39,38,40

let shootLeftBind =  '37'
let shootRightBind = '39'
let shootUpBind =    '38'
let shootDownBind =  '40'

let dir

export function setBinds() {
    console.log("set binds");
    $("#message").click(()=>{
        if (pause) {
            pause = false
            $("#message").text("")
            window.requestAnimationFrame(run)
        }
    })
    $(document).keydown(function (event) {
        let key = (event.keyCode ? event.keyCode : event.which)

        // pause 
        if (key == '27') {
            pause = !pause
            if (!pause) {
                $("#message").text("")
                window.requestAnimationFrame(run)
            } else {
                $("#message").html("PAUSED<div style='font-size: 1vw'>click here to unpause</div>")
            }
        }

        // left
        if (key == '65') {
            itzhak.moveLeft = true
        }

        // right
        if (key == '68') {
            itzhak.moveRight = true
        }

        // up
        if (key == '87') {
            itzhak.moveUp = true
        }
        
        // down
        if (key == '83') {
            itzhak.moveDown = true
        }        
        
        // SHOOT //

        //shoot left
        if (key == shootLeftBind) {
            shoot("Left")
        }

        //shoot right
        if (key == shootRightBind) {
            shoot("Right")
        }

        //shoot up
        if (key == shootUpBind) {
            shoot("Up")
        }

        //shoot down
        if (key == shootDownBind) {
            shoot("Down")        
        }        

        
    })
    $(document).keyup(function (event) {
        let key = (event.keyCode ? event.keyCode : event.which)

        // left
        if (key == '65') {
            itzhak.moveLeft = false

        }

        // right
        if (key == '68') {
            itzhak.moveRight = false

        }

        // up
        if (key == '87') {
            itzhak.moveUp = false

        }   
        
        // down
        if (key == '83') {
            itzhak.moveDown = false

        }         
        
        // SHOOT //

        //shoot left
        if (key == shootLeftBind) {
            itzhak.shootLeft = false
        }

        //shoot right
        if (key == shootRightBind) {
            itzhak.shootRight = false
        }

        //shoot up
        if (key == shootUpBind) {
            itzhak.shootUp = false
        }
        
        //shoot down
        if (key == shootDownBind) {
            itzhak.shootDown = false
        }   
        

    })

    document.addEventListener("visibilitychange", ()=>{
        itzhak.moveLeft = false
        itzhak.moveRight = false
        itzhak.moveUp = false
        itzhak.moveDown = false
        itzhak.shootLeft = false
        itzhak.shootRight = false
        itzhak.shootUp = false
        itzhak.shootDown = false
    })
}

function clear() {
    for (let d of dirs) {
        itzhak["shoot"+d] = false
    }
}

function shoot(dir) {
    itzhak.facing = dir
    if (!itzhak["shoot"+dir]) {
        clear()
        if (itzhak.canStartShooting) {
            itzhak.canStartShooting = false
            createShot(dir)
            setTimeout(() => {
                itzhak.canStartShooting = true
            }, fireRate.r);
        }
    }
    itzhak["shoot"+dir] = true
}

