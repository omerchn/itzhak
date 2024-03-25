let GameObjIndex
let classIndex


import {GameObjects} from "./initGameObj.js"
import { Enemy } from "./enemies.js"

export function deleteObj(obj, arr) {   
    if (obj.type == "shooter") {
        clearInterval(obj.shootinter)
    }

    GameObjIndex = GameObjects.indexOf(obj)
    GameObjects.splice(GameObjIndex, 1)
    
    classIndex = arr.indexOf(obj)
    arr.splice(classIndex, 1)

}