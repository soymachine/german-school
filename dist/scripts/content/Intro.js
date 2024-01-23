import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import ResponseUnique from '../helpers/ResponseUnique.js'
import Settings from '../helpers/Settings.js'
import Steps from '../helpers/Steps.js'

class Intro extends Content {
    constructor(){
        super(Steps.INTRO)

        // Scope
        const self = this
        this.isLoadingComplete = false
        // this.$answerCorrectIcon = document.querySelector(`#answer-correct-icon`)
        const contentRect = document.querySelector(`#step-${this.contentID}`).getBoundingClientRect()
        this.$bgImage = document.querySelector(".bg-image")
        // this.$bgImage width as contentRect width
        this.$bgImage.style.width = `${contentRect.width}px`


        // El botón de NEXT
        this.$nextButton = document.querySelector(`#intro-button`)
        this.$nextButton.style.opacity = 0
        

        this.$nextButton.onmousedown = function(e) { //asign a function
            self.onClickNext()
        }
        this.$nextButton.addEventListener('touchend', function(event){
            event.preventDefault();
            self.onClickNext()
        }, false);

        //this.disableNextButton()
        /*
        eventSystem.subscribe(Events.ON_RESPONSE_UPDATE, (responseObj)=>{
            this.onResponseUpdate(responseObj)
        })
        */

        const duration = 1000
        anime({
            targets: `#step-${this.contentID}`,
            opacity: 1,
            duration: duration,
            easing:'easeOutQuad'
        });

        const imagesArray = Array.from(document.images)
        Promise.all(imagesArray.filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; })))
        .then(() => 
        {
            this.isLoadingComplete = true
            
            anime({
                targets: `#loading`,
                opacity: 0,
                duration: duration,
                easing:'linear',
                complete: function(anim) {
                    anime({
                        targets: `#intro-button`,
                        opacity: 1,
                        duration: duration,
                        easing:'linear',
                    });
                }
            });
                
            
            /*
            console.log("All images loaded en total: " + imagesArray.length)

            imagesArray.forEach(img =>
            {
                console.log(img.src)
            })
            */

        })

    }

    activateContent(){
        
    }

    onClickNext(){
        if(!this.isLoadingComplete){
            return
        }
        this.gotoNextStep()
    }
    
}

export default Intro