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

        this.isWriting = false

        
        this.duration = 1000
        this.rootRect = document.getElementById("root").getBoundingClientRect()
        this.W = this.rootRect.width 
        this.outPosition = this.W * .75
        this.inPosition = 0

        anime.set(`#step-${this.contentID} #sarah-act-2, #step-${this.contentID} #sarah-name-act-2`, {
            translateX: -this.outPosition,
        });

        anime.set(`#step-${this.contentID} #sarah-act-2`, {
            scaleX: -1
        });

        anime.set(`#step-${this.contentID} #rafael-act-2, #step-${this.contentID} #rafael-name-act-2`, {
            translateX: this.outPosition,
        });

        anime.set(`#step-${this.contentID} #speech-user-avatar`, {
            translateX: -this.outPosition,
        });

        this.button.onmousedown = function(event) { //asign a function
            self.onClickSpeechBubble()
        }
        this.button.style.display = "none"
    }

    preactivateContent(){
        //this.updateText()
        this.avatarCopier = new AvatarCopier(this.contentID)
        this.avatarCopier.update()
        this.centerAvatarName()
    }

    activateContent(){
        this.showCharacter("rafael", 0, 200, ()=>{
            this.updateText()
        })

        this.showCharacter("sarah", 0, 0)
        this.showAvatar(0, 100)
    }

    showCharacter(name, posX, delay = 0, callback = undefined){
        anime({
            targets: `#step-${this.contentID} #${name}-act-2 , #step-${this.contentID} #${name}-name-act-2`,
            translateX: posX,
            duration: this.duration,
            delay: delay,
            easing:'easeOutQuad',
            complete: function(anim) {
                // call callback if it's not null or undefined
                if(callback){
                    callback()
                }
              }
        });
    }

    showAvatar(posX, delay = 0, callback = undefined){
        anime({
            targets: `#step-${this.contentID} #speech-user-avatar`,
            translateX: posX,
            duration: this.duration,
            delay: delay,
            easing:'easeOutQuad',
            complete: function(anim) {
                // call callback if it's not null or undefined
                if(callback){
                    callback()
                }
              }
        });
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
export default ContentAct2PreQuestion