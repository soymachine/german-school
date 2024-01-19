import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import Settings from '../helpers/Settings.js'
import Steps from '../helpers/Steps.js'
import { avatarSelection } from '../helpers/AvatarSelection.js'
import AvatarCopier from './avatar/AvatarCopier.js'

class ContentAct4Cinematics extends Content {
    constructor() {
        super(Steps.ACT_IV_CINEMATICS)
        
        const self = this
        this.texts = [
            "to update",
            "A journalist from <strong>National Geographic wants to interview you!</strong>"
        ]
        this.maxSteps = 2
        this.step = 1
        this.clicks = 0
        this.isWriting = false
        this.label = document.getElementById("speech-content-act-4")
        this.button = document.getElementById("content-cinematic-act-4-button")


        this.button.onmousedown = function(event) { //asign a function
            self.onClickSpeechBubble()
        }
        
    }

    activateContent(){
        this.updateText()
    }

    preactivateContent(){
        this.label.innerHTML = ""
        this.texts[0] = `<span class='user-name'>${avatarSelection.name}!</span>, the awareness for rainforest protection has grown, and so has our <strong>media attention.</strong>`
        this.avatarCopier = new AvatarCopier(this.contentID)
        this.avatarCopier.update()
    }

    onClickSpeechBubble() {
        console.log("Click bubble")
        if(this.isWriting){
            return
        }

        this.clicks = this.clicks + 1

        const nextStep = this.step + 1

        if(nextStep > this.maxSteps){
            // Exit
            this.gotoNextStep()
        }else{
            this.step = nextStep
            this.updateText()
        }
        
        //this.label.innerHTML = `clicks ${this.clicks}`
    }

    updateText(){
        switch(this.step){
            case 1:
                
                break;
            case 2:
                break;
        }

        this.label.innerHTML = ""
        
        var typewriter = new Typewriter(this.label, {
            loop: false,
            delay: 25,
            cursor:''
        });

        // Quitar el bubble de "next"
        this.button.style.display = 'none'
        this.isWriting = true

        //*
        typewriter.typeString(this.texts[this.step - 1]).start().callFunction(()=>{
            // Reactivar el bubble de "next"
            this.button.style.display = 'contents'
            this.isWriting = false
        })
        //*/
       
    }
}
export default ContentAct4Cinematics