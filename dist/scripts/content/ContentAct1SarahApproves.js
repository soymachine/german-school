import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import Settings from '../helpers/Settings.js'
import Steps from '../helpers/Steps.js'
import { avatarSelection } from '../helpers/AvatarSelection.js'
import AvatarCopier from './avatar/AvatarCopier.js'

class ContentAct1SarahApproves extends Content {
    constructor() {
        super(Steps.SARAH_APPROVES)
        
        const self = this
        this.greetingsText = `Nice to meet you <span class='user-name'>${avatarSelection.name}!</span><p style='margin-top:20px'>I think you can be the perfect addition to the team</p>`,
        this.label = document.getElementById("speech-content-act-sarah-approves")
        this.button = document.getElementById("content-cinematic-act-sarah-approves-button")
        
        this.button.onmousedown = function(event) { //asign a function
            self.onClickSpeechBubble()
        }
        // this.updateText()

        
    }

    preactivateContent(){
        this.avatarCopier = new AvatarCopier(this.contentID)
        this.avatarCopier.update()
    }

    onClickSpeechBubble() {
        console.log("Click bubble")

        // Exit
        this.gotoNextStep()
        
    }

   
}
export default ContentAct1SarahApproves