import Header from "./header/Header.js";
import ContentDraggable from "./content/ContentDraggable.js";
import ContentStartup from "./content/ContentStartup.js";
import ContentFinancial from "./content/ContentFinancial.js";
import Settings from "./helpers/Settings.js";
import { eventSystem, Events } from "./helpers/EventSystem.js";
import QuestionaireController from "./questionaire/QuestionaireController.js";
import ContentWhyEnterpreuner from "./content/ContentWhyEnterpreuner.js";
import ContentElevatorPitch from "./content/ContentElevatorPitch.js";
import ContentPatagonia from "./content/ContentPatagonia.js";
import ContentTravelToManaus from "./content/ContentTravelToManaus.js";
import ContentAvatar from "./content/ContentAvatar.js";
import Intro from "./content/Intro.js";
import ContentAct1Cinematics from "./content/ContentAct1Cinematics.js";
import ContentAct2Cinematics from "./content/ContentAct2Cinematics.js";
import ContentAct3Cinematics from "./content/ContentAct3Cinematics.js";
import ContentAct4Cinematics from "./content/ContentAct4Cinematics.js";
import ContentSocialMedia from "./content/ContentSocialMedia.js";
import ContentBusiness from "./content/ContentBusiness.js";
import ContentAct1SarahApproves from "./content/ContentAct1SarahApproves.js";
import ContentAct2PreQuestion from "./content/ContentAct2PreQuestion.js";
import ContentValues from "./content/ContentValues.js";
import SarahQuestion9 from "./content/SarahQuestion9.js";
import ContentAct3AlexAfterIA from "./content/ContentAct3AlexAfterIA.js";
import ContentAct4Cinematics_After9 from "./content/ContentAct4Cinematics_After9.js";
import SarahQuestion10 from "./content/SarahQuestion10.js";
import ContentPrologueCinematics from "./content/ContentPrologueCinematics.js";
import CallToAction from "./content/CallToAction.js";
import ContentForm from "./content/ContentForm.js";
import ContentCongrats from "./content/ContentCongrats.js";
import ContentPointsExplanation from "./content/ContentPointsExplanation.js";
import { currentPunctuation } from "./helpers/Punctuation.js";
import { avatarSelection } from "./helpers/AvatarSelection.js";
import Sound from "./helpers/Sound.js";
import ProgressBar from "./helpers/ProgressBar.js";
import IntroMessage from "./content/IntroMessage.js";
import InterviewImage from "./content/InterviewImage.js";
import ContentDialogue1Cinematics from "./content/ContentDialogue1Cinematics.js";
import ContentDialogue2Cinematics from "./content/ContentDialogue2Cinematics.js";
import ContentAct2Title from "./content/ContentAct2Title.js";
import ContentAct1Title from "./content/ContentAct1Title.js";
import ContentAct3Title from "./content/ContentAct3Title.js";
import ContentAct4Title from "./content/ContentAct4Title.js";

class Controller {
    agent;
    minPosY;

