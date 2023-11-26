import ResponseMultiple from '../helpers/ResponseMultiple.js'
import Content from './Content.js'

class ContentDraggable extends Content {
    constructor(){
        super(0)
        
        // Scope
        const self = this

        // Draggeo
        this.isDragging = false
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
        this.distanceThreshold = 40
        this.draggerX = 0
        this.draggerY = 0

        // Evento general para el release
        document.onmouseup = document.touchend = function() { //asign a function
            self.onMouseUp()
        }

        // Zonas de Drag y de Drop
        const draggableItems = document.querySelectorAll(".draggable-item")
        const droppableItems = document.querySelectorAll(".dropzone")
        const draggableZone = document.querySelector(".draggable-zone")
        const content = document.querySelector("#content")
        const dropZone = document.querySelector(".dropzone-content")
        this.draggableZoneBoundingRect  = draggableZone.getBoundingClientRect()
        this.dropZoneBoundingRect  = dropZone.getBoundingClientRect()
        this.contentBoundingRect  = content.getBoundingClientRect()

        // Estructura de datos de los elementos
        this.dragElementsData = [
            {
                id: "realtimealert",
                initialPos: {x:0, y:0},
                correctPos: {x:0, y:0},
                currentPos: {x:0, y:0},
            },
            {
                id: "datamonitoring",
                initialPos: {x:0, y:0},
                correctPos: {x:0, y:0},
                currentPos: {x:0, y:0},
            },
            {
                id: "predictiveanalysis",
                initialPos: {x:0, y:0},
                correctPos: {x:0, y:0},
                currentPos: {x:0, y:0},
            },
            {
                id: "imagerecognition",
                initialPos: {x:0, y:0},
                correctPos: {x:0, y:0},
                currentPos: {x:0, y:0},
            },
        ]

        this.dropElementsData = [
            {
                id: "realtimealert",
                pos: {x:0, y:0}
            },
            {
                id: "datamonitoring",
                pos: {x:0, y:0}
            },
            {
                id: "predictiveanalysis",
                pos: {x:0, y:0}
            },
            {
                id: "imagerecognition",
                pos: {x:0, y:0}
            },
        ]

        // Reposicionar los elementos
        let col = 0
        let row = 0
        let maxCol = 2
        const colMargin = 20
        const rowMargin = 20
        const colWidth = 200
        const rowWidth = 60
        // Elementos de drageo
        draggableItems.forEach((item, i) => {
            // Data element
            const dataElement = this.dragElementsData[i]
            const elementID = dataElement.id
            
            // Punto 0,0
            let x = (this.draggableZoneBoundingRect.x - this.contentBoundingRect.x) + colMargin
            let y = (this.draggableZoneBoundingRect.y - this.contentBoundingRect.y) + rowMargin

            // Posición según fila y columna
            x += col * colWidth
            y += row * rowWidth
            
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
                self.draggingElementPos = i
                self.isDragging = true
                self.draggingElement = item
                self.draggingElementData = dataElement
                self.mouseOriginalPos = {
                    x: self.mouseX,
                    y: self.mouseY
                }

                // NOTA: Esto no siempre será initialPos, porque igual estamos en la parte de drop!!!!
                self.draggingElementOriginalPos = {
                    x: dataElement.currentPos.x,
                    y: dataElement.currentPos.y
                }

                // Incrementaoms el z-index del drageable
                self.draggingElement.style.zIndex = 999
            }

            item.touchstart = function(e) {
                console.log("touchstart")
            }


        })

        // Elementos de dropeo
        droppableItems.forEach((item, i) => {
            const dropBoundingRect = item.getBoundingClientRect()
            const id = item.id.split("-")[1]
            const x = dropBoundingRect.x - self.contentBoundingRect.x
            const y = dropBoundingRect.y - self.contentBoundingRect.y

            const dropData = this.findDropElement(id)
            dropData.pos = {x,y}
        })

        // Track de la posición del mouse
        document.addEventListener('mousemove', (event) => {
            self.mouseX = event.clientX
            self.mouseY = event.clientY
        });

        // Empezamos el loop
        this.startLoop()
    }

    findDropElement(dropID){
        // Find dropID inside dropElementsData
        let dropFound = undefined
        this.dropElementsData.forEach((drop, i) => {
            if(drop.id == dropID){
                dropFound = drop
            }
        })

        return dropFound
    }

    onMouseUp(){
        // Hemos de calcular dónde hemos soltado el elemento
        // Si lo hemos soltado en una zona de drop, mirar el item de esa zona
        // Si no, lo dejamos en su posición original
        if(this.isDragging){
            const id = this.draggingElementID 

            // Qué drop está más cerca?
            let x;
            let y;
            let nearestDrop = null
            let minDistance = 0
            this.dropElementsData.forEach((drop, i) => {
                // Calcular la distancia
                const distance = this.distance(this.draggerX, this.draggerY, drop.pos.x, drop.pos.y)
                if(distance < this.distanceThreshold){
                    nearestDrop = i
                }
            })

            if(nearestDrop != null){
                x = this.dropElementsData[nearestDrop].pos.x
                y = this.dropElementsData[nearestDrop].pos.y
            }else{
                // Calcular aquí se va a la pos inicial o a uno de los drops
                x =  this.draggingElementData.initialPos.x
                y =  this.draggingElementData.initialPos.y
            }
           
            // Idealmente que se muevan a sitio de forma smoooooth
            this.draggingElement.style.left = `${x}px`
            this.draggingElement.style.top = `${y}px`

            // Actualizamos la posición actual
            const dataElement = this.dragElementsData[this.draggingElementPos]
            dataElement.currentPos = {x, y}
            
            // Ponemos el z-index del drageable a su estado original
            this.draggingElement.style.zIndex = 1

           

            if(nearestDrop != null){
                // Está bien puesto o mal puesto?
                const dragID = this.dragElementsData[this.draggingElementPos].id
                const dropID = this.dropElementsData[nearestDrop].id
                // console.log(dragID, dropID)
                
                if(dragID == dropID){
                    // Add class "correct" to draggingElement
                    this.draggingElement.classList.add("correct")     
                    this.draggingElement.classList.remove("incorrect")     

                }else{
                    this.draggingElement.classList.add("incorrect")   
                    this.draggingElement.classList.remove("correct")     
                }
            }else{
                this.draggingElement.classList.remove("incorrect")     
                this.draggingElement.classList.remove("correct")     
            }
            
        }
        
        this.isDragging = false
        this.draggingElement = undefined
        this.draggingElementData = undefined
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
}

export default ContentDraggable