import {eventSystem, Events} from '../../helpers/EventSystem.js'

class NamePicker  {
    constructor(id) {
        this.id = id
    }

    show(){
        document.getElementById(`${this.id}-picker`).style.display = "block"
    }

    hide(){
        document.getElementById(`${this.id}-picker`).style.display = "none"
    }
}

export default NamePicker