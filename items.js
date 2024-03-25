let hu = screen.height/100
let wu = screen.width/100

let $carousel

let delay
let done
let doneTime

let WARNING_IMG
let warnings = []
let maxEnemies = 2
let minEnemies = 2

export let score = 0

import {enemies, Enemy, ENEMY_IDLE_IMG} from "./enemies.js"
import { GameObjects, GameObject } from "./initGameObj.js"
import { deleteObj } from "./deleteObj.js"
import { fireRate, shotVelocity, shotSize } from "./shots.js"
import { itzhak } from "./player.js"
import { changeBrightness } from "./brightness.js"
import { pause } from "./binds.js"

export function initRoll() {
    score++
    $("#score").text(score)

    changeBrightness()

    WARNING_IMG = new Image()
    WARNING_IMG.src = "media/WARNING.png"

    $carousel = $('#myCar').flickity({
        cellAlign: 'left',
        contain: true
      })
    $('#myCar').animate({'opacity': '1'},500)
    done = false
    delay = 300
    rollItem()
    doneTime = Math.floor(Math.random() * 2500) + 1500;
    setTimeout(() => {
        done = true
    }, doneTime)
}

function rollItem() {
    if (!done)
        setTimeout(() => {
            $("#myCar").flickity('next')
            rollItem()
        }, delay)
    else {
        setTimeout(() => {
            let itemId = $carousel.data('flickity').selectedElement.id
            applyItem(itemId)
        }, 500);
        setTimeout(() => {
            $('#myCar').animate({'opacity': '0'},500)
            let randEnemies = Math.floor(Math.random() * maxEnemies) + minEnemies
            if (maxEnemies < 4) maxEnemies++
            else if (minEnemies < 3) minEnemies++
            if ((score+1)%10 == 0) {
                spawnEnemies( (score+1)/10, true)
            } else {
                spawnEnemies(randEnemies)
            }
        }, 1500)
    }
    delay -= 20
}

export function spawnEnemies(num, isBoss = false) {
    if (isBoss) {
        let randX = 35
        let randY = 30
        let randSize = 30
        if (score == 19) {
            enemies.push(new Enemy(ENEMY_IDLE_IMG, 35*wu, 30*hu, randSize*wu, randSize*wu, ((1/randSize)+0.4)*wu, randSize*20, "shooter"))
        } else {
            for (let i = 0; i < num; i++) {
        
                warnings.push(new Warning(WARNING_IMG, randX*wu, randY*hu, 30*wu, 30*wu,))
                GameObjects[GameObjects.length-1].deleteIt()
                
                setTimeout(() => {
                    if (score == 19) {
                        enemies.push(new Enemy(ENEMY_IDLE_IMG, 35*wu, 30*hu, randSize*wu, randSize*wu, ((1/randSize)+0.4)*wu, randSize*20, "shooter"))
                    } else {
                        enemies.push(new Enemy(ENEMY_IDLE_IMG, 35*wu, 30*hu, randSize*wu, randSize*wu, ((1/randSize)+0.4)*wu, randSize*20, "attacker"))
                    }
                }, 1000)
            }    
        }


    } else {
        for (let i = 0; i < num; i++) {
            let isShooter = (Math.floor(Math.random() * 3) + 1) == 1
            let type
            if (isShooter) {type = "shooter"}
            else {type = "attacker"}
            let randX = Math.floor(Math.random() * 100) + 1
            let randY = Math.floor(Math.random() * 100) + 1
            let randSize = Math.floor(Math.random() * 5) + 4
    
            warnings.push(new Warning(WARNING_IMG, randX*wu, randY*hu, 5*wu, 5*wu,))
            GameObjects[GameObjects.length-1].deleteIt()
    
            setTimeout(() => {
                enemies.push(new Enemy(ENEMY_IDLE_IMG, randX*wu, randY*hu, randSize*wu, randSize*wu, ((1/randSize)+0.2)*wu, randSize*10, type))
            }, 1000)
        }
    }
}

class Warning extends GameObject {
    constructor(img, x, y, width, height) {
        super(img, x, y, width, height)
    }

    deleteIt() {
        setTimeout(() => {
            deleteObj(this, warnings)
        }, 1000);
    }
}

function applyItem(item) {
    if (item == "shotSpeedUp") {shotVelocity.enemy += 0.05*wu; message("SHOT SPEED UP!"); $(`.${item}`).append('<img src="media/line.svg" alt="">')}
    if (item == "firerateUp" && fireRate.r > 200) {fireRate.r -= 100; message("FIRERATE UP!"); $(`.${item}`).append('<img src="media/line.svg" alt="">')}
    if (item == "damageUp") {itzhak.damage += 5; message("DAMAGE UP!"); $(`.${item}`).append('<img src="media/line.svg" alt="">')}
    if (item == "sizeDown" && itzhak.width > 1*wu) {itzhak.height -= 0.5*wu; itzhak.width -= 0.5*wu; message("SIZE DOWN!");}
    if (item == "shotSizeUp") {shotSize.s += 1*wu; message("SHOT SIZE UP!");}
    if (item == "speedUp") {itzhak.speed += 5; itzhak.accl += 0.5*wu; message("SPEED UP!"); $(`.${item}`).append('<img src="media/line.svg" alt="">')}
    if (item == "hpUp" && itzhak.hp < 100) {itzhak.hp +=10 ; message("HEALTH UP!");}
}

function message(m) {
    if (!pause) {
        $("#message").text(m)
        setTimeout(() => {
            $("#message").text("")
        }, 1000);
    }
}