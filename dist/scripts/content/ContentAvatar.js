import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import ResponseUnique from '../helpers/ResponseUnique.js'
import Settings from '../helpers/Settings.js'
import Steps from '../helpers/Steps.js'
import AvatarMovement from './avatar/AvatarMovement.js'
import AvatarPicker from './avatar/AvatarPicker.js'

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
                total:5,
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

        this.adjustments = {
            "big":{
                size:350,
                x:0, y:0
            },
            "small":{
                size:300,
                x:30, y:-50
            },
        }       

        this.avatarRatio = 1.3

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
        
        this.contentRect = document.querySelector("#content").getBoundingClientRect()

        /* BODY PARTS */
        this.hair = document.getElementById("avatar-hair-preview")
        this.head = document.getElementById("avatar-head-preview")
        this.eyebrows = document.getElementById("avatar-eyebrows-preview")
        this.mouth = document.getElementById("avatar-mouth-preview")
        this.neck = document.getElementById("avatar-neck-preview")
        this.nose = document.getElementById("avatar-nose-preview")
        this.body = document.getElementById("avatar-body-preview")

        // Toda la imaen
        this.avatarImage = document.querySelector(".avatar-image")

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

        // this.disableNextButton()

        this.addEvent(document.getElementById(`step-${this.contentID}`), Content.ON_MOVE, (event)=>{
            self.onMouseMove(event)
        })

        /* AVATAR PICKER */
        this.pickers = [
            {
                id:"0",
                picker: new AvatarPicker("1", 8, "grid")
            },
            {
                id:"3",
                picker: new AvatarPicker("2", 5, "flex")
            },
            {
                id:"2",
                picker: new AvatarPicker("3", 5, "flex")
            },
        ]

        /* STARTUP */
        this.updateSection()
        this.updateCurrentDisplay()

        /* MOVIMIENTO DEL AVATAR */        
        this.avatarMovement = new AvatarMovement({
            eyebrows:this.eyebrows,
            mouth:this.mouth,
            nose:this.nose,
            eyes:this.$eyes,
            contentID:this.contentID
        })

        

        eventSystem.subscribe(Events.ON_PICKER_UPDATE, (pickerResponseObj)=>{
            this.onPickerUpdate(pickerResponseObj)
        })
    }

    onPickerUpdate({parent, id}){
        console.log(parent)
        console.log(this.currentDisplay)

        //picker-1-color-1
        const prev = document.getElementById(`picker-${parent}-color-${(this.currentDisplay + 1)}`)
        // Remove class current-picker
        prev.classList.remove("current-picker")

        let nextDisplay = id.split("-")[3]
        nextDisplay = Number(nextDisplay) - 1
        console.log(nextDisplay)
        this.currentDisplay = nextDisplay

        const current = document.getElementById(`picker-${parent}-color-${(this.currentDisplay + 1)}`)
        // Remove class current-picker
        current.classList.add("current-picker")

        this.updateCurrentDisplay()
    }

    activateContent(){
        this.contentRect = document.querySelector("#content").getBoundingClientRect()
        //console.log(this.contentRect)
        this.eyesRect = this.$eyes.getBoundingClientRect();
        //console.log(this.eyesRect)
        this.updateAvatarBasedOnSection()

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
        this.sections[this.currentSection].current = this.currentDisplay

        this.updateDisplayNumber()
        this.updateAvatarBasedOnSection()

        switch(currentSectionID){
            case "skin":
                this.updateSkin()
                break;
            case "hairstyle":
                break;
            case "haircolor":
                this.updateHairColor()
                break;
            case "bodycolor":
                this.updateBodyColor()
                break;
            case "extras":
                break;
        }
    }

    updateAvatarBasedOnSection(){
        const currentSectionID = this.sections[this.currentSection].id
        switch(currentSectionID){
            case "skin":
                this.updateAvatarSize("small")
                break;
            case "hairstyle":
                this.updateAvatarSize("big")
                break;
            case "haircolor":
                this.updateAvatarSize("small")
                break;
            case "bodycolor":
                this.updateAvatarSize("small")
                break;
            case "extras":
                this.updateAvatarSize("small")
                break;
        }
    }

    updateAvatarSize(sizeType, duration = 500){
        const {size, x, y} = this.adjustments[sizeType]

        const self = this
        anime({
            targets: `.avatar-body-part, #avatar-eyes-image, #avatar-ref`,
            width: size,
            duration: duration,
            easing:'easeOutQuad',
            complete: function(anim) {
                self.avatarMovement.updateAvatarSize(size)
            }
        })

        anime({
            targets: `#avatar-ref`,
            height: (size * this.avatarRatio) + y,
            duration: duration,
            easing:'easeOutQuad',            
        })

        anime({
            targets: `.avatar-image, #avatar-ref`,
            translateX:x,
            translateY:y,
            duration: duration,
            easing:'easeOutQuad',            
        })
        
        if(sizeType == "big"){
            document.getElementById("avatar-part-number").style.display = "block" // mostramos el avatar-part-number
            document.getElementById("color-picker-wrapper").style.display = "none" 
            //document.querySelectorAll(".avatar-display-button").forEach(button => button.style.opacity = 1) // mostramos los avatar-display-button
        }else{
            document.getElementById("avatar-part-number").style.display = "none" // ocultamos el avatar-part-number
            document.getElementById("color-picker-wrapper").style.display = "block"
            //document.querySelectorAll(".avatar-display-button").forEach(button => button.style.opacity = 0) // mostramos los avatar-display-button
        }
        
    }

    

    updateDisplayNumber(){
        // Actualizamos el numero
        this.avatarNumberPart.innerHTML = `${this.currentDisplay + 1}/${this.maxDisplays}`
    }

    updateBodyColor(){
        this.body.src = `./imgs/avatar/parts/body-${(this.currentDisplay + 1)}.svg`
    }


    updateHairColor(){
        this.hair.src = `./imgs/avatar/parts/hair-style-1-color-${(this.currentDisplay + 1)}.svg`

        
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
        //console.log("updateSection this.currentSection " + this.currentSection, this.sections[this.currentSection])
        this.avatarCurrentLabel.innerHTML = this.sections[this.currentSection].label
        
        this.updateAvatarBasedOnSection()
        this.updatePicker()
    }

    updatePicker(){
        this.pickers.forEach(pickerElement => {
            if(pickerElement.id == this.currentSection){
                pickerElement.picker.show()
            }else{
                pickerElement.picker.hide()
            }
        })

        // Iterate
    }

    onMouseMove(event){
        /*
        let x = event.clientX
        let y = event.clientY

        const correccionX = 195 // estos números en base a las dimensiones de la imagen!
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
        */
    }

    
    

    onClickNext(){
        this.gotoNextStep()
    }
    
}

export default ContentAvatar