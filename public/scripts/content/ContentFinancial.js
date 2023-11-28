import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import ResponseUnique from '../helpers/ResponseUnique.js'


class ContentFinancial extends Content {
    constructor(){
        super(2)
        
        // Scope
        const self = this
        this.isScoreShown = false
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

    onClickNext(){
        if(!this.isNextEnabled){
            return
        }
        
        if(!this.isScoreShown){
            
        }else{
            // Vamos a la siguiente sección
            this.gotoNextStep()
        }
    }

    onClickNext(){
        if(!this.isNextEnabled){
            return
        }
        
        this.gotoNextStep()
    }
    
}

export default ContentFinancial