import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import ResponseUnique from '../helpers/ResponseUnique.js'
import Settings from '../helpers/Settings.js'
import Steps from '../helpers/Steps.js'



class ContentWhyEnterpreuner extends Content {
    constructor(){
        super(Steps.WHY_ENTERPRENEUR)

        //console.log("Enterpreneur")
        
        // Scope
        const self = this
        this.isScoreShown = false
        this.yOffset = 20
        this.xOffset = 5
        this.duration = 500

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


        /* AVATAR RELATED */
        // Posicionamos al avatar
        setTimeout(()=>{
            self.centerAvatar()
        }, 100)        
    }

    centerAvatar(){
        const avatar = document.getElementById(`my-avatar-${this.contentID}`)
        const avatarIMG = avatar.querySelector(`.my-avatar-body-part`)
        const avatarRect = avatarIMG.getBoundingClientRect()

        const avatarHolderRect = document.querySelector(".holder-why-enterpreneur #avatar").getBoundingClientRect()
        const xCenter = (avatarHolderRect.width / 2) - (avatarRect.width / 2)
        const yCenter = (avatarHolderRect.height / 2) - (avatarRect.height / 2)
        avatar.style.left = xCenter + "px"
        avatar.style.top = yCenter + "px"
    }

    preactivateContent(){
        
    }

    activateContent(){
        // Contenido ya está mostrado
        document.querySelectorAll(`.btn-step-${this.contentID}-option`).forEach(button => {
            const buttonRect = button.getBoundingClientRect()
            //console.log(buttonRect, button)
            this.buttonsData.push(buttonRect)
        })
        
        this.holderRect = document.querySelector(`.holder-why-enterpreneur`).getBoundingClientRect()
        
        this.correctIconRect = this.$answerCorrectIcon.getBoundingClientRect()
        //console.log(this.correctIconRect)

       
    }

    onResponseUpdate(responseObj){
        if(responseObj.responseID ==  this.contentID){
            // Scope
            const self = this

            this.enableNextButton()

            const responseNum = responseObj.response

            this.$answerDescription.innerHTML = this.responses[responseNum - 1]

            const buttonRect = this.buttonsData[responseNum - 1]
            let x = buttonRect.x - this.holderRect.x
            let y = buttonRect.y - this.holderRect.y
            y += buttonRect.height - this.yOffset
            
            if(responseNum % 2 == 0){
                // pares
                x += buttonRect.width - this.correctIconRect.width - this.xOffset
            }else{
                // impares
                x += this.xOffset
            }

            anime({
                targets: '#answer-correct-icon',
                scale: 0,
                easing: Settings.ease,
                duration:this.duration,
                complete: function(anim) {
                    
                    self.$answerCorrectIcon.style.left = x + "px"
                    self.$answerCorrectIcon.style.top = y + "px"

                    anime({
                        targets: '#answer-correct-icon',
                        scale: 1,
                        opacity: 1,
                        easing: Settings.ease,
                        duration:self.duration,
                        complete: function(anim) {
                            
                        }
                    });        
                }
            });
            
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