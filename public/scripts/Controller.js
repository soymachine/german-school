
import ContentDraggable from './content/ContentDraggable.js'
import ContentMultiple from './content/ContentMultiple.js'
import ContentFinancial from './content/ContentFinancial.js'
import Settings from './helpers/Settings.js'
import {eventSystem, Events} from './helpers/EventSystem.js'
import QuestionaireController from './questionaire/QuestionaireController.js'
import ContentWhyEnterpreuner from './content/ContentWhyEnterpreuner.js'
import ContentElevatorPitch from './content/ContentElevatorPitch.js'
import ContentPatagonia from './content/ContentPatagonia.js'
import ContentTravelToManaus from './content/ContentTravelToManaus.js'

class Controller {
    constructor(){

        // Valores generales del contenedor
        this.$content = document.querySelector("#content")
        
        // Si esto cambia a causa de un resize del navegador, hay que recalcular la posición del content según el contenido
        this.contentWidth = this.$content.getBoundingClientRect().width

        // La sección actual
        this.currentSection = 0
        
        // Scope
        const that = this

        // Lista de botones de next
        document.querySelectorAll(".next-step-btn").forEach(button => {
            const id = button.getAttribute("id").split("-")[3]
            button.onclick = function(e){
                that.onClickNext(id)
            }
            button.addEventListener('touchend', function(event){
                event.preventDefault();
                that.onClickNext(id)
            }, false);
        })

        // Lista de botones de prev
        document.querySelectorAll(".prev-step-btn").forEach(button => {
            const id = Number(button.getAttribute("id").split("-")[3])
            button.onclick = function(e){
                that.onClickPrev(id)
            }
            button.addEventListener('touchend', function(event){
                event.preventDefault();
                that.onClickPrev(id)
            }, false);
        })

        // Los diferentes contenidos
        this.content = {}

        // Agregamos segun el contenido

        /* 1.- FLOW DIAGRAM */
        this.contentDraggable = new ContentDraggable()
        // this.content["content-1"] = new ContentDraggable()

        /* 2.- STARTUPS QUESTION */
        this.contentMultiple = new ContentMultiple()
        //this.content["content-2"] = new Content2()

        /* 3.- FINANCIAL METRIC QUESTION */
        this.contentFinancial = new ContentFinancial()

        /* 4.- WHY ENTERPRENEUR */
        this.contentWhyEnterpreuner = new ContentWhyEnterpreuner()

        /* 5.- ELEVATOR PITCH */
        this.contentElevatorPitch = new ContentElevatorPitch()

        /* 6.- PATAGONIA FOUNDER */
        this.contentPatagonia = new ContentPatagonia()

        /* TRAVEL TO MANAUS */
        this.travelToManaus = new ContentTravelToManaus() 

        /* 4.- FORM */
        //this.content["content-3"] = new Content3()

        // El controlador del questionario
        this.questionaireController = new QuestionaireController()

        /* MUSIC */
        /*
        var sound = new Howl({
            src: ['sound/song.mp3'],
            autoplay: true,
            loop: true,
            volume: 0.5,
            onend: function() {
                console.log('Finished!');
            }
        });
        */

        /* TESTING */
        this.showContent(3)

        eventSystem.subscribe(Events.ON_REQUEST_STEP, (content)=>{ this.showContent(content) }) // this.showContent(this.currentSection)
    }

    onClickNext(content){
        console.log(`next es ${content}`)
        this.showContent(content)
    }

    onClickPrev(content){
        console.log(`prev es ${content}`)
        this.showContent(content)
    }

    showContent(content){
        const xDest = -this.contentWidth * content
        anime({
            targets: '#content',
            translateX: xDest,
            easing: Settings.ease,
            duration:Settings.duration,
            complete: function(anim) {
                 // notificamos el contenido que entra
                eventSystem.publish(Events.ON_CONTENT_SHOWN, content) 
            }
        });

        // Si hay contenido previo notificamos que desaparece
        eventSystem.publish(Events.ON_CONTENT_HIDE, this.currentSection)

        this.currentSection = content
    }
}
export default Controller