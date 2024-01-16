import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import Settings from '../helpers/Settings.js'
import Steps from '../helpers/Steps.js'
import { avatarSelection } from '../helpers/AvatarSelection.js'
import AvatarCopier from './avatar/AvatarCopier.js'

class ContentAct3Cinematics extends Content {
    constructor() {
        super(Steps.ACT_III_CINEMATICS)
        console.log("Content Act III Cinematics")
        const self = this
        this.texts = [
            "to update",
            "My name is <strong>Alex</strong> and I'm the technical guy. We have lots of stuff to do!",
            "First of all, can you help me <strong>designing the basic functioning of our AI?</strong>",
        ]
        this.maxSteps = this.texts.length
        this.step = 1
        this.label = document.getElementById("speech-content-act-3")
        this.button = document.getElementById("content-cinematic-act-3-button")
        
        this.button.onmousedown = function(event) { //asign a function
            self.onClickSpeechBubble()
        }
        
        // this.updateText()
    }

    preactivateContent(){
        this.texts[0] = `Hi there <strong>Sarah</strong> and nice to meet you, <span class='user-name'>${avatarSelection.name}!</span>`
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
export default ContentAct3Cinematics