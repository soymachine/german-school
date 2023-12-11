import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import ResponseUnique from '../helpers/ResponseUnique.js'
import Settings from '../helpers/Settings.js'
import Steps from '../helpers/Steps.js'

class ContentAvatar extends Content {
    constructor(){
        super(Steps.AVATAR)

        console.log("Avatar")
        
        // Scope
        const self = this

        // Sections
        this.sections = [
            {
                id:"hairstyle",
                label:"Hair style"
            },
            {
                id:"haircolor",
                label:"Hair color"
            },
            {
                id:"skin",
                label:"Skin color"
            },
            {
                id:"extras",
                label:"Extras"
            },            
        ]

        this.currentSection = 0
        this.maxSections = this.sections.length

        // Cambiar las secciones
        this.prevSectionArrow = document.querySelector(`#avatar-controller-left`)
        this.nextSectionArrow = document.querySelector(`#avatar-controller-right`)

        this.avatarCurrentLabel = document.getElementById(`avatar-current-label`)

        console.log(this.nextSectionArrow)
        this.addEvent(this.nextSectionArrow, Content.ON_PRESS, (e)=>{this.onNextSectionArrowClicked(e)})
        this.addEvent(this.prevSectionArrow, Content.ON_PRESS, (e)=>{this.onPrevSectionArrowClicked(e)})

        // Los ojos
        this.$eyes = document.getElementById("avatar-eyes-preview");
        this.eyesRect = this.$eyes.getBoundingClientRect();
        this.avatarImgRect = document.querySelector(".avatar-image").getBoundingClientRect()
        this.contentRect = document.querySelector("#content").getBoundingClientRect()
       
        
        // El botón de NEXT
        this.$nextButton = document.querySelector(`#next-button-${this.contentID}`)
        

        this.$nextButton.onmousedown = function(e) { //asign a function
            self.onClickNext()
        }
        this.$nextButton.addEventListener('touchend', function(event){
            event.preventDefault();
            self.onClickNext()
        }, false);

        this.disableNextButton()

        /*
        eventSystem.subscribe(Events.ON_RESPONSE_UPDATE, (responseObj)=>{
            this.onResponseUpdate(responseObj)
        })
        */

        this.addEvent(document.getElementById(`step-${this.contentID}`), Content.ON_MOVE, (event)=>{
            self.onMouseMove(event)
        })
    }

    activateContent(){
        this.contentRect = document.querySelector("#content").getBoundingClientRect()
        console.log(this.contentRect)
        this.eyesRect = this.$eyes.getBoundingClientRect();
        console.log(this.eyesRect)
        this.avatarImgRect = document.querySelector(".avatar-image").getBoundingClientRect()

    }

    onMouseMove(event){
        let x = event.clientX
        let y = event.clientY

        const correccionX = 195
        const correccionY = 131
        const avatarX = (this.avatarImgRect.x + correccionX)
        const avatarY = (this.avatarImgRect.y + correccionY)

        x = x - (this.avatarImgRect.x + correccionX)
        y = y - (this.avatarImgRect.y + correccionY)

        //const angle = this.calculateAngle(avatarX, avatarY, event.clientX, event.clientY)
        const angle = this.getAngle(avatarX, avatarY, event.clientX, event.clientY);
        var radius = 5; // Change this to the desired radius
        var eyeX = 0 + radius * Math.cos(angle);
        var eyeY = 0 + radius * Math.sin(angle);

        this.$eyes.style.left = `${eyeX}px`;
        this.$eyes.style.top = `${eyeY}px`;

        // console.log(`angle ${angle}, eyeX ${eyeX}, eyeY ${eyeY}`)
    }

    getAngle(x1, y1, x2, y2) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        return Math.atan2(dy, dx);
    }

    onNextSectionArrowClicked(event){
        let nextSection = this.currentSection + 1

        if(nextSection >= this.maxSections){
            nextSection = 0
        }
        
        this.currentSection = nextSection

        this.updateSection()
    }

    onPrevSectionArrowClicked(event){
        let nextSection = this.currentSection - 1
        if(nextSection < 0){
            nextSection = this.maxSections - 1
        }

        this.currentSection = nextSection

        this.updateSection()
    }
    
    updateSection(){
        console.log("updateSection this.currentSection " + this.currentSection, this.sections[this.currentSection])
        this.avatarCurrentLabel.innerHTML = this.sections[this.currentSection].label
    }
    

    
    

    onClickNext(){
        if(!this.isNextEnabled){
            return
        }
        
        this.gotoNextStep()
    }
    
}

export default ContentAvatar