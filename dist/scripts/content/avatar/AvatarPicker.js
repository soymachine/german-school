import {eventSystem, Events} from '../../helpers/EventSystem.js'

class AvatarPicker {
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
        eventSystem.publish(Events.ON_PICKER_UPDATE, {
            parent:this.id,
            id:id
        })
    }

    show(){
        document.getElementById(`color-picker-${this.id}`).style.display = this.type
    }

    hide(){
        document.getElementById(`color-picker-${this.id}`).style.display = "none"
    }
}

export default AvatarPicker