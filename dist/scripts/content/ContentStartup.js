import ResponseMultiple from '../helpers/ResponseMultiple.js'
import Content from './Content.js'
import {eventSystem, Events}  from '../helpers/EventSystem.js'
import Steps from '../helpers/Steps.js'
import {currentPunctuation} from '../helpers/Punctuation.js'

class ContentStartup extends Content {
    constructor(){
        super(Steps.STARTUPS)
        
        // Scope
        const self = this

        this.finalText = "<strong>Networking is really important!</strong><br>You should stay in touch with these successful companies."

        // Correct elements
        this.correctElements = [1, 3, 5, 6, 7, 9]

        // Estamos eligiendo elementos o viendo el score?
        this.isScoreShown = false
        this.isResultShown = false
        this.state = "playing" // "score", "result"

        // Controlador de respuestas múltiples
        this.minCompaniesToSelect = 6
        this.responsesEnabled = true
        this.responseMultiple = new ResponseMultiple(this.contentID, 6)

        this.infoTickers = []
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
        // this.$finalScore = document.querySelector(".why-intro-title")

        eventSystem.subscribe(Events.ON_RESPONSE_UPDATE, (responseObj)=>{
            this.onResponseUpdate(responseObj)
        })

        // Labels
        this.$labels = document.querySelectorAll(`.item-label`)
       
    }

    showAllLabels(){
        const duration = 500
        const delay = 25

        // Cambiamos el texto final
        document.querySelector(`.title-step-${this.contentID} .why-intro-title`).innerHTML = this.finalText 

        this.$labels.forEach(label => {
            // Add ".show-label" class to label item
            label.classList.remove("hide-label")
            label.classList.add("show-label")

            anime({
                targets: `.item-label`,
                opacity: 1,
                duration: duration,
                easing:'easeOutQuad',
                delay: function(el, i, l) {
                    return i * delay;
                  },
            })
        })

        document.querySelectorAll(".company-holder").forEach((item, index) => {
            item.classList.add("company-holder-final");
        })

        document.querySelectorAll(".company-item").forEach((item, index) => {
            item.classList.add("company-item-final");
            item.querySelector(".image-wrapper").classList.remove("option-correct")
            item.querySelector(".image-wrapper").classList.remove("option-incorrect")
            item.querySelector(".image-wrapper").style.background= "none"
            item.querySelector(".image-wrapper").style.border = "none"
            item.querySelectorAll(".company-result-image").forEach(image => {
                image.style.opacity = 0                
            })
        })

        
        document.querySelectorAll(".not-whu-alumni").forEach((item, index) => {
            item.style.opacity = 0
        })

        anime({
            targets: `.image-wrapper`,
            translateY: -15, // 22
            duration: duration,
            easing:'easeOutQuad',
            delay: function(el, i, l) {
                return i * delay;
              },
        })

        anime({
            targets: `.image-wrapper img`,
            scale: 1,
            duration: duration,
            easing:'easeOutQuad',
            delay: function(el, i, l) {
                return i * delay;
              },
        })


        const delayDesplazamiento = 1000
        // Kitchen sube
        anime({
            targets: `#btn-step-${this.contentID}-option-5`,
            translateY: -105,
            duration: duration,
            easing:'easeOutQuad',
            delay: delayDesplazamiento,
        });

        // Home 24 sube
        anime({
            targets: `#btn-step-${this.contentID}-option-7`,
            translateY: -105,
            duration: duration,
            easing:'easeOutQuad',
            delay: delayDesplazamiento + 50,
        });

        // Flixbus sube
        anime({
            targets: `#btn-step-${this.contentID}-option-9`,
            translateY: -105,
            duration: duration,
            easing:'easeOutQuad',
            delay: delayDesplazamiento + 100,
        });

        // Flixbus a la izquierda
        anime({
            targets: `#btn-step-${this.contentID}-option-6`,
            translateX: -105,
            duration: duration,
            easing:'easeOutQuad',
            delay: delayDesplazamiento + 150,
        });

        // Mostramos la puntuacion
        anime({
            targets: `#result-step-${this.contentID}`,
            opacity: 1,
            duration: duration,
            easing:'easeOutQuad',
            delay: delayDesplazamiento + 200,
        });
        
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

        switch(this.state){
            case "playing":
                this.state = "score"
                // Calculamos el score obtenido
                const score = this.getScore()
                this.responseMultiple.isEnabled = false
                this.showScore()
                //this.hideTitle()
                this.freezeCompanies()
                break
            case "score":
                this.state = "result"
                this.showAllLabels()
                break
            case "result":
                this.state = "final"
                // Vamos a la siguiente sección
                this.gotoNextStep()
                eventSystem.publish(Events.ON_PROGRESS_UPDATE, 3)
                break
        }
    }

    freezeCompanies(){
        
        document.querySelectorAll(".company-item").forEach((item, index) => {
            let id = Number(item.id.split("-")[4])
            // Get if item has class "btn-step-option-selected"
            if(!item.classList.contains("btn-step-option-selected")){

            }else{
                // El que hemos seleccionado era el bueno?
                console.log("El que hemos seleccionado era el bueno?")
                if(this.correctElements.includes(id)){
                    item.querySelector(".image-wrapper").classList.add("option-correct") 
                    // company-correct-image
                    item.querySelector(".company-correct-image").style.opacity = 1
                    
                }else{
                    item.querySelector(".image-wrapper").classList.add("option-incorrect")
                    item.querySelector(".company-incorrect-image").style.opacity = 1
                }
            }

            item.classList.remove("btn-step-option-selected")
        })

    }

    getScore(){
        this.currentButtonsSelected =this.responseMultiple.currentButtonsSelected
        
        // Calculate if elements inside currentButtonsSelected are in the correct elements array correctElements
        const acertadas =this.currentButtonsSelected.reduce((acc, id) => {
            if(this.correctElements.includes(id)){
                acc++
            }
            return acc
        }, 0)

        console.log(this.currentButtonsSelected)
        console.log()
        currentPunctuation.addPunctuation(acertadas * 10)

        let finalHTML = "You guessed correctly<br>"
        finalHTML    += '<span class="score-result"><strong>'+ acertadas + '</strong> out of <strong>6</strong></span>'
        finalHTML    += '<span class="score-whu-alumni">WHU alumni</span>'
        
        //document.querySelector(`.title-step-${this.contentID} .why-intro-title`).innerHTML = finalHTML
        //finalScore.innerHTML = finalHTML;
        document.querySelector(`.score-step-${this.contentID} .score-result`).innerHTML = '<strong>'+ acertadas + '</strong> out of <strong>6</strong>'
        //console.log(document.querySelector(`.title-step-${this.contentID} .why-intro-title`))
        //console.log(this.$score)
        document.querySelector(`.title-step-${this.contentID} .why-intro-title`).innerHTML = ""
        document.querySelector(`.title-step-${this.contentID} .why-intro-title`).appendChild(this.$score)


        document.querySelector(`#result-step-${this.contentID} .business-result-points`).innerHTML = "+" + (acertadas * 10)
        
    }
    
}

export default ContentStartup