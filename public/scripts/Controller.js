
import Content from './content/Content.js'
import Content1 from './content/Content1.js'
import Content2 from './content/Content2.js'
import Settings from './helpers/Settings.js'
class Controller {
    constructor(){
        // Valores generales del contenedor
        this.$content = document.querySelector("#content")
        
        // Si esto cambia a causa de un resize del navegador, hay que recalcular la posición del content según el contenido
        this.contentWidth = this.$content.getBoundingClientRect().width

        // La sección actual
        this.currentSection = 1
        
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
        this.content["content-1"] = new Content1()

        /* 2.- MULTIPLE RESPONSE */
        this.content["content-2"] = new Content2()

        /* 3.- RESULT */
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

        this.currentSection = content
    }
}
export default Controller