    constructor() {
        this.checkDeviceType();
        this.eventSystem = eventSystem;
        this.Events = Events;
        this.avatarSelection = avatarSelection;

        this.isFooterShown = false;

        // Valores generales del contenedor
        this.$content = document.querySelector("#content");
        this.rootElement = document.getElementById("root");
        this.rootRect = this.rootElement.getBoundingClientRect();

        this.checkRootDimensions();
        this.adjustFooter();
        this.positionDesktopFlowers();
        this.setupScroll();

        // Si esto cambia a causa de un resize del navegador, hay que recalcular la posición del content según el contenido
        this.contentWidth = this.$content.getBoundingClientRect().width;

        // La sección actual
        this.currentSection = 0;

        // Scope
        const that = this;

        // Lista de botones de next
        document.querySelectorAll(".next-step-btn").forEach((button) => {
            const id = button.getAttribute("id").split("-")[3];
            button.onclick = function (e) {
                that.onClickNext(id);
            };
            button.addEventListener(
                "touchend",
                function (event) {
                    event.preventDefault();
                    that.onClickNext(id);
                },
                false
            );
        });

        // Lista de botones de prev
        document.querySelectorAll(".prev-step-btn").forEach((button) => {
            const id = Number(button.getAttribute("id").split("-")[3]);
            button.onclick = function (e) {
                that.onClickPrev(id);
            };
            button.addEventListener(
                "touchend",
                function (event) {
                    event.preventDefault();
                    that.onClickPrev(id);
                },
                false
            );
        });

        // Los diferentes contenidos
        this.content = {};

        // Agregamos segun el contenido

        //- INTRO
        this.intro = new Intro();

        //- INTRO
        this.introMessage = new IntroMessage();

        //- INTRO
        this.interviewImage = new InterviewImage();

        // - AVATAR
        this.contentAvatar = new ContentAvatar();

        // - AVATAR
        this.contentSocialMedia = new ContentSocialMedia();

        // - ACT I CINEMATICS
        this.contentAct1Cinematics = new ContentAct1Cinematics();

        // - ACT II CINEMATICS
        this.contentAct2Cinematics = new ContentAct2Cinematics();

        // - ACT III CINEMATICS
        this.contentAct3Cinematics = new ContentAct3Cinematics();

        // - ACT IV CINEMATICS
        this.contentAct4Cinematics = new ContentAct4Cinematics();

        // - FLOW DIAGRAM
        this.contentDraggable = new ContentDraggable();
        // this.content["content-1"] = new ContentDraggable()

        // - STARTUPS QUESTION
        this.contentMultiple = new ContentStartup();
        //this.content["content-2"] = new Content2()

        // - FINANCIAL METRIC QUESTION
        this.contentFinancial = new ContentFinancial();

        // - WHY ENTERPRENEUR
        this.contentWhyEnterpreuner = new ContentWhyEnterpreuner();

        // - BUSINESS
        this.contentBusiness = new ContentBusiness();

        // - CINEMATICS SARAH APPROVES
        this.contentAct1SarahApproves = new ContentAct1SarahApproves();

        // - ELEVATOR PITCH
        this.contentElevatorPitch = new ContentElevatorPitch();

        // - PATAGONIA FOUNDER
        this.contentPatagonia = new ContentPatagonia();

        // TRAVEL TO MANAUS
        this.travelToManaus = new ContentTravelToManaus();

        // PRE QUESTION TEXTS
        this.contentAct2PreQuestion = new ContentAct2PreQuestion();

        // VALUES
        this.contentValues = new ContentValues();

        // - SARAH QUESTION 9
        this.sarahQuestion9 = new SarahQuestion9();

        // - SARAH QUESTION 9
        this.contentAct4Cinematics_After9 = new ContentAct4Cinematics_After9();

        // - SARAH QUESTION 10
        this.sarahQuestion10 = new SarahQuestion10();

        // - CALL TO ACTION
        this.callToAction = new CallToAction();

        // - CONGRATS
        this.congrats = new ContentCongrats();

        // HEADER
        this.header = new Header();

        // ACTI 1 TITLE
        this.contentAct1Title = new ContentAct1Title();

        // ACTI 2 TITLE
        this.contentAct2Title = new ContentAct2Title();

        // ACTI 3 TITLE
        this.contentAct3Title = new ContentAct3Title();

        // ACTI 4 TITLE
        this.contentAct4Title = new ContentAct4Title();

        // El controlador del questionario
        this.questionaireController = new QuestionaireController();

        // El controlador del questionario
        this.contentPointsExplanation = new ContentPointsExplanation();

        this.contentDialogue1Cinematics = new ContentDialogue1Cinematics();
        this.contentDialogue2Cinematics = new ContentDialogue2Cinematics();

        // El controlador del questionario
        this.settings = new Settings();

        // Progreso del jeugo
        this.progressBar = new ProgressBar();

        this.sound = new Sound();

        this.currentPunctuation = currentPunctuation;

        // TESTING */
        //this.showContent(19); // 16 cinematics done
        document.addEventListener("keydown", (event) => {
            that.onkeydown(event);
        });

        eventSystem.subscribe(Events.ON_REQUEST_STEP, (content) => {
            this.showContent(content);
        }); // this.showContent(this.currentSection)
        eventSystem.subscribe(Events.ON_REQUEST_NEXT_STEP, () => {
            this.onNextContentRequested();
        }); // this.showContent(this.currentSection)

        // listen to an on resize window event
        window.addEventListener("resize", () => {
            this.positionDesktopFlowers();
            that.positionStickyFooter();
        });

        // Force the onResize event of the window
        window.dispatchEvent(new Event("resize"));
    }

