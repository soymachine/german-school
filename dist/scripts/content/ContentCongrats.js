import Content from "./Content.js";
import { eventSystem, Events } from "../helpers/EventSystem.js";
import ResponseUnique from "../helpers/ResponseUnique.js";
import Settings from "../helpers/Settings.js";
import Steps from "../helpers/Steps.js";
import { currentPunctuation } from "../helpers/Punctuation.js";
import { avatarSelection } from "../helpers/AvatarSelection.js";

class ContentCongrats extends Content {
    constructor() {
        super(Steps.CONGRATS);

        // Scope
        const self = this;

        this.$nextButton = document.querySelector(`#next-button-${this.contentID}`);
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

        this.scoreLabel = document.querySelector(`#step-${this.contentID} .score-points-total`);
        this.createAvatar();
    }

    preactivateContent() {
        this.scoreLabel.innerHTML = currentPunctuation.getPunctuation();
        this.setupAvatar();
        document.querySelector(`#step-${this.contentID} .user-name`).innerHTML = avatarSelection.name;
    }

    activateContent() {
        console.log("ON PROGRESS CHANGE false llamada");
        console.log(eventSystem);
        eventSystem.publish("ON_PROGRESS_CHANGE", false);

        //call a confetti function after 1 second
        setTimeout(() => {
            this.generateConfetti();
        }, 100);

        this.updateAvatarImageRect();
    }

    generateConfetti() {
        confetti({
            particleCount: 200,
            spread: 40,
            scalar: 2,
            startVelocity: 70,
            decay: 0.9,
            origin: { y: 0.6 },
        });
        /*
        confetti({
            particleCount: 20,
            spread: 60,
            scalar: 3,
            startVelocity: 70,
            decay: 0.92,
            origin: { y: 0.6 },
        });
        */
    }

    onClickNext() {
        this.gotoNextStep();
    }
}

export default ContentCongrats;
