import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import ResponseUnique from '../helpers/ResponseUnique.js'
import Settings from '../helpers/Settings.js'
import Steps from '../helpers/Steps.js'
import {currentPunctuation} from '../helpers/Punctuation.js'
import { avatarSelection } from '../helpers/AvatarSelection.js'


class ContentCongrats extends Content {
    constructor(){
        super(Steps.CONGRATS)

        // Scope
        const self = this

        this.$nextButton = document.querySelector(`#next-button-${this.contentID}`)
        this.$nextButton.onmousedown = function(e) { //asign a function
            self.onClickNext()
        }
        this.$nextButton.addEventListener('touchend', function(event){
            event.preventDefault();
            self.onClickNext()
        }, false);

        this.scoreLabel = document.querySelector(`#step-${this.contentID} .score-points-total`)

    }

    preactivateContent(){
        this.scoreLabel.innerHTML = currentPunctuation.getPunctuation()
        this.setupAvatar();
        document.querySelector(`#step-${this.contentID} .user-name`).innerHTML = avatarSelection.name
    }

    activateContent(){
        this.updateAvatarImageRect();
    }

    onClickNext(){
        this.gotoNextStep()
    }
    
}

export default ContentCongrats