import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import Settings from '../helpers/Settings.js'
import Steps from '../helpers/Steps.js'
import { avatarSelection } from '../helpers/AvatarSelection.js'
import AvatarCopier from './avatar/AvatarCopier.js'

class ContentPrologueCinematics extends Content {
    constructor() {
        super(Steps.PROLOGUE_CINEMATICS)
        
        const self = this
        
        this.texts = [
            "to update",
            "You have shown your <strong>work ethics</strong> and your will to <strong>make an impact.</strong>",
            "The best part is, you still have a <strong>long way to go:</strong> your story has just started!"
        ]
        this.maxSteps = this.texts.length
        this.step = 1
        this.clicks = 0
        this.isWriting = false
        this.label = document.getElementById("speech-content-prologue")
        this.button = document.getElementById("content-cinematic-prologue-button")
        this.sarah = document.querySelector(`#step-${this.contentID} #sarah`)
        this.rafael = document.querySelector(`#step-${this.contentID} #rafael`)
        this.alex = document.querySelector(`#step-${this.contentID} #alex`)

        this.rootRect = document.getElementById("root").getBoundingClientRect()
        this.W = this.rootRect.width 
        this.outPosition = this.W * .5
        this.inPosition = 0

        anime.set(`#step-${this.contentID} #rafael, #step-${this.contentID} #rafael-name`, {
            translateX: this.outPosition,
        });

        anime.set(`#step-${this.contentID} #alex, #step-${this.contentID} #alex-name`, {
            translateX: this.outPosition,
        });

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

        this.button.onmousedown = function(event) { //asign a function
            self.onClickSpeechBubble()
        }
        this.button.style.display = "none"

        
    }

    activateContent(){
        this.showCharacter("sarah", 0, ()=>{
            this.updateText()
        })

        this.showCharacter("speech-user-avatar", 0)
    }

    preactivateContent(){
        this.label.innerHTML = ""
        this.texts[0] = `<strong>What a journey, <span class='user-name'>${avatarSelection.name}!</span></strong><br>I’m really proud of your commitment with the project.`
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

            this.label.innerHTML = ""
            this.button.style.display = 'none'
            this.moveAvatars();
            //this.updateText()
        }
        
        //this.label.innerHTML = `clicks ${this.clicks}`
    }

    moveAvatars(){
        const t = this;
        if(this.step == 2){
            this.moveSingleAvatar("sarah", "out");
            this.moveSingleAvatar("rafael", "in", 1000, ()=>{
                t.updateText()
            });
        }else if(this.step == 3){
            this.moveSingleAvatar("rafael", "out");
            this.moveSingleAvatar("alex", "in", 1000, ()=>{
                t.updateText()
            });
        }
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

    moveSingleAvatar(name, position, delay = 0, callback = undefined){
        let posX = this.outPosition
        if(position == "in"){
            posX = this.inPosition
        }

        const duration = 1000;

        anime({
            targets: `#step-${this.contentID} #${name} , #step-${this.contentID} #${name}-name`,
            translateX: posX,
            duration: duration,
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
export default ContentPrologueCinematics