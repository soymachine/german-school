import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import ResponseUnique from '../helpers/ResponseUnique.js'
import Settings from '../helpers/Settings.js'


class ContentElevatorPitch extends Content {
    constructor(){
        super(5)

        // Scope
        const self = this
        this.isNextEnabled = false
        this.isPressingWatch = false
        this.xCenter = undefined
        this.yCenter = undefined
        this.maxTramos = 8
        this.angleTramo = 360 / this.maxTramos
        // Data for the time
        this.timeData = [
            "30''",
            "1m",
            "1m 30''",
            "2m",
            "2m 30''",
            "3m",
            "3m 30''",
            "4m",
        ]

        // Images de los timers
        
        this.timeImages = []
        this.previousTimeImageSelected = undefined
        document.querySelectorAll(`.watch-timer`).forEach(timer => {
            const rect = timer.getBoundingClientRect()
            timer.style.left = -(rect.width * .5) + "px"
            timer.style.top = -(rect.height * .5) - 2 + "px"
            self.timeImages.push(timer)
        })

        this.$watchAnchor = document.querySelector(`.watch-anchor`)
        this.$timeSelected = document.querySelector(`.time-selected-text`)
        this.$watchImage = document.querySelector(`#watch-image`)
        
        // El botón de NEXT
        this.$nextButton = document.querySelector(`#next-button-${this.contentID}`)

        this.addEvent(this.$nextButton, Content.ON_RELEASE, function(event){
            self.onClickNext(event)
        })

        this.addEvent(this.$watchAnchor, Content.ON_PRESS, function(event){
            self.onPressWatch(event)
        })

        this.addEvent(this.$watchAnchor, Content.ON_RELEASE, function(event){
            self.onReleaseWatch(event)
        })

        const stepElement = document.getElementById(`step-${this.contentID}`)
        this.addEvent(stepElement, Content.ON_MOVE, function(event){
            self.setMousePosition(event.clientX, event.clientY)
            self.processMovement()
        })

        this.disableNextButton()
    }

    processMovement(){
        if(this.isPressingWatch){
            this.angle = this.calculateAngle()
            this.processAngle()
        }
    }

    onPressWatch(event){
        this.setMousePosition(event.clientX, event.clientY)

        this.distanceFromCenter = this.calculateDistance(this.xCenter, this.yCenter, this.mouseX, this.mouseY)
        
        if(this.distanceFromCenter < this.radius){
            this.isPressingWatch = true
            this.angle = this.calculateAngle()
            this.processAngle()
        }else{
            this.isPressingWatch = false
        }
    }

    processAngle(){
        const tramo = Math.floor(this.angle / this.angleTramo)

        this.$timeSelected.innerText = this.timeData[tramo]

        if(this.previousTimeImageSelected != undefined){
            this.previousTimeImageSelected.style.opacity = 0    
        }

        this.previousTimeImageSelected = this.timeImages[tramo]
        this.previousTimeImageSelected.style.opacity = 1    
    }

    calculateAngle() {
        const x1 = this.xCenter;
        const y1 = this.yCenter;
        const x2 = this.mouseX;
        const y2 = this.mouseY;
        var dx = x2 - x1;
        var dy = y2 - y1;
        var theta = Math.atan2(dy, dx); // range (-PI, PI]
        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        theta -= 270; 
        if (theta < 0) theta = 360 + theta; // range [0, 360)
        if (theta < 0) theta = 360 + theta; // range [0, 360)
        return theta;
    }
    

    onReleaseWatch(){

        if(this.isPressingWatch){
            this.enableNextButton()
        }
        this.isPressingWatch = false
    }

    activateContent(){
        // Contenido ya está mostrado
        this.watchRect = this.$watchImage.getBoundingClientRect()
        this.xCenter = this.watchRect.left + (this.watchRect.width / 2)
        this.yCenter = this.watchRect.top + (this.watchRect.height / 2)
        
        // 0.684 es el pòrcentaje de la imagen del círculo respecto del total de la imagen
        this.radius = (this.watchRect.width * 0.684) / 2
    }
    

    onClickNext(){
        if(!this.isNextEnabled){
            return
        }
        
        this.gotoNextStep()
    }

    calculateDistance(x1, y1, x2, y2) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    
}

export default ContentElevatorPitch