import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import Settings from '../helpers/Settings.js'
import Steps from '../helpers/Steps.js'
import { avatarSelection } from '../helpers/AvatarSelection.js'
import AvatarCopier from './avatar/AvatarCopier.js'

class ContentAct4Cinematics_After9 extends Content {
    constructor() {
        super(Steps.ACT_IV_CINEMATICS_AFTER_9)
        
        const self = this
        this.texts = [
            "to update",
            "You are highlighting the issue of <strong>climate change</strong> and <strong>illegal activities in the rainforest</strong> and its impacts on the environment.",
            "More and more <strong>investors are interested</strong> and we have some first talks to plan an expansion strategy.",
            "You have done a great job so far, but I have a <strong>final question for you.</strong>",
        ]
        this.maxSteps =  this.texts.length
        this.step = 1
        this.clicks = 0
        this.isWriting = false
        this.label = document.getElementById("speech-content-act-4-after9")
        this.button = document.getElementById("content-cinematic-act-4-after9-button")

        // Ocultamos bocadillo
        document.querySelectorAll(`#step-${this.contentID} .speech-bubble-element`).forEach(element => element.style.opacity = 0)
        this.loadingElement = document.querySelector(`#step-${this.contentID} .speech-loading`)
        this.loadingImg = document.querySelector(`#step-${this.contentID} #loading-gif`)
        this.buttonImg = document.querySelector(`#step-${this.contentID} #button-arrow`)
        this.loadingElement.style.display = "none"

        this.duration = 1000
        this.rootRect = document.getElementById("root").getBoundingClientRect()
        this.W = this.rootRect.width 
        this.outPosition = this.W * .5
        this.inPosition = 0

        anime.set(`#step-${this.contentID} #sarah, #step-${this.contentID} #sarah-name`, {
            translateX: this.outPosition,
        });

        anime.set(`#step-${this.contentID} #speech-user-avatar`, {
            translateX: -this.outPosition,
        });

        /*
        anime.set(`#step-${this.contentID} #alex, #step-${this.contentID} #alex-name`, {
            translateX: -this.outPosition,
        });
        */

        this.button.onmousedown = function(event) { //asign a function
            self.onClickSpeechBubble()
        }
        //this.button.style.display = "none"
    }

    activateContent(){
        const self = this

        this.showCharacter("sarah", 0, ()=>{
            anime({
                targets:`#step-${this.contentID} .speech-bubble-element`,
                opacity: 1,
                duration: 1000,
                complete: function(anim) {
                    self.updateText()
                  }
            });
        })

        this.showCharacter("speech-user-avatar", 0)
    }

    preactivateContent(){
        this.label.innerHTML = ""
        this.texts[0] = `Congrats! The interview has been a <strong>big success</strong>, <span class='user-name'>${avatarSelection.name}!</span>`
        this.avatarCopier = new AvatarCopier(this.contentID)
        this.avatarCopier.update()
        this.centerAvatarName()
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

    showCharacter(name, posX, callback){
        const delay = 0
        anime({
            targets: `#step-${this.contentID} #${name} , #step-${this.contentID} #${name}-name`,
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
        // add class talking to loadingElement
        this.loadingElement.style.display = "block"
        this.loadingElement.classList.add('talking')
        this.buttonImg.style.display = "none"
        this.loadingImg.style.display = "inline"
        this.isWriting = true

        //*
        typewriter.typeString(this.texts[this.step - 1]).start().callFunction(()=>{
            // Reactivar el bubble de "next"
            this.buttonImg.style.display = "inline"
            this.loadingImg.style.display = "none"
            this.loadingElement.classList.remove('talking')
            this.isWriting = false
        })
        //*/
       
    }
}
export default ContentAct4Cinematics_After9