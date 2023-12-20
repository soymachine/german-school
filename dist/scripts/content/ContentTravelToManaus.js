
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
