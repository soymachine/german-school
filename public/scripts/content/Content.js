import GlobalEvents from '../helpers/GlobalEvents.js'

class Content{
    constructor(contentID){
        this.contentID = contentID
        this.events = GlobalEvents.getInstance()
        this.events.subscribe(GlobalEvents.ON_CONTENT_SHOWN, (content)=>{ this.onContentShown(content)})
        this.events.subscribe(GlobalEvents.ON_CONTENT_HIDE, (content)=>{ this.onContentHide(content)})
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