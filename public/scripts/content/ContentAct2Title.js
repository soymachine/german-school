import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import Settings from '../helpers/Settings.js'
import Steps from '../helpers/Steps.js'
import { avatarSelection } from '../helpers/AvatarSelection.js'
import AvatarCopier from './avatar/AvatarCopier.js'

class ContentAct2Title extends Content {
    constructor() {
        super(Steps.ACT_2_TITLE)
        
        const self = this
        this.duration = 500;
    }

    activateContent(){
        const rect = document.getElementById("root").getBoundingClientRect();
        const w = rect.width;

        anime.set(`#step-${this.contentID} .upper-line-1, #step-${this.contentID} .upper-line-2`, {
            translateX: w,
            opacity: 1,
        });

        anime.set(`#step-${this.contentID} .lower-line-1, #step-${this.contentID} .lower-line-2`, {
            translateX: -w,
            opacity: 1,
        });

        anime({
            targets: `#step-${this.contentID} .upper-line-1`,
            translateX: 0,
            opacity: 1,
            duration: this.duration,
            delay: 0,
            easing:'easeOutQuad'
        });

        anime({
            targets: `#step-${this.contentID} .upper-line-2`,
            translateX: 0,
            opacity: 1,
            duration: this.duration,
            delay: 100,
            easing:'easeOutQuad'
        });

        anime({
            targets: `#step-${this.contentID} .lower-line-1`,
            translateX: 0,
            opacity: 1,
            duration: this.duration,
            delay: 0,
            easing:'easeOutQuad'
        });

        anime({
            targets: `#step-${this.contentID} .lower-line-2`,
            translateX: 0,
            opacity: 1,
            duration: this.duration,
            delay: 100,
            easing:'easeOutQuad'
        });


        anime({
            targets: `#step-${this.contentID} .single-img`,
            translateX: 0,
            opacity: 1,
            duration: 1000,
            delay: 600,
            easing:'easeOutQuad'
        });

    }

    preactivateContent(){
        
    }

   

}
export default ContentAct2Title