import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'

class ContentPatagonia extends Content {
    constructor(){
        super(6)
        
        // Scope
        const self = this

        // Draggeo
        this.isDragging = false
        this.isDraggingEnabled = true
        this.draggingElement = undefined
        this.draggingElementPos = undefined
        this.draggingElementData = undefined
        this.mouseX = undefined
        this.mouseY = undefined
        this.mouseOriginalPos = {
            x: undefined,
            y: undefined
        }
        this.draggingElementOriginalPos = {
            x: undefined,
            y: undefined
        }
        this.distanceThreshold = 80
        this.founderImageHeight = 180
        this.draggerX = 0
        this.draggerY = 0
        this.itemsDragged = []
        this.itemWidth = 77
        this.itemHeight = 77
        this.duration = 500

        // Evento general para el release
        document.onmouseup = function() { //asign a function
            self.onMouseUp()
        }

        document.addEventListener('touchend', function(event){
            event.preventDefault();
            self.onMouseUp()
        }, false);

        // El botón de NEXT
        this.$nextButton = document.querySelector(`#next-button-${this.contentID}`)
        this.$nextButton.onmousedown = function(e) { //asign a function
            self.onClickNext()
        }
        this.$nextButton.addEventListener('touchend', function(event){
            event.preventDefault();
            self.onClickNext()
        }, false);
        this.disableNextButton()

        // Zonas de Drag y de Drop
        this.content = document.querySelector(`#step-${this.contentID}`)
        this.dropIndicator = document.querySelector(`#patagonia-drop-indicator`)
        
        // Test images
        //this.testImage = document.querySelector(`#test-image`)
        //this.testImage2 = document.querySelector(`#test-image2`)
        
        // Images de correct / incorrect
        this.correctImage = document.querySelector(`#image-correct`)
        this.incorrectImage = document.querySelector(`#image-incorrect`)


        this.founderImage = document.querySelector(`#founder-image`)

        // Textos
        this.firstSentence = document.querySelector(`#patagonia-first-sentence`)
        this.secondSentence = document.querySelector(`#patagonia-second-sentence`)

        this.draggableZone = document.querySelector(".draggable-zone-patagonia")
        this.draggableCorrectElement = document.querySelector("#draggable-content-correct")
        this.draggableIncorrectElement = document.querySelector("#draggable-content-incorrect")
        this.draggableItems = document.querySelectorAll(".logo-anchor")
        this.dropZone = document.querySelector(".founder-dropzone")

        // Estructura de datos de los elementos
        this.dragElementsData = [
            {
                id: "google",
                initialPos: {x:0, y:0},
                correctPos: {x:0, y:0},
                currentPos: {x:0, y:0},
            },
            {
                id: "snapchat",
                initialPos: {x:0, y:0},
                correctPos: {x:0, y:0},
                currentPos: {x:0, y:0},
            },
            {
                id: "patagonia",
                initialPos: {x:0, y:0},
                correctPos: {x:0, y:0},
                currentPos: {x:0, y:0},
            },
            {
                id: "twitter",
                initialPos: {x:0, y:0},
                correctPos: {x:0, y:0},
                currentPos: {x:0, y:0},
            },
        ]

        this.addEvent(document, Content.ON_MOVE, (event) => {
            self.setMousePosition(event.clientX, event.clientY)
            self.updateDistance()
            self.updateDropIndicator()
            //self.updateTestImage()
        })

        // Para que el cambio del width surja efecto en los getBoundingClientRect de los drop zone
        setTimeout(() => {
            this.getBoundingRects()
            this.positionDraggableElements()
        }, 100)

        // Empezamos el loop
        this.startLoop()
    }

    updateTestImage(){
        // console.log(`updateTestImage: ${this.draggerX} , ${this.draggerY}`)
    }

    updateDistance(){
        const xImage = this.draggerX + (this.itemWidth / 2)
        const yImage = this.draggerY + (this.itemHeight / 2)
        this.distance = this.getDistance(xImage, yImage, this.dropZoneCenterX, this.dropZoneCenterY)

        /*
        this.testImage.style.left = `${xImage}px`
        this.testImage.style.top = `${yImage}px`

        this.testImage2.style.left = `${this.dropZoneCenterX}px`
        this.testImage2.style.top = `${this.dropZoneCenterY}px`
        */
    }

