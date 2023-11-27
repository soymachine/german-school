import ResponseMultiple from '../helpers/ResponseMultiple.js'
import Content from './Content.js'
import {eventSystem, Events}  from '../helpers/EventSystem.js'


class ContentMultiple extends Content {
    constructor(){
        super(1)
        
        // Scope
        const self = this

        // Estamos eligiendo elementos o viendo el score?
        this.isScoreShown = false

        // Controlador de respuestas múltiples
        this.minCompaniesToSelect = 6
        this.responsesEnabled = true
        this.responseMultiple = new ResponseMultiple(1, 6)

        // Botón de avanzar
        this.nextButton = document.querySelector(`#next-button-step-${this.contentID}`)
        this.isNextButtonEnabled = false

        // Textos
        // Titulo
        this.$title = document.querySelector(`.title-step-${this.contentID}`)
        // Score
        this.$score = document.querySelector(`.score-step-${this.contentID}`)
        this.hideScore()

        this.nextButton.onmousedown = function(e) {
            self.onClickNext()
        }

        eventSystem.subscribe(Events.ON_RESPONSE_UPDATE, (responseObj)=>{
            this.onResponseUpdate(responseObj)
        })

        this.disableNextButton()
       
    }

    hideTitle(){
        this.$title.style.display = "none"
    }

    showTitle(){
        this.$title.style.display = "block"
    }

    hideScore(){
        // hide $score element as an inline style
        this.$score.style.display = "none"
    }

    showScore(){
        // show $score element as an inline style
        this.$score.style.display = "block"
    }

    onResponseUpdate(responseObj){
        /*{
            responseID: this.step,
            responseType: Settings.MULTIPLE_RESPONSE,
            response: this.currentButtonsSelected
        }*/
        if(responseObj.responseID ==  this.contentID){
            
            if(responseObj.response.length >= this.minCompaniesToSelect){
                // Activamos el botón de continuar
                this.enableNextButton()
            }else{
                // Desactivamos el botón de continuar
                this.disableNextButton()
            }
        }
    }

    onClickNext(){
        console.log("next")
        if(!this.isScoreShown){
            this.isScoreShown = true
            this.responseMultiple.isEnabled = false

            // Calculamos el score obtenido
            const score = this.getScore()

            this.showScore()
            this.hideTitle()
        }else{
            // Vamos a la siguiente sección
        }
    }

    getScore(){
        const currentButtonsSelected =this.responseMultiple.currentButtonsSelected

    }

    enableNextButton(){
        this.isNextButtonEnabled = true
        
        // Add class "enabled" to nextButton element
        this.nextButton.classList.remove("button-disabled")
        this.nextButton.classList.add("button-enabled")
    }

    disableNextButton(){
        this.isNextButtonEnabled = false

        this.nextButton.classList.remove("button-enabled")
        this.nextButton.classList.add("button-disabled")
    }

    
}

export default ContentMultiple