
import Content from './content/Content.js'
import Content1 from './content/Content1.js'
import Settings from './helpers/Settings.js'
class Controller {
    constructor(){
        // Valores generales del contenedor
        this.$content = document.querySelector("#content")
        
        // Si esto cambia a causa de un resize del navegador, hay que recalcular la posición del content según el contenido
        this.contentWidth = this.$content.getBoundingClientRect().width

        // La sección actual
        this.currentSection = 1
        
        const list = document.querySelectorAll(".next-step-btn")
        const that = this
        list.forEach(button => {
            const id = button.getAttribute("id").split("-")[3]
            button.onclick = function(e){
                that.onClick(id)
            }
        })

        // Los diferentes contenidos
        this.content = {}

        // Agregamos segun el contenido

        /* 1.- IMAGE + TEXT + NEXT */
        this.content["content-1"] = new Content1()
        /* 2.- FORM (UNIQUE) */
        /* 3.- RESULT */
    }

    onClick(id){
        const idNum = Number(id)
        const xDest = -this.contentWidth * idNum
        anime({
            targets: '#content',
            translateX: xDest,
            easing: Settings.ease,
            duration:Settings.duration
          });

          this.currentSection = idNum
    }
}
export default Controller