    updateDropIndicator(){

        if(this.isDraggingEnabled){
            if(this.distance < this.distanceThreshold){
                this.dropIndicator.style.opacity = 1
            }else{
                this.dropIndicator.style.opacity = 0
            }        
        }
    }

    activateContent(){
        this.getBoundingRects()
        this.positionDraggableElements()

        /*
        console.log(this.content)
        console.log(this.contentBoundingRect)
        console.log(this.dropZone)
        console.log(this.dropZoneBoundingRect)
        console.log(this.dropZoneCenterX, this.dropZoneCenterY)
        */
    }

    getBoundingRects(){
        this.draggableZoneBoundingRect  = this.draggableZone.getBoundingClientRect()
        this.dropZoneBoundingRect  = this.dropZone.getBoundingClientRect()
        this.contentBoundingRect  = this.content.getBoundingClientRect()
        this.founderImageRect = this.founderImage.getBoundingClientRect()

        this.dropZoneCenterX = (this.dropZoneBoundingRect.width / 2)
        this.dropZoneCenterY = (this.dropZoneBoundingRect.height / 2)

        //this.dropZoneCenterX -= this.contentBoundingRect.x
        //this.dropZoneCenterY -= this.contentBoundingRect.y
    }

    positionDraggableElements(){
        const self = this
        // Reposicionar los elementos
        let col = 0
        let row = 0
        let maxCol = 4
        const marginInterior = 5
        const marginVertical = 10

        // Estos valores han de ser dinámicos
        const W = document.querySelector(`#step-${this.contentID}`).offsetWidth
        const allItemsWidth = (4 * this.itemWidth) + (3 * marginInterior)
        const xStart = (W - allItemsWidth) * .5
        
        

        // Elementos de drageo
        this.draggableItems.forEach((item, i) => {
            // Adjust width of the element as itemWidth
            item.style.width = `${this.itemWidth}px`

            // Data element
            const dataElement = this.dragElementsData[i]
            const elementID = dataElement.id
            
            // Punto 0,0
            let x = xStart // this.draggableZoneBoundingRect.x 
            let y =  this.founderImageHeight + marginVertical // this.draggableZoneBoundingRect.y
            
            // Posición según fila y columna
            x += i * (this.itemWidth + marginInterior)
            // console.log(x, y)
            
            // Actualizamos las posiciones en la data
            dataElement.initialPos = {x, y}
            dataElement.currentPos = {x, y}

            item.style.left = `${x}px`
            item.style.top = `${y}px`

            // Incremento de posiciones
            col += 1
            if(col >= maxCol){
                col = 0
                row += 1
            }
            
            item.onmousedown = function(e) { //asign a function
                self.onMouseDownItem(item, i)
            }

            item.addEventListener('touchstart', function(event){
                event.preventDefault();

                var x = event.touches[0].clientX;
                var y = event.touches[0].clientY;
                console.log(x, y)
                self.setMousePosition(x, y)

                self.onMouseDownItem(item, i)
            }, false);

        })
    }

    onMouseDownItem(item, i){
        if(!this.isDraggingEnabled){
            return
        }
        const dataElement = this.dragElementsData[i]
        const elementID = dataElement.id

        this.draggingElementPos = i
        this.isDragging = true
        this.draggingElement = item
        this.draggingElementData = dataElement
        this.mouseOriginalPos = {
            x: this.mouseX,
            y: this.mouseY
        }

        // NOTA: Esto no siempre será initialPos, porque igual estamos en la parte de drop!!!!
        this.draggingElementOriginalPos = {
            x: dataElement.currentPos.x,
            y: dataElement.currentPos.y
        }

        // Incrementaoms el z-index del drageable
        this.draggingElement.style.zIndex = 999

        this.disableNextButton()
    }

    setMousePosition(x, y){
        this.mouseX = x
        this.mouseY = y
    }

