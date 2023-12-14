import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import ResponseUnique from '../helpers/ResponseUnique.js'
import Settings from '../helpers/Settings.js'
import Steps from '../helpers/Steps.js'
import AvatarMovement from './avatar/AvatarMovement.js'
import AvatarPicker from './avatar/AvatarPicker.js'
import NamePicker from './avatar/NamePicker.js'
import { avatarSelection } from '../helpers/AvatarSelection.js'

class ContentAvatar extends Content {
    constructor(){
        super(Steps.AVATAR)

        // Singleton al AvatarSelection
        this.avatarSelection = avatarSelection

        // Scope
        const self = this

        // Sections
        this.sections = [
            {
                id:"name",
                label:"Name",
                total:0,
                current:0
            },
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
        this.glasses = document.getElementById("avatar-glasses-preview")
        this.beard = document.getElementById("avatar-beard-preview")
        this.moustache = document.getElementById("avatar-moustache-preview")

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

        /* AVATAR PICKER */
        this.pickers = [
            {
                id:"1",
                picker: new AvatarPicker("1", 8, "grid") // SKINS
            },
            {
                id:"3",
                picker: new AvatarPicker("3", 5, "flex") // HAIR COLORS
            },
            {
                id:"4",
                picker: new AvatarPicker("2", 5, "flex") // BODY COLORS
            },
            {
                id:"5",
                picker: new AvatarPicker("extras", 4, "grid") // EXTRAS
            },
            {
                id:"0",
                picker: new NamePicker("name") // NAME
            },
        ]

        this.extras = ["nothing", "glasses", "moustache", "beard"]
        this.extrasSelected = [true, false, false, false]

        /* STARTUP */
        this.updateSection()
        this.updateCurrentDisplay()

        /* MOVIMIENTO DEL AVATAR */        
        this.avatarMovement = new AvatarMovement({
            id:"#avatar-image",
            eyesID:"#avatar-eyes-image",
            eyebrows:this.eyebrows,
            mouth:this.mouth,
            nose:this.nose,
            eyes:this.$eyes,
            glasses:this.glasses,
            beard:this.beard,
            moustache:this.moustache,
            avatarImgRect: document.querySelector("#avatar-image").getBoundingClientRect(),
            contentID:this.contentID,
        })

        this.updateExtraImage("nothing")

        /* NAME */
        document.getElementById("name-input").onchange = (e)=>{
            const name = document.getElementById("name-input").value
            console.log(name)
            this.avatarSelection.setName(name)
        }

        eventSystem.subscribe(Events.ON_PICKER_UPDATE, (pickerResponseObj)=>{
            this.onPickerUpdate(pickerResponseObj)
        })

        this.hasFinishCreatingAvatar = false
    }

    onPickerUpdate({parent, id}){
        if(parent == "extras"){
            this.onExtraButtonClicked(id)
        }else{
            let nextDisplay = id.split("-")[3]
            nextDisplay = Number(nextDisplay) - 1
            
            console.log(`nextDisplay: ${nextDisplay} currentdisplay: ${this.currentDisplay}, parent: ${parent}`)
            const prev = document.getElementById(`picker-${parent}-color-${(this.currentDisplay + 1)}`)
            console.log(prev)
            prev.classList.remove("current-picker")

            const current = document.getElementById(`picker-${parent}-color-${(nextDisplay + 1)}`)
            // Remove class current-picker
            current.classList.add("current-picker")

            // Falta hacer esto para "extras"
            this.currentDisplay = nextDisplay
            this.updateCurrentDisplay()
        }
    }

    onExtraButtonClicked(id){
        const iconID = id.split("-")[2]
        const nextDisplay = this.extras.findIndex((item)=>{return item == iconID})
        const iconName = this.extras[nextDisplay]
        const img = document.querySelector(`#picker-extras-${iconName} img`)

        // Activamos o Desactivamos? Depende del estado
        // A excepción de "nothing" que no tiene toggle
        let imageState = iconName + ".png"

        if(iconName != "nothing"){
            // Toggle la que clicamos
            this.extrasSelected[nextDisplay] = !this.extrasSelected[nextDisplay]
            
            if(this.extrasSelected[nextDisplay]){
                imageState = iconName + "-active.png"

                this.avatarSelection.addExtra(iconName)
            }else{
                this.avatarSelection.removeExtra(iconName)
            }
        }else{
            // Se queda marcado
            imageState = iconName + "-active.png"

            // Actualizamos el avatar
            this.avatarSelection.removeExtras()
        }
        
        img.src= "./imgs/avatar/controllers/icon-" + imageState


        this.updateExtraImage(iconName, nextDisplay)
        this.currentDisplay = nextDisplay
        this.updateCurrentDisplay()

        
    }

    updateExtraImage(extraImageID, imageIndex){
        // Ocultamos todas
        // console.log("extraImageID: " + extraImageID)

        if(extraImageID == "nothing"){
            document.querySelectorAll(".avatar-body-extra").forEach((item)=>{
                item.style.display = "none"
            })

            this.extras.forEach((id, index)=>{
                if(id != "nothing"){

                    // Desactivamos en el objeto de estados
                    this.extrasSelected[index] = false
                    // Actualizamos las imagenes a "inactivas"
                    const img = document.querySelector(`#picker-extras-${id} img`)
                    img.src= "./imgs/avatar/controllers/icon-" + id + ".png"
                }
            })

        }else{
            // Show / Hide del elemento avatar según el estado
            const avatarElement = document.getElementById(`avatar-${extraImageID}-preview`);

            if (this.extrasSelected[imageIndex]) {
              avatarElement.style.display = "block";
            } else {
              avatarElement.style.display = "none";
            }
            
            // El "nothing" se ha de desmarcar si al final ha quedado algún elemento extra seleccionado
            const total = this.extrasSelected.reduce((acc, item, index) => {
                if(index > 0 && item) acc += 1
                return acc
            }, 0)
            
            if(total > 0){
                this.extrasSelected[0] = true
                document.querySelector(`#picker-extras-nothing img`).src= "./imgs/avatar/controllers/icon-nothing.png"
            }else{
                this.extrasSelected[0] = false
                document.querySelector(`#picker-extras-nothing img`).src= "./imgs/avatar/controllers/icon-nothing-active.png"
            }
        }
        
    }

    activateContent(){
        this.contentRect = document.querySelector("#content").getBoundingClientRect()
        //console.log(this.contentRect)
        this.eyesRect = this.$eyes.getBoundingClientRect();
        //console.log(this.eyesRect)
        this.updateAvatarBasedOnSection()

        this.avatarMovement.activate()
    }

    predeactivateContent(){
        this.avatarMovement.deactivate()
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
            case "name":
                this.updateAvatarSize("big")
                break;
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
                       
    }

    updateDisplayNumber(){
        // Actualizamos el numero
        this.avatarNumberPart.innerHTML = `${this.currentDisplay + 1}/${this.maxDisplays}`
    }

    updateBodyColor(){
        this.body.src = `./imgs/avatar/parts/body-${(this.currentDisplay + 1)}.svg`

        this.avatarSelection.bodyColor = this.currentDisplay
    }

    updateHairColor(){
        this.hair.src = `./imgs/avatar/parts/hair-style-1-color-${(this.currentDisplay + 1)}.svg`
        this.avatarSelection.hairColor = this.currentDisplay
    }
    updateSkin(){
        this.head.src = `./imgs/avatar/parts/skin-${(this.currentDisplay + 1)}.svg` 
        this.eyebrows.src = `./imgs/avatar/parts/eyebrows-skin-${(this.currentDisplay + 1)}.svg` 
        this.mouth.src = `./imgs/avatar/parts/mouth-skin-${(this.currentDisplay + 1)}.svg` 
        this.neck.src = `./imgs/avatar/parts/neck-${(this.currentDisplay + 1)}.svg` 
        this.nose.src = `./imgs/avatar/parts/nose-skin-${(this.currentDisplay + 1)}.svg` 
        this.avatarSelection.skinColor = this.currentDisplay
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

        // Mostramos o ocultamos los botones de pasador de elementos
        if(this.currentSection == 2){
            document.getElementById("avatar-part-number").style.display = "block" // mostramos el avatar-part-number
            document.querySelectorAll(".avatar-display-button").forEach(button => button.style.opacity = 1) // mostramos los avatar-display-button
        }else{
            document.getElementById("avatar-part-number").style.display = "none" // ocultamos el avatar-part-number
            document.querySelectorAll(".avatar-display-button").forEach(button => button.style.opacity = 0) // mostramos los avatar-display-button
        }
       
    }

    onClickNext(){
        if(this.hasFinishCreatingAvatar){
            // Hemos completado y hemos visto el saludo, ya podemos marchar
            this.gotoNextStep()
        }else{
            // Hemos completado el avatar, veremos el saludo
            this.hasFinishCreatingAvatar = true
            this.showGreetings()
        }
    }

    showGreetings(){
        // Avatar en grande
        this.updateAvatarSize("big")

        // Quitamos los pickers
        document.getElementById("color-picker-wrapper").style.display = "none"
        document.getElementById("avatar-part-number").style.display = "none"
        document.querySelector(".avatar-controllers").style.opacity = "0"
        document.querySelectorAll(".avatar-display-button").forEach(button => button.style.opacity = 0) // mostramos los avatar-display-button

        document.querySelector(".avatar-greetings").style.opacity = "1"
        
    }
    
}

export default ContentAvatar