import Content from "./Content.js";
import Settings from "../helpers/Settings.js";
import { eventSystem, Events } from "../helpers/EventSystem.js";
import ResponseUnique from "../helpers/ResponseUnique.js";
import Steps from "../helpers/Steps.js";
import { currentPunctuation } from "../helpers/Punctuation.js";

class ContentFinancial extends Content {
    constructor() {
        super(Steps.FINANCIAL_METRICS);

        // Scope
        const self = this;
        this.isScoreShown = false;

        // Dom Elements
        this.$imageMark = document.querySelector(`#step-${this.contentID} #visual-result-mark`);
        this.$resultTitle = document.querySelector(`#step-${this.contentID} .result-title`);
        this.$resultDescription = document.querySelector(`#step-${this.contentID} .result-description`);
        this.$infoHolder = document.querySelector(`#step-${this.contentID} .info-holder`);
        this.$titleText = document.querySelector(`#step-${this.contentID} .why-intro-title`);
        this.resultElement = document.querySelector(`#result-step-${this.contentID}`);
        this.pointsElement = document.querySelector(`#result-step-${this.contentID} .business-result-points`);

        const stepWidth = document.querySelector(`#step-${this.contentID}`).offsetWidth;
        const stepHeight = this.$infoHolder.offsetHeight;
        this.$infoHolder.style.width = stepWidth - Settings.margin * 2 + "px";
        this.$infoHolder.style.height = stepHeight + "px";

        // Check path images
        this.correctMarkImage = "./imgs/correct.png";
        this.incorrectMarkImage = "./imgs/incorrect.png";

        // Evento general para el release
        /*
        document.addEventListener('touchend', function(event){
            event.preventDefault();

            self.onMouseUp()
        }, false);
        */

        // El botón de NEXT
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
        this.disableNextButton();

        eventSystem.subscribe(Events.ON_RESPONSE_UPDATE, (responseObj) => {
            this.onResponseUpdate(responseObj);
        });

        // Las posibles respuestas, solo podemos marcar una
        this.reponseUnique = new ResponseUnique(this.contentID);
    }

    onResponseUpdate(responseObj) {
        if (responseObj.responseID == this.contentID) {
            this.enableNextButton();
        }
    }

    processResponse() {
        console.log("processResponse");
        // Is the response correct or incorrect?
        const response = this.reponseUnique.currentButtonSelected;

        // Translate X info-holder
        this.moveContent();

        if (response == 1) {
            // Correct
            // Change url of $imageMark to this.correctMarkImage string
            this.$imageMark.src = this.correctMarkImage;

            this.$titleText.innerHTML = "<strong>Correct!</strong> The ROE (Return of Equity) is a very important metric for the shareholders.";
            this.pointsElement.innerHTML = "+10";
            currentPunctuation.addPunctuation(10);
        } else {
            // Incorrect
            // Change url of $imageMark to this.incorrectMarkImage string
            this.$imageMark.src = this.incorrectMarkImage;

            // Add class result-title-wrong
            this.$resultTitle.classList.add("result-title-wrong");

            // Change Text
            if (response == 2) {
                this.$titleText.innerHTML = "<strong>No,</strong> P/E is the Price-to-earnings ratio. The right answer was <strong>ROE (Return of Equity)</strong>";
                this.$resultTitle.innerHTML = "P/E";
            } else {
                this.$titleText.innerHTML = "<strong>No,</strong> ROI is the Return on Investment. The right answer was <strong>ROE (Return of Equity)</strong>";
                this.$resultTitle.innerHTML = "ROI";
            }

            this.pointsElement.innerHTML = "0";
        }

        anime({
            targets: `#result-step-${this.contentID}`,
            opacity: 1,
            duration: 500,
            delay: 1000,
            easing: "easeOutQuad",
        });
    }

    moveContent() {
        const x = (document.querySelector(".step").offsetWidth - 10) * -1;
        const duration = 500;
        anime({
            targets: `#step-${this.contentID} .info-holder`,
            translateX: x,
            duration: duration,
            easing: "easeOutQuad",
        });
    }

    onClickNext() {
        if (!this.isNextEnabled) {
            return;
        }

        if (!this.isScoreShown) {
            this.processResponse();
            this.isScoreShown = true;
            eventSystem.publish(Events.ON_STOP_TICK_TACK_LOOP);
        } else {
            // Vamos a la siguiente sección
            this.gotoNextStep();
            eventSystem.publish(Events.ON_PROGRESS_UPDATE, 3);
        }
    }
}

export default ContentFinancial;
