import Content from "./Content.js";
import { eventSystem, Events } from "../helpers/EventSystem.js";
import ResponseUnique from "../helpers/ResponseUnique.js";
import Settings from "../helpers/Settings.js";
import Steps from "../helpers/Steps.js";

class IntroMessage extends Content {
    constructor() {
        super(Steps.INTRO_MESSAGE);

        // Scope
        const self = this;
        // this.$answerCorrectIcon = document.querySelector(`#answer-correct-icon`)
        const contentRect = document.querySelector(`#step-${this.contentID}`).getBoundingClientRect();
        this.$bgImage = document.querySelector(".bg-image-message");
        this.$flowersImage = document.querySelector(".bg-image-flowers");
        // this.$bgImage width as contentRect width
        this.$bgImage.style.width = `${contentRect.width}px`;
        this.$flowersImage.style.width = `${contentRect.width}px`;
        this.$flowersImage.style.top = `${contentRect.height - 100}px`;
        // El botón de NEXT
        this.$nextButton = document.querySelector(`#intro-message-button`);

        this.$nextButton.onmousedown = function (e) {
            //asign a function
            self.onClickNext();
        };
        this.$nextButton.addEventListener(
            "touchend",
            function (event) {
                event.preventDefault();
                self.onClickNext();
            },
            false
        );

        //this.disableNextButton()
        /*
        eventSystem.subscribe(Events.ON_RESPONSE_UPDATE, (responseObj)=>{
            this.onResponseUpdate(responseObj)
        })
        */

        const duration = 1000;
        anime({
            targets: `#step-${this.contentID}`,
            opacity: 1,
            duration: duration,
            easing: "easeOutQuad",
        });
    }

    activateContent() {}

    onClickNext() {
        this.gotoNextStep();
    }
}

export default IntroMessage;
