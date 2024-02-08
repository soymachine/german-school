import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import ResponseUnique from '../helpers/ResponseUnique.js'
import Settings from '../helpers/Settings.js'
import Steps from '../helpers/Steps.js'

class CallToAction extends Content {
    constructor(){
        super(Steps.CALL_TO_ACTION)

        // Scope
        const self = this

        this.$nextButton = document.querySelector(`#next-button-${this.contentID}`)
        this.$nextButton.onmousedown = function(e) { //asign a function
            self.onClickNext()
        }
        this.$nextButton.addEventListener('touchend', function(event){
            event.preventDefault();
            self.onClickNext()
        }, false);

        this.createAvatar();
    }

    activateContent(){
        this.updateAvatarImageRect();
    }

    preactivateContent(){
        this.setupAvatar();
    }

    onClickNext(){
        this.gotoNextStep()
    }
    
}

export default CallToAction