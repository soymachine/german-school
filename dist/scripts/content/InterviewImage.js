import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import ResponseUnique from '../helpers/ResponseUnique.js'
import Settings from '../helpers/Settings.js'
import Steps from '../helpers/Steps.js'

class InterviewImage extends Content {
    constructor(){
        super(Steps.INTERVIEW)

        // Scope
        const self = this
        // this.$answerCorrectIcon = document.querySelector(`#answer-correct-icon`)
        const contentRect = document.querySelector(`#step-${this.contentID}`).getBoundingClientRect()
        this.$bgImage = document.querySelector(".bg-image")
        // this.$bgImage width as contentRect width
        this.$bgImage.style.width = `${contentRect.width}px`


        // El botón de NEXT
        this.$nextButton = document.querySelector(`#interview-button`)

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

       

    }

    activateContent(){
        
    }

    onClickNext(){
       
        this.gotoNextStep()
    }
    
}

export default InterviewImage