    onMouseUp(){
        // Hemos de calcular dónde hemos soltado el elemento
        // Si lo hemos soltado en una zona de drop, mirar el item de esa zona
        // Si no, lo dejamos en su posición original
        if(this.isDragging){
            const id = this.draggingElementID 
            let x;
            let y;
            // A qué distancia está del centro de la imagen?
            const xImage = this.draggerX + (this.itemWidth / 2)
            const yImage = this.draggerY + (this.itemHeight / 2)
            
            //const distance = this.getDistance(xImage, yImage, this.dropZoneCenterX, this.dropZoneCenterY)
            if(this.distance < this.distanceThreshold){
                // Calcular esto mejor    
                const xOffset = -20
                const yOffset = 10
                x = this.dropZoneCenterX - (this.founderImageRect.width * .5) + xOffset
                y = this.dropZoneCenterY + (this.founderImageRect.height * .5) - this.itemHeight + yOffset

                this.processResponse()
            }else{
                // Calcular aquí se va a la pos inicial o a uno de los drops
                x =  this.draggingElementData.initialPos.x
                y =  this.draggingElementData.initialPos.y
            }
           
            let duration = this.distance * 20
            duration > 500 ? duration = 500 : duration

            anime({
                targets: `#${this.draggingElement.id}`,
                left: x,
                top: y,
                duration: duration,
                easing:'easeOutQuad'
            });

            // Actualizamos la posición actual
            const dataElement = this.dragElementsData[this.draggingElementPos]
            dataElement.currentPos = {x, y}
            
            // Ponemos el z-index del drageable a su estado original
            this.draggingElement.style.zIndex = 1
        }
        
        this.isDragging = false
        this.draggingElement = undefined
        this.draggingElementData = undefined
    }

    processResponse(){
        this.enableNextButton()
        this.isDraggingEnabled = false

        this.draggableItems.forEach((item, i) => {
            // get attribute id from item
            const itemID = item.getAttribute('id')
            const position = itemID.split('-')[1]
            
            if(position == this.draggingElementPos){

            }else{
                console.log(`duration ${this.duration} itemID ${itemID}`)
                anime({
                    targets: `#${itemID}`,
                    scale: 0,
                    duration: this.duration,
                    easing:'easeOutQuad'
                })
            }
        })

        // Marker de correcto / incorrecto
        let imageFinal = this.incorrectImage
        let imageName = "image-incorrect"
        if(this.draggingElementPos == 2){
            imageFinal = this.correctImage
            imageName = "image-correct"

            this.firstSentence.innerHTML = "<strong>That's correct!</strong>"
        }else{
            this.firstSentence.innerHTML = "<strong>That's incorrect!</strong>"
        }
        
        this.secondSentence.innerHTML = "<strong>Yvon Chouinard</strong> founded this American outdoor clothing company in 1973."
        const xOffset = -30
        const yOffset = 30
        let x
        let y
        x = this.dropZoneCenterX + (this.founderImageRect.width * .5) + xOffset
        y = this.dropZoneCenterY + (this.founderImageRect.height * .5) - this.correctImage.getBoundingClientRect().height + yOffset
        
        imageFinal.style.left = `${x}px`
        imageFinal.style.top = `${y}px`

        anime({
            targets: `#${imageName}, #image-patagonia`,
            opacity: 1,
            duration: this.duration,
            easing:'easeOutQuad'
        })
        
        anime({
            targets: `#patagonia-drop-indicator, #patagonia-dashed-line`,
            opacity: 0,
            duration: this.duration,
            easing:'easeOutQuad'
        })
        
        
    }


    startLoop() {
        const self = this
        function frame(timestamp) {
            self.loop()
            window.requestAnimationFrame(frame);
        }
        window.requestAnimationFrame(frame);
    }

    loop() {
        if(this.isDragging){
            
            // Partimos de la posición inicial del elemento
            let x = this.draggingElementOriginalPos.x
            let y = this.draggingElementOriginalPos.y
            
            // Le agregamos la pos del mouse
            const diffMouseX = this.mouseX - this.mouseOriginalPos.x
            const diffMouseY = this.mouseY - this.mouseOriginalPos.y
            x += diffMouseX 
            y += diffMouseY 

            this.draggerX = x
            this.draggerY = y
            
            this.draggingElement.style.left = `${x}px`
            this.draggingElement.style.top = `${y}px`
        }
    }

    distance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    }

    onClickNext(){
        if(!this.isNextEnabled){
            return
        }
        
        this.gotoNextStep()
    }

    
}

export default ContentPatagonia