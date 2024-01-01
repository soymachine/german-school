import {eventSystem, Events} from '../helpers/EventSystem.js'

class Content{
    constructor(contentID){
        this.contentID = contentID
        this.$nextButton = undefined
        this.isNextEnabled = false
        
        eventSystem.subscribe(Events.ON_CONTENT_SHOWN, (content)=>{ this.onContentShown(content)})
        eventSystem.subscribe(Events.ON_CONTENT_HIDE, (content)=>{ this.onContentHide(content)})
        eventSystem.subscribe(Events.ON_CONTENT_BEGIN_SHOWN, (content)=>{ this.onContentBeginShow(content)})
        eventSystem.subscribe(Events.ON_CONTENT_BEGIN_HIDE, (content)=>{ this.onContentBeginHide(content)})
    }

    onContentBeginShow(content){
        if(content == this.contentID){
            
            // Como norma genérica, mostramos el step-content
            document.querySelector("#step-" + this.contentID+ " .step-content").style.display = "block"
            this.preactivateContent()
        }
    }

    onContentBeginHide(content){
        if(content == this.contentID){
            //console.log("Activamos content de " + content)
            this.predeactivateContent()
        }
    }

    onContentShown(content){
        if(content == this.contentID){
            //console.log("Activamos content de " + content)
            this.activateContent()
        }
    }

    onContentHide(content){
        if(content == this.contentID){

            // Como norma genérica, ocultamos el step-content
            document.querySelector("#step-" + this.contentID+ " .step-content").style.display = "none"

            this.deactivateContent()
        }
    }

    preactivateContent(){
        // a implementar quien lo necesite
    }

    predeactivateContent(){
        // a implementar quien lo necesite
    }

    activateContent(){
        // a implementar quien lo necesite
    }

    deactivateContent(){
        // a implementar quien lo necesite
    }

    disableNextButton(){
        this.isNextEnabled = false
        this.$nextButton.style.opacity = 0.5
    }

    enableNextButton(){
        this.isNextEnabled = true   
        this.$nextButton.style.opacity = 1
    }

    gotoNextStep(){
        eventSystem.publish(Events.ON_REQUEST_STEP, this.contentID + 1)
    }

    gotoPrevStep(){
        eventSystem.publish(Events.ON_REQUEST_STEP, this.contentID - 1)
    }

    setMousePosition(x, y){
        this.mouseX = x
        this.mouseY = y
    }

    getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    }

    addEvent(el, type, fn){
        switch(type){
            case Content.ON_PRESS:
                el.onmousedown = function(event) { //asign a function
                    fn(event)
                }
        
                el.addEventListener('touchstart', function(event){
                    event.preventDefault();
                    fn(event.touches[0])
                }, false);        
                break
            case Content.ON_MOVE:
                el.onmousemove = function(event) { //asign a function
                    fn(event)
                }
        
                el.addEventListener('touchmove', function(event){
                    event.preventDefault();
                    fn(event.touches[0])
                }, false);        
                break
            case Content.ON_RELEASE:
                el.onmouseup = function(event) { //asign a function
                    fn(event)
                }
        
                el.addEventListener('touchend', function(event){
                    event.preventDefault();
                    fn(event.touches[0])
                }, false);        
                break
        }
        
    }

    positionElement(id, x, y){
        const el = document.getElementById(id)
        el.style.left = x + "px"
        el.style.top = y + "px"
    }

    calculateAngle(x1, y1, x2, y2) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        var theta = Math.atan2(dy, dx); // range (-PI, PI]
        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        theta += 90; 
        if (theta < 0) theta = 360 + theta; // range [0, 360)
        if (theta < 0) theta = 360 + theta; // range [0, 360)
        return theta;
    }
}

Content.ON_PRESS = "ON_PRESS"
Content.ON_MOVE = "ON_MOVE"
Content.ON_RELEASE = "ON_RELEASE"

export default Content