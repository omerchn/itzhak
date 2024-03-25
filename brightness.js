
let brightness = 10
let root = document.documentElement;


export function changeBrightness() {
    brightness += 5
    if (brightness < 90) {
        if (brightness >= 60) {
            root.style.setProperty('--grey', `hsl(0, 0%, ${60-((brightness-60)+5)}%)`)
            $(".stat").css("filter", `invert(${(60-((brightness-60)+5))/100})`)
            $("html").css("filter", `invert(1)`)
        } else {            
            root.style.setProperty('--grey', `hsl(0, 0%, ${brightness}%)`)
            $(".stat").css("filter", `invert(${brightness/100})`)
        }
    } else if (brightness == 110) {
        $("html").css("filter", `invert(1) sepia() saturate(1000%) hue-rotate(200deg)`)
    }
}