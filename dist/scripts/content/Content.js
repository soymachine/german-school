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
}


export default Content