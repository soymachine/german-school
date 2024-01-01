import Settings from '../helpers/Settings.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'

class ContentTravelToManaus  {
    constructor() {
        this.$header = document.querySelector(".header")
        this.sticky = document.querySelector(".sticky-header")
        this.acto_1 = {start:0, finish:2}
        this.acto_2 = {start:2, finish:4}
        this.acto_3 = {start:4, finish:6}
        this.acto_4 = {start:6, finish:8}
        
        // opacity 0 for this.sticky
        this.sticky.style.opacity = 0;
        
        eventSystem.subscribe(Events.ON_CONTENT_BEGIN_SHOWN, (content)=>{ this.onContentBeginShown(content) })



        //this.$header.style.opacity = 0
    }


    onContentBeginShown(content){
        /*
        if(content >= this.acto_1.start && content < this.acto_1.finish){        
            this.$headerAct.innerHTML = "ACT I"
        }else if(content >= this.acto_2.start && content < this.acto_2.finish){        
            this.$headerAct.innerHTML = "ACT II"
        }else if(content >= this.acto_3.start && content < this.acto_3.finish){        
            this.$headerAct.innerHTML = "ACT III"
        }else if(content >= this.acto_4.start && content < this.acto_4.finish){        
            this.$headerAct.innerHTML = "ACT IV"
        }
        */

        let opacity = 1
        if(content == 0){
            opacity = 0
        }

        anime({
            targets: '.sticky-header',
            opacity: opacity,
            easing: Settings.ease,
            duration:Settings.duration,                
        });


    }
}

export default ContentTravelToManaus