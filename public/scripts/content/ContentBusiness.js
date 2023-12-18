import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import ResponseUnique from '../helpers/ResponseUnique.js'
import Settings from '../helpers/Settings.js'
import Steps from '../helpers/Steps.js'
import AvatarCopier from './avatar/AvatarCopier.js'
import AvatarMovement from './avatar/AvatarMovement.js'



class ContentBusiness extends Content {
    constructor(){
        super(Steps.BUSINESS)

        // Scope
        const self = this
        this.isScoreShown = false
        this.yOffset = 20
        this.xOffset = 5
        this.duration = 250

        // Data
        this.responses = [
            "To solve an existing problem in the market",
            "To explore my creativiy to its full potential",
            "To be my own boss and and lead a team",
            "To make an impact in society"
        ]
        this.$answerDescription = document.querySelector(`.answer-description`)
        this.$answerCorrectIcon = document.querySelector(`#answer-correct-icon`)
        

        this.$holder
        this.buttonsData = []
        
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

    preactivateContent(){
        
    }

    activateContent(){
        //console.log(this.correctIconRect)
    }

    deactivateContent(){
        
    }

    onResponseUpdate(responseObj){
        if(responseObj.responseID ==  this.contentID){
            this.enableNextButton()
        }
    }

    processResponse(){
        //console.log("processResponse")
        // Is the response correct or incorrect?
        const response = this.reponseUnique.currentButtonSelected
        
    }

   
    

    onClickNext(){
        if(!this.isNextEnabled){
            return
        }
        
        // Vamos a la siguiente sección
        this.gotoNextStep()
    }
    
}

export default ContentBusiness