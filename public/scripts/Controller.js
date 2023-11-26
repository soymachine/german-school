
import Content from './content/Content.js'
import ContentDraggable from './content/ContentDraggable.js'
import Content2 from './content/Content2.js'
import Content3 from './content/Content3.js'
import Settings from './helpers/Settings.js'
import {eventSystem, Events} from './helpers/EventSystem.js'
import QuestionaireController from './questionaire/QuestionaireController.js'
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
        })

        // Lista de botones de prev
        document.querySelectorAll(".prev-step-btn").forEach(button => {
            const id = Number(button.getAttribute("id").split("-")[3])
            button.onclick = function(e){
                that.onClickPrev(id)
            }
        })

        // Los diferentes contenidos
        this.content = {}

        // Agregamos segun el contenido

        /* 1.- UNIQUE RESPONSE */
        this.contentDraggable = new ContentDraggable()
        // this.content["content-1"] = new ContentDraggable()

        /* 2.- MULTIPLE RESPONSE */
        this.content["content-2"] = new Content2()

        /* 3.- FORM */
        this.content["content-3"] = new Content3()

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
        this.showContent(1)
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
            duration:Settings.duration
        });

        // Si hay contenido previo notificamos que desaparece
        eventSystem.publish(Events.ON_CONTENT_HIDE, this.currentSection)

        this.currentSection = content

        // notificamos el contenido que entra
        eventSystem.publish(Events.ON_CONTENT_SHOWN, content) 
    }
}
export default Controller