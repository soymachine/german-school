import {eventSystem, Events} from '../../helpers/EventSystem.js'

class AvatarExtraPicker {
    constructor(id, maxOptions, type) {
        this.type = type
        this.id = id
        this.maxOptions = maxOptions
        const self = this
        // Get the dom elements
        const parentID = `color-picker-${id}`
        const pickerButtons = document.querySelectorAll(`#${parentID} a`).forEach(button => {
            button.onmousedown = function(event) { //asign a function
                self.onButtonClicked(button.id)
            }
    
            button.addEventListener('touchstart', function(event){
                event.preventDefault();
                self.onButtonClicked(button.id)
            }, false); 
        })
    }

    onButtonClicked(id){
        console.log(id)

        eventSystem.publish(Events.ON_PICKER_UPDATE, {
            parent:this.id,
            id:id
        })
    }

    show(){
        console.log("show " + this.id)

        document.getElementById(`color-picker-${this.id}`).style.display = this.type
    }

    hide(){
        console.log("hide " + this.id)
        document.getElementById(`color-picker-${this.id}`).style.display = "none"
    }
}

export default AvatarExtraPicker