import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import ResponseUnique from '../helpers/ResponseUnique.js'


class ContentFinancial extends Content {
    constructor(){
        super(2)
        
        // Scope
        const self = this
        this.isScoreShown = false

        // Dom Elements
        this.$imageMark = document.querySelector(`#visual-result-mark`) 
        this.$resultSentence = document.querySelector(`.result-sentence`) 
        this.$resultTitle = document.querySelector(`.result-title`) 
        this.$resultDescription = document.querySelector(`.result-description`) 

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
        console.log("processResponse")
        // Is the response correct or incorrect?
        const response = this.reponseUnique.currentButtonSelected
        
        // Translate X info-holder
        this.moveContent()
        
        if(response == 1){
            // Correct
            // Change url of $imageMark to this.correctMarkImage string
            this.$imageMark.src = this.correctMarkImage
            // Remove the incorrect sentence 
            document.getElementById(`result-sentence-incorrect`).remove()
        }else{
            // Incorrect
            // Change url of $imageMark to this.incorrectMarkImage string
            this.$imageMark.src = this.incorrectMarkImage
            // Remove the correct sentence 
            document.getElementById(`result-sentence-correct`).remove()

            // Add class result-title-wrong 
            this.$resultTitle.classList.add("result-title-wrong")

            // Change Text
        }
    }

    moveContent(){
        const x = (document.querySelector(".step").offsetWidth - 10 ) * -1
        const duration = 500
        anime({
            targets: `.info-holder`,
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

export default ContentFinancial