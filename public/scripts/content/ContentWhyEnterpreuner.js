import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import ResponseUnique from '../helpers/ResponseUnique.js'


class ContentWhyEnterpreuner extends Content {
    constructor(){
        super(4)

        console.log("Enterpreneur")
        
        // Scope
        const self = this
        this.isScoreShown = false

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

export default ContentWhyEnterpreuner