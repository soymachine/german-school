import Content from './Content.js'
import Settings from '../helpers/Settings.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import ResponseUnique from '../helpers/ResponseUnique.js'
import {avatarSelection} from '../helpers/AvatarSelection.js'
import Steps from '../helpers/Steps.js'
import { currentPunctuation } from '../helpers/Punctuation.js'


class SarahQuestion10 extends Content {
    constructor(){
        super(Steps.SARAH_QUESTION_10)

        // Scope
        const self = this
        this.isScoreShown = false

        // Dom Elements
        this.$imageMark = document.querySelector(`#step-${this.contentID} #visual-result-mark`) 
        this.$resultTitle = document.querySelector(`#step-${this.contentID} .result-title`) 
        this.$questionExplanation = document.querySelector(`.question-10-explanation`) 
        this.$resultDescription = document.querySelector(`#step-${this.contentID} .result-description`) 
        this.$infoHolder = document.querySelector(`#step-${this.contentID} .info-holder`)
        this.$titleText = document.querySelector(`#step-${this.contentID} .why-intro-title`)
        this.resultElement = document.querySelector(`#result-step-${this.contentID}`)
        this.pointsElement = document.querySelector(`#result-step-${this.contentID} .business-result-points`)

        const stepWidth = document.querySelector(`#step-${this.contentID}`).offsetWidth
        const stepHeight = this.$infoHolder.offsetHeight
        //this.$infoHolder.style.width = (stepWidth - (Settings.margin * 2)) + "px"
        this.$infoHolder.style.width = (stepWidth - (20 * 2)) + "px"
        //this.$infoHolder.style.height = stepHeight + "px"

        // Check path images
        this.correctMarkImage = "./imgs/correct.png"
        this.incorrectMarkImage = "./imgs/incorrect.png"

        // Evento general para el release
        /*
        document.addEventListener('touchend', function(event){
            event.preventDefault();

            self.onMouseUp()
        }, false);
        */

        // El botón de NEXT
        this.$nextButton = document.querySelector(`#next-button-${this.contentID}`)
        this.$nextButton.onmousedown = function(e) { //asign a function
            self.onClickNext()
        }
        this.$nextButton.addEventListener('touchend', function(event){
            event.preventDefault();
            self.onClickNext()
        }, false);
        this.disableNextButton()

        eventSystem.subscribe(Events.ON_RESPONSE_UPDATE, (responseObj)=>{
            this.onResponseUpdate(responseObj)
        })

        // Las posibles respuestas, solo podemos marcar una
        this.reponseUnique = new ResponseUnique(this.contentID)
    }

    onResponseUpdate(responseObj){
        if(responseObj.responseID ==  this.contentID){
            this.enableNextButton()
        }
    }

    processResponse(){
        // Is the response correct or incorrect?
        const response = this.reponseUnique.currentButtonSelected
        console.log("processResponse response", response)
        
        // Translate X info-holder
        this.moveContent()
        
        if(response == 3){
            // Correct
            // Change url of $imageMark to this.correctMarkImage string
            this.$imageMark.src = this.correctMarkImage

            //this.$resultTitle.innerHTML = "Adaptive leadership and change management "

            //this.$titleText.innerHTML = "<strong>Well done</strong>, that is exactly what I was looking for!"
            this.pointsElement.innerHTML = "+10"
            currentPunctuation.addPunctuation(10)
            //this.$questionExplanation.innerHTML = "Every business faces multiple challenges, so being flexible and adapting to context will be your best skill!"
        }else{
            // Incorrect
            // Change url of $imageMark to this.incorrectMarkImage string
            this.$imageMark.src = this.incorrectMarkImage

            // Add class result-title-wrong 
            this.$resultTitle.classList.add("result-title-wrong")

            if(response == 1){
                //this.$resultTitle.innerHTML = "Influential negotiation and persuasive abilities "
            }else if(response == 2){
                //this.$resultTitle.innerHTML = "Intuitive market intuition and trend forecasting "
            }else{
                //this.$resultTitle.innerHTML = "Influential negotiation and persuasive abilities "
            }

            // Change Text
            //this.$titleText.innerHTML = `That would be important too, but I was looking for a different answer:`
            //this.$questionExplanation.innerHTML = "<strong>Adaptive leadership and change management</strong> was the one!"
            this.pointsElement.innerHTML = "0"
        }

        anime({
            targets: `#result-step-${this.contentID}`,
            opacity: 1,
            duration: 500,
            delay:1000,
            easing:'easeOutQuad'
        });
    }

    moveContent(){
        const x = (document.querySelector(".step").offsetWidth - 10 ) * -1
        const duration = 500
        anime({
            targets: `#step-${this.contentID} .info-holder`,
            translateX: x,
            duration: duration,
            easing:'easeOutQuad'
        });
    }

    onClickNext(){
        if(!this.isNextEnabled){
            return
        }
        
        if(!this.isScoreShown){
            this.processResponse()
            this.isScoreShown = true
        }else{
            // Vamos a la siguiente sección
            this.gotoNextStep()
        }
    }
    
}

export default SarahQuestion10