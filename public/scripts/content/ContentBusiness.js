import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import ResponseUnique from '../helpers/ResponseUnique.js'
import Settings from '../helpers/Settings.js'
import Steps from '../helpers/Steps.js'
import {avatarSelection} from '../helpers/AvatarSelection.js'




class ContentBusiness extends Content {
    constructor(){
        super(Steps.BUSINESS)

        // Scope
        const self = this
        this.isScoreShown = false
        this.yOffset = 20
        this.xOffset = 5
        this.duration = 250
        this.responseID = undefined
        this.correctResponseID = 1
        // Data
        this.responses = [
            "To solve an existing problem in the market",
            "To explore my creativiy to its full potential",
            "To be my own boss and and lead a team",
            "To make an impact in society"
        ]
        this.$answerDescription = document.querySelector(`.answer-description`)
        this.$answerCorrectIcon = document.querySelector(`#answer-correct-icon`)

        this.firstParagraph = document.querySelector(`#step-${this.contentID} .first-paragraph`)
        this.secondParagraph = document.querySelector(`#step-${this.contentID} .second-paragraph`)
        
        this.$holder
        this.buttonsData = []
        
        // El botón de NEXT
        this.$nextButton = document.querySelector(`#next-button-${this.contentID}`)

        // Los botones de las respuestas
        this.$answerButtons = []
        document.querySelectorAll(`.business-answer-button`).forEach((button)=>{
            this.$answerButtons.push(button)
        })
        
        this.yOffset = this.$answerButtons[1].getBoundingClientRect().top - this.$answerButtons[0].getBoundingClientRect().top
        
        

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
            this.processResponse()
        }
    }

    processResponse(){
        //console.log("processResponse")
        // Is the response correct or incorrect?
        this.responseID = this.reponseUnique.currentButtonSelected
    }

    hideResponse(responseID){
        anime({
            targets: `#${responseID}`,
            opacity: 0,
            easing: Settings.ease,
            duration:500,            
        });
    }

    showScore(){
        this.reponseUnique.isEnabled = false
        let userCorrect = false
        const responseID = this.responseID - 1
        this.$answerButtons.forEach((button, index)=>{
            console.log(index)
            const buttonID = button.getAttribute("id")

            // Es la que tenemos seleccionada?
            if(index == responseID){
                anime({
                    targets: `#${buttonID}`,
                    translateY: this.yOffset * index * -1,
                    easing: Settings.ease,
                    duration:500,
                    delay:0            
                });
                
                // Marcado de correcto o incorrecto
                let icon =`#${buttonID} .answer-incorrect-icon`
                // es la eleigida por el usuario?
                if(index == this.correctResponseID){
                    // Es la elegida por usuario   
                    // AAA
                    userCorrect = true
                    icon =`#${buttonID} .answer-correct-icon`
                }else{
                    // No es la elegida por usuario
                   
                }

                anime({
                    targets:icon,
                    opacity: 1,
                    easing: Settings.ease,
                    duration:500,
                    delay:0            
                });
            }else if(index == this.correctResponseID){
                // La correcta!
                if(index == responseID){
                    // Es la elegida por usuario   
                    // AAA
                }else{
                    // No es la elegida por usuario
                    // La marcamos de verde
                    console.log("Marcamos algo de verde!")
                    button.classList.add("btn-step-option-correct")
                }
            }else{
                // Cualquiera de las otras
                // Get the id of button html element
                this.hideResponse(buttonID)
            }
        })
        
        let points = "0"
        if(userCorrect){
            this.firstParagraph.innerHTML = `<strong>Well done, <span class='user-name'>${avatarSelection.name}</span>.</strong>`
            this.secondParagraph.innerHTML = `That is correct!`
            points = "+10"
        }else{
            this.firstParagraph.innerHTML = `<strong>Oops, <span class='user-name'>${avatarSelection.name}</span>.</strong>`
            this.secondParagraph.innerHTML = `The correct answer was...`
        }


        anime({
            targets:".business-result",
            opacity: 1,
            easing: Settings.ease,
            duration:500,
            delay:0            
        });
        
        document.querySelector(`.business-result-points`).innerHTML = points
       
    }
    

    onClickNext(){
        if(!this.isNextEnabled){
            return
        }
        
        if(!this.isScoreShown){
            this.isScoreShown = true
            this.showScore()
        }else{
            // Vamos a la siguiente sección
            this.gotoNextStep()
        }
        
    }
    
}

export default ContentBusiness