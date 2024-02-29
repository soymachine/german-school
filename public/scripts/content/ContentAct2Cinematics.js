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
            "More than <strong>half of Earth's rainforests have already been lost</strong> due to the human demand for wood and arable land.",
            "If current deforestation rates continue, these critical habitats could <strong>disappear from the planet completely</strong>",
            "Projects like this are really important to <strong>make an impact</strong> and change this trend. I'm excited to have you here!"
        ]
        this.maxSteps = this.texts.length
        this.step = 1
        this.label = document.getElementById("speech-content-act-2")
        this.button = document.getElementById("content-cinematic-act-2-button")
        this.isWriting = false

        // Ocultamos bocadillo
        document.querySelectorAll(`#step-${this.contentID} .speech-bubble-element`).forEach(element => element.style.opacity = 0)
        this.loadingElement = document.querySelector(`#step-${this.contentID} .speech-loading`)
        this.loadingImg = document.querySelector(`#step-${this.contentID} #loading-gif`)
        this.buttonImg = document.querySelector(`#step-${this.contentID} #button-arrow`)
        this.loadingElement.style.display = "none"
        
        this.duration = 1000
        this.rootRect = document.getElementById("root").getBoundingClientRect()
        this.W = this.rootRect.width 
        this.outPosition = this.W * .75
        this.inPosition = 0

        this.wrapper = document.querySelector(`#step-${this.contentID} .wrapper`);
        const wrapperH = this.W * 0.90185; // 0.90185 es la relación que tenia la imagen anterior para que se acomoden los personajes
        this.wrapper.style.height = `${wrapperH}px`;
        
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
        this.createAvatar();
    }

    preactivateContent(){
        this.texts[0] = `Welcome aboard, <span class='user-name'>${avatarSelection.name}!</span></br>I'm <strong>Dr. Rafael</strong> and I'm a rainforest conservation scientist.`
        //this.updateText()
        this.centerAvatarName()
    }

    activateContent(){
        const self = this

        this.animateParallax();

        /*
        this.showCharacter("rafael", 0, 200, ()=>{
            anime({
                targets:`#step-${this.contentID} .speech-bubble-element`,
                opacity: 1,
                duration: 500,
                complete: function(anim) {
                    self.updateText()
                  }
            });
        })

        this.showCharacter("sarah", 0, 0)
        this.showAvatar(0, 100)
        */
    }

    animateParallax(){
        const rect = document.getElementById("root").getBoundingClientRect();
        const w = rect.width;
        const duration = 6000;
        const imageEasings = "easeInOutQuart"
        const self = this

        const image1Offset = -50;
        anime.set(`#step-${this.contentID} .act-cinematics-background-image-1`, {
            translateX: image1Offset,
            opacity: 0,
        });

        const image2Offset = -100;
        anime.set(`#step-${this.contentID} .act-cinematics-background-image-2`, {
            translateX: image2Offset,
            opacity: 0,
        });

        const image3Offset = -120;
        anime.set(`#step-${this.contentID} .act-cinematics-background-image-3`, {
            translateX: image3Offset,
            opacity: 0,
        });

        // translate
        anime({
            targets: `#step-${this.contentID} .act-cinematics-background-image-1`,
            translateX: 0,
            duration: duration,
            delay: 10,
            easing:imageEasings
        });

        anime({
            targets: `#step-${this.contentID} .act-cinematics-background-image-2`,
            translateX: 0,
            duration: duration,
            delay: 10,
            easing:imageEasings,
            complete: function(anim) {
              self.showCharacters()
            }
        });

        anime({
            targets: `#step-${this.contentID} .act-cinematics-background-image-3`,
            translateX: -20,
            duration: duration,
            delay: 10,
            easing:imageEasings
        });


        // opacity
        anime({
            targets: `#step-${this.contentID} .act-cinematics-background-image`,
            opacity: 1,
            duration: 1000,
            delay: 10,
            easing:'linear'
        });
    }

    showCharacters(){
        const self = this

        this.showCharacter("rafael", 0, 200, ()=>{
            anime({
                targets:`#step-${this.contentID} .speech-bubble-element`,
                opacity: 1,
                duration: 500,
                complete: function(anim) {
                    self.updateText()
                  }
            });
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
export default ContentAct2Cinematics