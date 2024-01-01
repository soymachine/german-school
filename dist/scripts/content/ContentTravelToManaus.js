
import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import Steps from '../helpers/Steps.js'

class ContentTravelToManaus extends Content {
    
    constructor(){
        super(Steps.TRAVEL_TO_MANAUS)
        const $plane = document.getElementById("travel-manaus-plane-img")
        // Escale $plane to .5 
        $plane.style.transform = "scale(.5)"
        $plane.style.opacity = 0
    }

    preactivateContent(){
        // Mostramos el contido bien
        document.querySelector("#step-" + this.contentID+ " .step-content").style.display = "grid"

        // Ajustamos tamaños
        const stepContent = document.querySelector(`#step-${this.contentID} .step-content`).getBoundingClientRect()
        const bg = document.getElementById("travel-manaus-background")
        const path = document.querySelector("#plane-path path")
        const margin = 30
        const height = (stepContent.height - (margin*2))
        // Change height of bg to 500
        bg.style.height = height + "px"

        const planePath = document.getElementById("plane-path")
        
        const pathWidth = (height  * 0.566)
        const pathHeight = height
        planePath.setAttribute("width", pathWidth + "px")
        planePath.setAttribute("height", pathHeight + "px")

        const point1_X = 0.946 * pathWidth
        const point1_Y = 0.2142 * pathHeight

        const point2_X = 0.5678 * pathWidth
        const point2_Y = 0

        const point3_X = 0.7255 * pathWidth
        const point3_Y = 0.3571 * pathHeight

        const d =`M${point1_X},${point1_Y}q-${point2_X}-${point2_Y}-${point3_X},${point3_Y}`
        path.setAttribute("d", d)
    }

    activateContent(){
       this.beginTravel()
    }

    beginTravel(){
        // movimiento traslación
        var path = anime.path('#plane-path path');
        const duration = 6000
        const delay = 1000
        const target = '#travel-manaus-plane'
        const easingType = "easeInOutQuad"
        const self = this

        anime({
            targets: target,
            translateX: path('x'),
            translateY: path('y'),
            rotate: path('angle'),
            easing: 'linear',
            duration: duration,
            loop: false,
            delay:delay,
            easing: easingType,
            complete: function(anim) {
                self.onTravelComplete()
              }
        });

        anime({
            targets: "#travel-manaus-plane-img",
            opacity:1,
            easing: 'linear',
            duration: delay,            
            easing: 'linear',
        });

        // Escale 0.5 -> 100 -> 0.5        
        anime({
            targets: "#travel-manaus-plane-img",
            keyframes: [
                {scale: 1},
                {scale: .50}
              ],
            easing: 'linear',
            duration: duration,
            delay:delay,
            easing: 'linear',
        });
    }

    onTravelComplete(){
        eventSystem.publish(Events.ON_REQUEST_NEXT_STEP)
    }
}

export default ContentTravelToManaus
