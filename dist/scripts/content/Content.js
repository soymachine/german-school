import {eventSystem, Events} from '../helpers/EventSystem.js'

class Content{
    constructor(contentID){
        this.contentID = contentID
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
}


export default Content