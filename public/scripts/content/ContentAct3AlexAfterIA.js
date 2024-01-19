import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import Settings from '../helpers/Settings.js'
import Steps from '../helpers/Steps.js'
import { avatarSelection } from '../helpers/AvatarSelection.js'
import AvatarCopier from './avatar/AvatarCopier.js'

class ContentAct3AlexAfterIA extends Content {
    constructor() {
        super(Steps.ACT_III_CINEMATICS_ALEX_AFTER_IA)
        console.log("Content Act III Alex After IA Cinematics")
        const self = this
        this.texts = [
            "The <strong>'Rainforest Security & Awareness Intelligence'</strong> (RSAI) has been completed!",
            "The monitoring begins and the <strong>AI will detect and illegal</strong> and harmful activity.",
            "We have gained the attention of <strong>environmental activists</strong> and aspiring entrepreneurs.",
        ]
        this.maxSteps = this.texts.length
        this.step = 1
        this.label = document.getElementById("speech-content-act-3-after-ia")
        this.button = document.getElementById("content-cinematic-act-3-after-ia-button")
        
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
export default ContentAct3AlexAfterIA