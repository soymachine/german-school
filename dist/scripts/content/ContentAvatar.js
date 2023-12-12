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
                id:"skin",
                label:"Skin color",
                total:8,
                current:0
            },
            {
                id:"hairstyle",
                label:"Hair style",
                total:12,
                current:0
            },
            {
                id:"haircolor",
                label:"Hair color",
                total:4,
                current:0
            },
            {
                id:"bodycolor",
                label:"Body color",
                total:5,
                current:0
            },
            {
                id:"extras",
                label:"Extras",
                total:3,
                current:0
            },            
        ]

        this.currentSection = 0
        this.maxSections = this.sections.length

        this.currentDisplay = 0
        this.maxDisplays = this.sections[this.currentSection].total

        // Cambiar las secciones
        this.prevSectionButton = document.querySelector(`#avatar-controller-left`)
        this.nextSectionButton = document.querySelector(`#avatar-controller-right`)
        this.avatarCurrentLabel = document.getElementById(`avatar-current-label`)

        // Cambiar de type
        this.prevDisplayButton = document.getElementById("avatar-display-left")
        this.nextDisplayButton = document.getElementById("avatar-display-right")

        /* EVENTS */
        this.addEvent(this.nextSectionButton, Content.ON_PRESS, (e)=>{this.onNextSectionButtonClicked(e)})
        this.addEvent(this.prevSectionButton, Content.ON_PRESS, (e)=>{this.onPrevSectionButtonClicked(e)})
        this.addEvent(this.prevDisplayButton, Content.ON_PRESS, (e)=>{this.onPrevDisplayButtonClicked(e)})
        this.addEvent(this.nextDisplayButton, Content.ON_PRESS, (e)=>{this.onNextDisplayButtonClicked(e)})

        // Los ojos
        this.$eyes = document.getElementById("avatar-eyes-preview");
        this.eyesRect = this.$eyes.getBoundingClientRect();
        this.avatarImgRect = document.querySelector(".avatar-image").getBoundingClientRect()
        this.contentRect = document.querySelector("#content").getBoundingClientRect()

        /* BODY PARTS */
        this.hair = document.getElementById("avatar-hair-preview")
        this.head = document.getElementById("avatar-head-preview")
        this.eyebrows = document.getElementById("avatar-eyebrows-preview")
        this.mouth = document.getElementById("avatar-mouth-preview")
        this.neck = document.getElementById("avatar-neck-preview")
        this.nose = document.getElementById("avatar-nose-preview")
        this.body = document.getElementById("avatar-body-preview")

        this.avatarNumberPart = document.getElementById("avatar-part-number")
       
        
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


        /* STARTUP */
        this.updateSection()
        this.updateCurrentDisplay()
    }

    activateContent(){
        this.contentRect = document.querySelector("#content").getBoundingClientRect()
        //console.log(this.contentRect)
        this.eyesRect = this.$eyes.getBoundingClientRect();
        //console.log(this.eyesRect)
        this.avatarImgRect = document.querySelector(".avatar-image").getBoundingClientRect()

    }

    onNextDisplayButtonClicked(event){
        let nextDisplay = this.currentDisplay + 1
        if(nextDisplay >= this.maxDisplays){
            nextDisplay = 0
        }
        console.log(this.maxDisplays)
        this.currentDisplay = nextDisplay

        this.updateCurrentDisplay()
        
    }

    onPrevDisplayButtonClicked(event){
        let nextDisplay = this.currentDisplay - 1
        if(nextDisplay < 0){
            nextDisplay = this.maxDisplays - 1
        }

        this.currentDisplay = nextDisplay

        this.updateCurrentDisplay()
    }

    updateCurrentDisplay(){

        const currentSectionID = this.sections[this.currentSection].id
        this.sections[this.currentSection].current =this.currentDisplay

        this.updateDisplayNumber()

        switch(currentSectionID){
            case "skin":
                this.updateSkin()
                break;
            case "hairstyle":
                break;
            case "haircolor":
                break;
            case "bodycolor":
                this.updateBodyColor()
                break;
            case "extras":
                break;
        }
        
        
    }

    updateDisplayNumber(){
        // Actualizamos el numero
        this.avatarNumberPart.innerHTML = `${this.currentDisplay + 1}/${this.maxDisplays}`
    }

    updateBodyColor(){
        this.body.src = `./imgs/avatar/parts/body-${(this.currentDisplay + 1)}.svg`
    }

    updateSkin(){
        this.head.src = `./imgs/avatar/parts/skin-${(this.currentDisplay + 1)}.svg` 
        this.eyebrows.src = `./imgs/avatar/parts/eyebrows-skin-${(this.currentDisplay + 1)}.svg` 
        this.mouth.src = `./imgs/avatar/parts/mouth-skin-${(this.currentDisplay + 1)}.svg` 
        this.neck.src = `./imgs/avatar/parts/neck-${(this.currentDisplay + 1)}.svg` 
        this.nose.src = `./imgs/avatar/parts/nose-skin-${(this.currentDisplay + 1)}.svg` 
    }

    onNextSectionButtonClicked(event){
        let nextSection = this.currentSection + 1

        if(nextSection >= this.maxSections){
            nextSection = 0
        }
        
        this.currentSection = nextSection
        this.maxDisplays = this.sections[this.currentSection].total

        this.updateSection()
        this.updateDisplayNumber()
    }

    onPrevSectionButtonClicked(event){
        let nextSection = this.currentSection - 1
        if(nextSection < 0){
            nextSection = this.maxSections - 1
        }

        this.currentSection = nextSection
        this.maxDisplays = this.sections[this.currentSection].total

        this.updateSection()
        this.updateDisplayNumber()
    }
    
    updateSection(){

        this.currentDisplay = this.sections[this.currentSection].current
        console.log("updateSection this.currentSection " + this.currentSection, this.sections[this.currentSection])
        this.avatarCurrentLabel.innerHTML = this.sections[this.currentSection].label
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
    

    onClickNext(){
        if(!this.isNextEnabled){
            return
        }
        
        this.gotoNextStep()
    }
    
}

export default ContentAvatar