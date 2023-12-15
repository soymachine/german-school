import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import Settings from '../helpers/Settings.js'
import Steps from '../helpers/Steps.js'
import { avatarSelection } from '../helpers/AvatarSelection.js'
class ContentAct2Cinematics extends Content {
    constructor() {
        super(Steps.ACT_II_CINEMATICS)
        console.log("Content Act II Cinematics")
        const self = this
        this.greetingsText = `Nice to meet you <span class='user-name'>${avatarSelection.name}!</span><p style='margin-top:20px'>I think you can be the perfect addition to the team</p>`,
        this.texts = [
            "to update",
            "But first I need to test your enterpreneurship skills!"
        ]
        this.maxSteps = 2
        this.step = 1
        this.label = document.getElementById("speech-content-act-1")
        this.button = document.getElementById("content-cinematic-act-1-button")
        this.addEvent(this.button, Content.ON_PRESS, (event)=>{
            self.onClickSpeechBubble()
        })
        // this.updateText()
    }

    preactivateContent(){
        this.texts[0] = `Nice to meet you <span class='user-name'>${avatarSelection.name}!</span><p style='margin-top:20px'>I think you can be the perfect addition to the team</p>`
        this.updateText()
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