import GlobalEvents from './GlobalEvents.js'
import Settings from './Settings.js'

class ResponseUnique {
    constructor(step){
        this.step = step
        
        // events
        this.events = GlobalEvents.getInstance()

        // Data
        this.buttons = {}

        this.currentButtonSelected = null

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
        })
    }

    onClickSelection(id){
        // Remove previous current class
        if(this.currentButtonSelected != null){
            this.buttons[this.currentButtonSelected].anchor.classList.remove("btn-step-option-selected");
        }

        const anchor = this.buttons[id].anchor
        anchor.classList.add("btn-step-option-selected");

        this.currentButtonSelected = id

        // notificamos de la respuesta
        this.events.notify(GlobalEvents.ON_RESPONSE_UPDATE, {
            responseID: this.step,
            responseType: Settings.SINGLE_RESPONSE,
            response: this.currentButtonSelected
        })
        

        // Audio, mejor que lo gestione el controller
        var sound = new Howl({
            src: ['sound/click.mp3']
        });
        sound.play();
    }
}

export default ResponseUnique