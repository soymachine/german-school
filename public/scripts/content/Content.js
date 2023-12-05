import {eventSystem, Events} from '../helpers/EventSystem.js'

class Content{
    constructor(contentID){
        this.contentID = contentID
        this.$nextButton = undefined
        this.isNextEnabled = false
        eventSystem.subscribe(Events.ON_CONTENT_SHOWN, (content)=>{ this.onContentShown(content)})
        eventSystem.subscribe(Events.ON_CONTENT_HIDE, (content)=>{ this.onContentHide(content)})
    }

    onContentShown(content){
        if(content == this.contentID){
            this.activateContent()
        }
    }

    onContentHide(content){
        if(content == this.contentID){
            this.deactivateContent()
        }
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
}

Content.ON_PRESS = "ON_PRESS"
Content.ON_MOVE = "ON_MOVE"
Content.ON_RELEASE = "ON_RELEASE"

export default Content