import Content from "./Content.js";
import { eventSystem, Events } from "../helpers/EventSystem.js";
import ResponseUnique from "../helpers/ResponseUnique.js";
import Settings from "../helpers/Settings.js";
import Steps from "../helpers/Steps.js";
import { currentPunctuation } from "../helpers/Punctuation.js";

class ContentElevatorPitch extends Content {
    constructor() {
        super(Steps.ELEVATOR_PITCH);

        // Scope
        const self = this;
        this.duration = 500;
        this.isNextEnabled = false;
        this.isPressEnabled = true;
        this.isPressingWatch = false;
        this.isFinalResultShown = false;
        this.currentTramo = 0;
        this.xCenter = undefined;
        this.yCenter = undefined;
        this.maxTramos = 4;
        this.angleTramo = 360 / this.maxTramos;
        console.log("angleTRamo", this.angleTramo);
        // Data for the time
        //this.timeData = ["30''", "1m", "1m 30''", "2m", "2m 30''", "3m", "3m 30''", "4m"];
        this.timeData = ["15s", "30s", "60s", "60s"];

        // Images de los timers

        this.timeImages = [];
        this.previousTimeImageSelected = undefined;

        this.$watchAnchor = document.querySelector(`.watch-anchor`);
        this.$timeSelected = document.querySelector(`.time-selected-text`);
        this.$watchImage = document.querySelector(`#watch-image`);

        // El botón de NEXT
        this.$nextButton = document.querySelector(`#next-button-${this.contentID}`);

        this.addEvent(this.$nextButton, Content.ON_RELEASE, function (event) {
            self.onClickNext(event);
        });

        this.addEvent(this.$watchAnchor, Content.ON_PRESS, function (event) {
            self.onPressWatch(event);
        });

        this.addEvent(this.$watchAnchor, Content.ON_RELEASE, function (event) {
            self.onReleaseWatch(event);
        });

        const stepElement = document.getElementById(`step-${this.contentID}`);
        this.addEvent(stepElement, Content.ON_MOVE, function (event) {
            self.setMousePosition(event.clientX, event.clientY);
            self.processMovement();
        });

        this.disableNextButton();
    }

    processMovement() {
        if (!this.isPressEnabled) return;

        if (this.isPressingWatch) {
            this.angle = this.calculateAngle();
            console.log(this.angle);
            this.processAngle();
        }
    }

    onPressWatch(event) {
        if (!this.isPressEnabled) return;

        this.setMousePosition(event.clientX, event.clientY);

        this.distanceFromCenter = this.calculateDistance(this.xCenter, this.yCenter, this.mouseX, this.mouseY);

        if (this.distanceFromCenter < this.radius) {
            this.isPressingWatch = true;
            this.angle = this.calculateAngle();

            this.processAngle();
        } else {
            this.isPressingWatch = false;
        }
    }

    processAngle() {
        const tramo = Math.floor(this.angle / this.angleTramo);
        this.currentTramo = tramo;

        this.$timeSelected.innerText = this.timeData[tramo];

        if (this.previousTimeImageSelected != undefined) {
            this.previousTimeImageSelected.style.opacity = 0;
        }

        this.previousTimeImageSelected = this.timeImages[tramo];
        this.previousTimeImageSelected.style.opacity = 1;
    }

    calculateAngle() {
        const x1 = this.xCenter;
        const y1 = this.yCenter;
        const x2 = this.mouseX;
        const y2 = this.mouseY;
        var dx = x2 - x1;
        var dy = y2 - y1;
        var theta = Math.atan2(dy, dx); // range (-PI, PI]
        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        theta -= 270;
        if (theta < 0) theta = 360 + theta; // range [0, 360)
        if (theta < 0) theta = 360 + theta; // range [0, 360)

        // console.log(`xCenter ${x1} yCenter ${y1} mouseX ${x2} mouseY ${y2} angle ${theta}`)

        return theta;
    }

    onReleaseWatch() {
        if (this.isPressingWatch) {
            this.enableNextButton();
        }
        this.isPressingWatch = false;
    }

    preactivateContent() {
        document.querySelectorAll(`.watch-timer-static`).forEach((timer) => {
            timer.style.left = 2000 + "px";
            timer.style.top = 2000 + "px";
        });
    }

    activateContent() {
        // Contenido ya está mostrado
        this.watchRect = this.$watchImage.getBoundingClientRect();
        const watchWidth = this.watchRect.width;
        const watchHeight = this.watchRect.height;
        this.xCenter = this.watchRect.left + watchWidth / 2;
        this.yCenter = this.watchRect.top + watchHeight / 2;

        // 0.684 es el pòrcentaje de la imagen del círculo respecto del total de la imagen
        this.radius = (this.watchRect.width * 0.52898) / 2; // 0.684

        const self = this;
        document.querySelectorAll(`.watch-timer`).forEach((timer) => {
            const rect = timer.getBoundingClientRect();
            console.log(rect);
            timer.style.left = -(rect.width * 0.5) + "px";
            timer.style.top = -(rect.height * 0.5) - 2 + "px";
            self.timeImages.push(timer);
        });

        document.querySelectorAll(`.watch-timer-static`).forEach((timer) => {
            //timer.style.opacity = 1
            const rect = timer.getBoundingClientRect();
            timer.style.left = -(rect.width * 0.5) + "px";
            timer.style.top = -(rect.height * 0.5) - 2 + "px";
        });
    }

    onClickNext() {
        if (!this.isNextEnabled) {
            return;
        }

        if (!this.isFinalResultShown) {
            this.isFinalResultShown = true;
            const isCorrect = this.currentTramo == 1;
            this.showFinalResult(isCorrect);
            eventSystem.publish(Events.ON_STOP_TICK_TACK_LOOP);
        } else {
            this.gotoNextStep();
            eventSystem.publish(Events.ON_PROGRESS_UPDATE, 7);
        }
    }

    showFinalResult(isCorrect) {
        this.isPressEnabled = false;
        let points = "0";
        let textFinal = "Mmm, not really! <strong>30 seconds</strong> would be the ideal length for an elevator pitch.";
        if (isCorrect) {
            points = "+10";
            currentPunctuation.addPunctuation(10);
            textFinal = "Yes! An elevator pitch should focus on highlighting the <strong>unique selling points.</strong>";
            //this.firstSentence.innerHTML = "<strong>That's correct!</strong>"
        } else {
            //this.firstSentence.innerHTML = "<strong>That's incorrect!</strong>"
        }

        anime({
            targets: `#result-step-${this.contentID}`,
            opacity: 1,
            duration: this.duration,
            easing: "easeOutQuad",
        });

        anime({
            targets: `.watch`,
            scale: 0.9,
            translateY: 0,
            marginBottom: 70,
            duration: this.duration,
            easing: "easeOutQuad",
        });

        /*
        anime({
            targets: `#step-${this.contentID} .button-holder`,
            translateY: 30,
            duration: this.duration,
            easing: "easeOutQuad",
        });
        */

        document.querySelector(`#result-step-${this.contentID} .business-result-points`).innerHTML = points;
        document.querySelector(`.elevator-first-sentence`).innerHTML = "Short and to the point!";
        document.querySelector(`.title-step-${this.contentID} .why-intro-title`).innerHTML = textFinal;
        //document.querySelector(`.title-step-${this.contentID} .why-intro-title`).innerHTML = textFinal
    }

    calculateDistance(x1, y1, x2, y2) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

export default ContentElevatorPitch;
