import {eventSystem, Events} from '../helpers/EventSystem.js'

class ProgressBar {
    constructor() {
        this.progress = 0 
        this.duration = 1000
        this.correctionX = -4;
        this.delayTime = 0
        this.currentProgress = document.querySelector(".current-progress")
        this.progressWedge = document.querySelector(".progress-wedge")
        this.headerTitle = document.querySelector(".header-title")

        const progressWrapper = document.querySelector(".progress-wrapper")
        this.wrapperRect = progressWrapper.getBoundingClientRect()

        this.maxWidth = this.wrapperRect.width
        console.log("Wrapper Width " + this.maxWidth)
        
        eventSystem.subscribe(Events.ON_PROGRESS_UPDATE, (newProgress)=>{ this.onProgressUpdate(newProgress) })
        eventSystem.subscribe(Events.ON_PROGRESS_CHANGE, (isShown)=>{ this.onProgressChange(isShown) })
    }

    onProgressChange(isShown){
      let opacity;
      let duration = this.duration
      console.log("onProgressChange isShown: " + isShown)
      if(isShown){
          opacity = 1
          this.headerTitle.classList.add("header-title-up")
      }else{
          opacity = 0
          this.headerTitle.classList.remove("header-title-up")
          duration = this.duration / 2
      }

      anime({
        targets: `.progress-wrapper`,
        opacity: opacity,
        duration: duration,
        easing:'easeInOutQuad'
      });
    }

    onProgressUpdate(newProgress){
      const progressPercent = newProgress * 10
      anime({
        targets: `.current-progress`,
        width: `${progressPercent}%`,
        duration: this.duration,
        easing:'easeInOutQuad',
        delay:this.delayTime,
      });

      const progr = progressPercent / 100
      console.log("newProgress " + newProgress)
      console.log("progressPercent " + progressPercent)
      console.log("progress " + progr)
      
      const x = (this.maxWidth * progr ) + this.correctionX
      console.log("x " + x)

      anime({
        targets: `.progress-wedge`,
        translateX: x,
        duration: this.duration,
        easing:'easeInOutQuad',
        delay:this.delayTime,
      });

    }
  }
  
export default ProgressBar