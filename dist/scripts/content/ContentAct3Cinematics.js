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
            "My name is <strong>Alex</strong> and I am responsible for the technology behind our tool.",
            "First of all, can you help me <strong>design the basic functioning of our AI?</strong>",
        ]
        this.maxSteps = this.texts.length
        this.step = 1
        this.label = document.getElementById("speech-content-act-3")
        this.button = document.getElementById("content-cinematic-act-3-button")
        
        this.duration = 1000
        this.rootRect = document.getElementById("root").getBoundingClientRect()
        this.W = this.rootRect.width 
        this.outPosition = this.W * .75
        this.inPosition = 0

        // Ocultamos bocadillo
        document.querySelectorAll(`#step-${this.contentID} .speech-bubble-element`).forEach(element => element.style.opacity = 0)
        this.loadingElement = document.querySelector(`#step-${this.contentID} .speech-loading`)
        this.loadingImg = document.querySelector(`#step-${this.contentID} #loading-gif`)
        this.buttonImg = document.querySelector(`#step-${this.contentID} #button-arrow`)
        this.loadingElement.style.display = "none"

        anime.set(`#step-${this.contentID} #sarah-act-3, #step-${this.contentID} #sarah-name-act-3`, {
            translateX: -this.outPosition,
        });

        anime.set(`#step-${this.contentID} #sarah-act-3`, {
            scaleX: -1
        });

        anime.set(`#step-${this.contentID} #alex-act-3, #step-${this.contentID} #alex-name-act-3`, {
            translateX: this.outPosition,
        });

        anime.set(`#step-${this.contentID} #speech-user-avatar`, {
            translateX: -this.outPosition,
        });

        this.button.onmousedown = function(event) { //asign a function
            self.onClickSpeechBubble()
        }
        //this.button.style.display = "none"
        
        this.createAvatar();
    }

    preactivateContent(){
        this.texts[0] = `Hi there <strong>Sarah</strong> and nice to meet you, <span class='user-name'>${avatarSelection.name}!</span>`
        //this.updateText()
        
        this.centerAvatarName()
    }

    activateContent(){
        const self = this

        this.showCharacter("alex", 0, 200, ()=>{
            anime({
                targets:`#step-${this.contentID} .speech-bubble-element`,
                opacity: 1,
                duration: 1000,
                complete: function(anim) {
                    self.updateText()
                  }
            });
        })

        this.showCharacter("sarah", 0, 0)
        this.showAvatar(0, 100)
    }

    onClickSpeechBubble() {
        console.log("Click bubble")
        if(this.isWriting){
            // Acabar de escribir todo
            this.typewriter.stop();
            this.label.innerHTML = this.texts[this.step - 1]
            this.onTypeFinish()
            return
        }

        const nextStep = this.step + 1

        if(nextStep > this.maxSteps){
            // Exit
            this.gotoNextStep()
        }else{
            this.step = nextStep
            this.updateText()
        }
        
    }

    showCharacter(name, posX, delay = 0, callback = undefined){
        anime({
            targets: `#step-${this.contentID} #${name}-act-3 , #step-${this.contentID} #${name}-name-act-3`,
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

    updateText(){
        switch(this.step){
            case 1:
                
                break;
            case 2:
                break;
        }

        this.label.innerHTML = ""
        
        this.typewriter = new Typewriter(this.label, {
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
        this.typewriter.typeString(this.texts[this.step - 1]).start().callFunction(()=>{
            this.onTypeFinish()

        })
        //*/
       
    }

    onTypeFinish(){
        this.isWriting = false

        this.buttonImg.style.display = "inline"
        this.loadingImg.style.display = "none"
        this.loadingElement.classList.remove('talking')
    }
}
export default ContentAct3Cinematics