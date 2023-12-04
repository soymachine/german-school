import {eventSystem, Events} from './EventSystem.js'
import Settings from './Settings.js'

class ResponseUnique {
    constructor(step){
        this.step = step
        // Data
        this.buttons = {}

        this.currentButtonSelected = null

        // Scope
        const that = this

        // Lista de botones de selección
        console.log(step)

        document.querySelectorAll(`.btn-step-${step}-option`).forEach(button => {
            const id = Number(button.getAttribute("id").split("-")[4])
            // const anchor = button.querySelector("a")
            that.buttons[id] = {
                anchor: button,
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
        console.log(id)

        // Remove previous current class
        if(this.currentButtonSelected != null){
            this.buttons[this.currentButtonSelected].anchor.classList.remove("btn-step-option-selected");
        }

        const anchor = this.buttons[id].anchor
        anchor.classList.add("btn-step-option-selected");

        this.currentButtonSelected = id

        // notificamos de la respuesta
        eventSystem.publish(Events.ON_RESPONSE_UPDATE, {
            responseID: this.step,
            responseType: Settings.SINGLE_RESPONSE,
            response: this.currentButtonSelected
        })
        

        // Audio, mejor que lo gestione el controller
        var sound = new Howl({
            src: ['sound/click.mp3']
        });
        // sound.play();
    }
}

export default ResponseUnique