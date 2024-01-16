import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import Settings from '../helpers/Settings.js'
import Steps from '../helpers/Steps.js'
import { avatarSelection } from '../helpers/AvatarSelection.js'
import AvatarCopier from './avatar/AvatarCopier.js'

class ContentAct2PreQuestion extends Content {
    constructor() {
        super(Steps.ACT_2_PREQUESTION)
        console.log("Content Act II PreQuestion")
        const self = this
        this.texts = [
            "We must <strong>minimize false alarms</strong> and ensure the accuracy and <strong>effectiveness of the AI.</strong>",
            "Local communities are skeptical, but we must gain their <strong>support</strong> and <strong>trust.</strong>"
        ]
        this.maxSteps = this.texts.length
        this.step = 1
        this.label = document.getElementById("speech-content-act-pre-question")
        this.button = document.getElementById("content-cinematic-act-pre-question-button")
        
        this.button.onmousedown = function(event) { //asign a function
            self.onClickSpeechBubble()
        }
        
        // this.updateText()
    }

    preactivateContent(){
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
export default ContentAct2PreQuestion