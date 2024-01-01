import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import Settings from '../helpers/Settings.js'
import Steps from '../helpers/Steps.js'
import { avatarSelection } from '../helpers/AvatarSelection.js'
import AvatarCopier from './avatar/AvatarCopier.js'

class ContentAct1SarahApproves extends Content {
    constructor() {
        super(Steps.SARAH_APPROVES)
        
        const self = this
        this.greetingsText = `I'm happy to bring you in! You're ready to meet the rest of the team`,
        this.label = document.getElementById("speech-content-act-sarah-approves")
        this.button = document.getElementById("content-cinematic-act-sarah-approves-button")
        this.isWriting = false
        
        this.button.onmousedown = function(event) { //asign a function
            self.onClickSpeechBubble()
        }
        // this.updateText()

        
    }

    activateContent(){
        this.updateText()
    }

    preactivateContent(){
        this.label.innerHTML = ""
        this.avatarCopier = new AvatarCopier(this.contentID)
        this.avatarCopier.update()
    }

    onClickSpeechBubble() {
        console.log("Click bubble")

        // Exit
        this.gotoNextStep()
        
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
        typewriter.typeString(this.greetingsText).start().callFunction(()=>{
            // Reactivar el bubble de "next"
            this.button.style.display = 'contents'
            this.isWriting = false
        })
        //*/
       
    }

   
}
export default ContentAct1SarahApproves