    checkDeviceType() {
        const userAgent = navigator.userAgent;

        // Patterns to identify mobile devices
        const mobilePatterns = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

        // Check if the userAgent matches any of the mobile patterns
        if (mobilePatterns.test(userAgent)) {
            console.log("On mobile device");
            this.agent = "mobile";
        } else {
            console.log("On desktop");
            this.agent = "desktop";
        }
    }

    positionStickyFooter() {
        if (this.agent !== "mobile") {
            const containerRect = document.querySelector(".container").getBoundingClientRect();
            //console.log("containerRect.height", containerRect.height);
            if (containerRect.height < 970) {
                document.querySelector(".sticky-footer").style.display = "block";
            } else {
                document.querySelector(".sticky-footer").style.display = "none";
            }
        }
    }

    adjustFooter() {
        console.log("this.agent", this.agent);
        if (this.agent === "mobile") {
            //document.querySelector(".sticky-footer").style.display = "none";
            document.querySelector(".footer-desktop").style.display = "none";
            document.getElementById("scrollbar-container").style.display = "none";
        } else {
            document.querySelector(".sticky-footer").style.display = "none";
            //document.querySelector(".footer-desktop").style.display = "none";
            //document.getElementById("scrollbar-container").style.display = "none";
        }
    }

    positionDesktopFlowers() {
        // check if we are on desktop or on mobile
        if (this.agent === "mobile") {
            return;
        }

        const containerRect = document.querySelector(".container").getBoundingClientRect();
        const rootRect = document.getElementById("root").getBoundingClientRect();
        const leftFlowers = document.getElementById("flower-left");
        const rightFlowers = document.getElementById("flower-right");

        leftFlowers.style.display = `block`;
        rightFlowers.style.display = `block`;

        const leftFlowersRect = leftFlowers.getBoundingClientRect();
        const rightFlowersRect = rightFlowers.getBoundingClientRect();

        const leftFlowrsX = containerRect.width * 0.5 - leftFlowersRect.width - rootRect.width * 0.5;
        const leftFlowrsY = containerRect.height * 0.5 - leftFlowersRect.height * 0.5;

        const rightFlowrsX = containerRect.width * 0.5 + rootRect.width * 0.5;
        const rightFlowrsY = containerRect.height * 0.5 - rightFlowersRect.height * 0.5;

        //console.log("leftFlowrsX", leftFlowrsX);
        //console.log("containerRect.width", containerRect.width);

        leftFlowers.style.top = `${leftFlowrsY}px`;
        leftFlowers.style.left = `${leftFlowrsX}px`;

        rightFlowers.style.top = `${rightFlowrsY}px`;
        rightFlowers.style.left = `${rightFlowrsX}px`;
    }

    checkRootDimensions() {
        console.log("this.rootRect", this.rootRect.height);

        if (this.rootRect.height < 970) {
            const h = 560;
            const w = h * 0.56;
            //console.log("W", w);
            //console.log("H", h);

            // add style width equals to w
            //this.rootElement.style.minHeight = `800px`;
            //this.rootElement.style.width = `${w}px`;
            //document.querySelector("body").style.transform = `scale(0.75)`;
            //document.querySelector(".container").style.transform = `scale(0.75)`;
            //document.getElementById("root").style.transform = `scale(0.75)`;
            //document.getElementById("content").style.transform = `scale(0.7)`;
            //console.log("Ajuste");
        }
    }

    onkeydown = (event) => {
        if (event.key === "ArrowRight") {
            this.showContent(this.currentSection + 1);
        }
        if (event.key === "ArrowLeft") {
            this.showContent(this.currentSection - 1);
        }
    };

    onClickNext(content) {
        console.log(`next es ${content}`);
        this.showContent(content);
    }

    onClickPrev(content) {
        console.log(`prev es ${content}`);
        this.showContent(content);
    }

    onNextContentRequested() {
        this.showContent(this.currentSection + 1);
    }

    showContent(content) {
        console.log(`showContent ${content}`);
        // si el contenido es el mismo que ya hay, no hacemos nada (doble click en continue, por ej)
        if (content == this.currentSection) return;
        // Limite izquierda
        if (content < 0) content = 0;

        const el = document.getElementById(`step-${content}`);
        // opacity to 1
        el.style.opacity = 1;

        const previousContent = this.currentSection;
        // Si hay contenido previo notificamos que desaparece
        eventSystem.publish(Events.ON_CONTENT_BEGIN_HIDE, previousContent);

        const xDest = -this.contentWidth * content;
        anime({
            targets: "#content",
            translateX: xDest,
            easing: Settings.ease,
            delay: 0,
            duration: Settings.duration,
            complete: function (anim) {
                // notificamos el contenido que entra
                eventSystem.publish(Events.ON_CONTENT_SHOWN, content);
                eventSystem.publish(Events.ON_CONTENT_HIDE, previousContent);
            },
        });

        eventSystem.publish(Events.ON_CONTENT_BEGIN_SHOWN, content);

        this.currentSection = content;

        this.checkFooter();
    }

