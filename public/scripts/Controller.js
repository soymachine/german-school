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
    constructor() {
        this.eventSystem = eventSystem;
        this.Events = Events;
        this.avatarSelection = avatarSelection;

        this.isFooterShown = false;

        // Valores generales del contenedor
        this.$content = document.querySelector("#content");

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

        // - FORM
        this.from = new ContentForm();

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
        this.showContent(3); // 16 cinematics done
        document.addEventListener("keydown", (event) => {
            that.onkeydown(event);
        });

        eventSystem.subscribe(Events.ON_REQUEST_STEP, (content) => {
            this.showContent(content);
        }); // this.showContent(this.currentSection)
        eventSystem.subscribe(Events.ON_REQUEST_NEXT_STEP, () => {
            this.onNextContentRequested();
        }); // this.showContent(this.currentSection)
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
}
export default Controller;
