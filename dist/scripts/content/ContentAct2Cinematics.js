import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import Settings from '../helpers/Settings.js'
import Steps from '../helpers/Steps.js'
import { avatarSelection } from '../helpers/AvatarSelection.js'
import AvatarCopier from './avatar/AvatarCopier.js'

class ContentAct2Cinematics extends Content {
    constructor() {
        super(Steps.ACT_II_CINEMATICS)
        console.log("Content Act II Cinematics")
        const self = this
        this.texts = [
            "to update",
            "More than <strong>half of Earth's rain forests have already been lost</strong> due to the human demand for wood and arable land",
            "if current deforestation rates continue, these critical habitats could <strong>disappear from the planet completely</strong>",
            "Projects like this are really important to make an impact and change this trend. I'm excited to have you here!",
            "To become a successful enterpreneur and develop initiatives like this, it is very important to be <strong>well-connected</strong>"
        ]
        this.maxSteps = this.texts.length
        this.step = 1
        this.label = document.getElementById("speech-content-act-2")
        this.button = document.getElementById("content-cinematic-act-2-button")
        
        this.button.onmousedown = function(event) { //asign a function
            self.onClickSpeechBubble()
        }
        
        // this.updateText()
    }

    preactivateContent(){
        this.texts[0] = `Welcome aboard, <span class='user-name'>${avatarSelection.name}!</span>`
        this.updateText()
        this.avatarCopier = new AvatarCopier(this.contentID)
        this.avatarCopier.update()
    }

    onClickSpeechBubble() {
        console.log("Click bubble")

        const nextStep = this.step + 1

        if(nextStep > this.maxSteps){
            // Exit
            this.gotoNextStep()
        }else{
            this.step = nextStep
            this.updateText()
        }
        
    }

    updateText(){
        switch(this.step){
            case 1:
                
                break;
            case 2:
                break;
        }

        this.label.innerHTML = this.texts[this.step - 1]
    }
}
export default ContentAct2Cinematics