    checkFooter() {
        if (!this.isFooterShown) {
            this.isFooterShown = true;
            anime({
                targets: ".sticky-footer",
                opacity: 1,
                easing: Settings.ease,
                delay: 0,
                duration: Settings.duration,
            });
        }
    }

    moveContent(percent) {
        this.rootRect = this.rootElement.getBoundingClientRect();
        const rootH = this.rootRect.height;
        const windowH = window.innerHeight;

        let y = (windowH - rootH) * percent;
        y += this.minPosY;
        //console.log("moveContent:", percent, "y", y, "window", windowH, "root", rootH);
        this.rootElement.style.top = `${y}px`;
    }

    setupScroll() {
        const that = this;
        const container = document.getElementById("scrollbar-container");
        const tracker = document.getElementById("scrollbar-tracker");

        function updateTrackerHeight() {
            const thirdOfWindowHeight = window.innerHeight / 3;
            tracker.style.height = `${thirdOfWindowHeight}px`;

            // Recalculamos la posición mínima en Y
            if (window.innerHeight < 800) {
                that.minPosY = (800 - window.innerHeight) / 2;
                that.moveContent(0);
                tracker.style.top = `0px`;
                //
                container.style.display = "block";
            } else {
                that.minPosY = 0;
                // make container display none
                container.style.display = "none";
                that.rootElement.style.top = `0px`;
            }
        }

        function moveTracker(e) {
            const containerRect = container.getBoundingClientRect();
            const trackerHeight = tracker.offsetHeight;
            let newY = e.clientY - containerRect.top - trackerHeight / 2;

            // Prevent the tracker from going out of bounds
            newY = Math.max(newY, 0);
            newY = Math.min(newY, window.innerHeight - trackerHeight);
            //console.log("newY", newY, "clientY", e.clientY, "containerRect.top", containerRect.top, "trackerHeight", trackerHeight);
            tracker.style.top = `${newY}px`;

            // Scroll the window based on tracker position
            const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercentage = newY / (window.innerHeight - trackerHeight);
            //that.scrollPercentage = scrollPercentage;
            that.moveContent(scrollPercentage);
            window.scrollTo(0, totalScrollableHeight * scrollPercentage);
        }

        function scrollWithWheel(e) {
            if (window.innerHeight < 800) {
                const trackerHeight = tracker.offsetHeight;
                const containerRect = container.getBoundingClientRect();
                let newY = parseInt(tracker.style.top, 10) || 0; // Get current tracker position, default to 0 if not set
                const scrollAmount = e.deltaY * 0.1; // Positive for scroll down, negative for scroll up

                // Calculate new Y position based on scroll direction
                newY += scrollAmount;

                // Prevent the tracker from going out of bounds
                newY = Math.max(newY, 0);
                newY = Math.min(newY, window.innerHeight - trackerHeight - containerRect.top);

                tracker.style.top = `${newY}px`;

                // Scroll the window based on tracker position
                const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercentage = newY / (window.innerHeight - trackerHeight - containerRect.top);
                that.moveContent(scrollPercentage);
                window.scrollTo(0, totalScrollableHeight * scrollPercentage);
            }
        }

        // Update the tracker height on load and window resize
        updateTrackerHeight();
        window.addEventListener("resize", updateTrackerHeight);

        // Add dragging functionality to the tracker
        tracker.addEventListener("mousedown", function (event) {
            document.addEventListener("mousemove", moveTracker);

            if (event.target === document.getElementById("scrollbar-tracker") || event.target.closest("#scrollbar-tracker")) {
                // Add the no-select class to the body
                document.body.classList.add("no-select");
            }
        });

        // Listen for wheel event on the window or a specific container
        window.addEventListener("wheel", scrollWithWheel);

        document.addEventListener("mouseup", function () {
            document.removeEventListener("mousemove", moveTracker);
            document.body.classList.remove("no-select");
        });
    }
}
export default Controller;
