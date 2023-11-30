import ResponseMultiple from '../helpers/ResponseMultiple.js'
import Content from './Content.js'
import {eventSystem, Events}  from '../helpers/EventSystem.js'


class ContentMultiple extends Content {
    constructor(){
        super(1)
        
        // Scope
        const self = this

        // Correct elements
        this.correctElements = [1,3, 5, 6, 7, 9]

        // Estamos eligiendo elementos o viendo el score?
        this.isScoreShown = false

        // Controlador de respuestas múltiples
        this.minCompaniesToSelect = 6
        this.responsesEnabled = true
        this.responseMultiple = new ResponseMultiple(this.contentID, 6)

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

        // Textos
        // Titulo
        this.$title = document.querySelector(`.title-step-${this.contentID}`)
        // Score
        this.$score = document.querySelector(`.score-step-${this.contentID}`)
        this.hideScore()

        this.$finalScore = document.querySelector(".score-result")

        eventSystem.subscribe(Events.ON_RESPONSE_UPDATE, (responseObj)=>{
            this.onResponseUpdate(responseObj)
        })

        // Labels
        this.$labels = document.querySelectorAll(`.company-label`)
       
    }

    showAllLabels(){
        this.$labels.forEach(label => {
            // Add ".show-label" class to label item
            label.classList.remove("hide-label")
            label.classList.add("show-label")
        })
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
        if(!this.isNextEnabled){
            return
        }
        
        if(!this.isScoreShown){
            this.isScoreShown = true
            this.responseMultiple.isEnabled = false

            // Calculamos el score obtenido
            const score = this.getScore()

            this.showScore()
            this.hideTitle()
            this.showAllLabels()
            // TODO Ocultar las empresas no elegidas
            this.freezeCompanies()

        }else{
            // Vamos a la siguiente sección
            this.gotoNextStep()
        }
    }

    freezeCompanies(){
        
        document.querySelectorAll(".company-item").forEach(item => {
            console.log(item)
            // Get if item has class "btn-step-option-selected"
            if(!item.classList.contains("btn-step-option-selected")){
                item.style.opacity = 0.25
            }else{
                // Remove "btn-step-option-selected" class from item
                item.classList.remove("btn-step-option-selected")
            }
        })

    }

    getScore(){
        const currentButtonsSelected =this.responseMultiple.currentButtonsSelected
        
        // Calculate if elements inside currentButtonsSelected are in the correct elements array correctElements
        const acertadas = currentButtonsSelected.reduce((acc, id) => {
            if(this.correctElements.includes(id)){
                acc++
            }
            return acc
        }, 0)

        console.log(currentButtonsSelected)
        console.log(acertadas)

        this.$finalScore.innerHTML = acertadas + "/6"
    }
    
}

export default ContentMultiple