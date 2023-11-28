import {eventSystem, Events}  from './EventSystem.js'
import Settings from './Settings.js'

class ResponseMultiple {
    constructor(step, maxResponses){
        this.step = step
        this.maxResponses = maxResponses
        this.isEnabled = true
        // Data
        this.buttons = {}

        this.currentButtonsSelected = []

        // Scope
        const that = this

        // Lista de botones de selección
        document.querySelectorAll(`.btn-multsel-step-${step}-option`).forEach(button => {
            const id = Number(button.getAttribute("id").split("-")[4])
            const anchor = button.querySelector("a")
            that.buttons[id] = {
                anchor: anchor,
                div: button
            }

            button.onclick = function(e){
                that.onClickSelection(id)
            }

            button.addEventListener('touchstart', function(event){
                event.preventDefault();
                that.onClickSelection(id)
            }, false);
        })

    }

    onClickSelection(id){
        if(!this.isEnabled){
            return
        }

        // Está marcada?
        if(this.currentButtonsSelected.indexOf(id) == -1){
            // No está marcada
            
            // Hay espacio para marcarla?
            if(this.currentButtonsSelected.length < this.maxResponses){
                // Sí, la podemos togglear
                this.buttons[id].div.classList.add("btn-step-option-selected");
                this.currentButtonsSelected.push(id)
                
            }
            //console.log(this.currentButtonsSelected)
        }else{
            // Está marcada, la desmarcamos
            this.buttons[id].div.classList.remove("btn-step-option-selected");
            // La quitamos del array
            this.currentButtonsSelected = this.currentButtonsSelected.filter(currentID => currentID !=id)
        }

        // notificamos de la respuesta
        eventSystem.publish(Events.ON_RESPONSE_UPDATE, {
            responseID: this.step,
            responseType: Settings.MULTIPLE_RESPONSE,
            response: this.currentButtonsSelected
        })
    }
}

export default ResponseMultiple