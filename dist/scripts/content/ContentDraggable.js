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
        this.itemsDragged = []

        // Evento general para el release
        document.onmouseup = function() { //asign a function
            self.onMouseUp()
        }

        document.addEventListener('touchend', function(e){
            self.onMouseUp()
        }, false);



        

        // Zonas de Drag y de Drop
        this.draggableCorrectElement = document.querySelector("#draggable-content-correct")
        this.draggableIncorrectElement = document.querySelector("#draggable-content-incorrect")
        const draggableItems = document.querySelectorAll(".draggable-item")
        const droppableItems = document.querySelectorAll(".dropzone")
        this.draggableZone = document.querySelector(".draggable-zone")
        const content = document.querySelector("#content")
        const dropZone = document.querySelector(".dropzone-content")
        this.draggableZoneBoundingRect  = this.draggableZone.getBoundingClientRect()
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
                pos: {x:0, y:0},
                droppedID: undefined
            },
            {
                id: "datamonitoring",
                pos: {x:0, y:0},
                droppedID: undefined
            },
            {
                id: "predictiveanalysis",
                pos: {x:0, y:0},
                droppedID: undefined
            },
            {
                id: "imagerecognition",
                pos: {x:0, y:0},
                droppedID: undefined
            },
        ]

        // Reposicionar los elementos
        let col = 0
        let row = 0
        let maxCol = 2
        
        // Estos valores han de ser dinámicos
        const W = document.querySelector("#root").offsetWidth
        const marginExterior = 20
        const marginInterior = 10
        const colMargin = 8
        const rowMargin = 10
        const extraWSpace = 20

        const itemWidth = (W - (marginExterior * 2) - (marginInterior * 3)) / 2
        const rowWidth = 60
        // Elementos de drageo
        draggableItems.forEach((item, i) => {
            // Adjust width of the element as itemWidth
            item.style.width = `${itemWidth}px`

            // Data element
            const dataElement = this.dragElementsData[i]
            const elementID = dataElement.id
            
            // Punto 0,0
            let x = (this.draggableZoneBoundingRect.x - this.contentBoundingRect.x) + marginInterior
            let y = (this.draggableZoneBoundingRect.y - this.contentBoundingRect.y) + rowMargin
            
            // Posición según fila y columna
            x += col * (itemWidth + marginInterior)
            y += row * rowWidth

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

            item.touchstart = function(e) {
                console.log("touchstart")
            }

            item.addEventListener('touchstart', function(e){

                var x = e.touches[0].clientX;
                var y = e.touches[0].clientY;
                console.log(x, y)
                self.setMousePosition(x, y)

                self.onMouseDownItem(item, i)
            }, false);

        })


        document.addEventListener('touchmove', function(e){
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
            self.setMousePosition(x, y)
        }, false)

        //console.log(itemWidth)
        // Elementos de dropeo
        droppableItems.forEach((item, i) => {
            // Adjust width of the element as itemWidth
            item.style.width = `${itemWidth}px`
        })

        // Para que el cambio del width surja efecto en los getBoundingClientRect de los drop zone
        setTimeout(() => {
            droppableItems.forEach((item, i) => {
                // Adjust width of the element as itemWidth
                item.style.width = `${itemWidth}px`
                const dropBoundingRect = item.getBoundingClientRect()
                const id = item.id.split("-")[1]
                const x = dropBoundingRect.x - self.contentBoundingRect.x
                const y = dropBoundingRect.y - self.contentBoundingRect.y
    
                const dropData = this.findDropElement(id)
                dropData.pos = {x,y}
            })
        }, 100)

        // Track de la posición del mouse
        document.addEventListener('mousemove', (event) => {
            
            self.mouseX = event.clientX
            self.mouseY = event.clientY
        });

        // Empezamos el loop
        this.startLoop()
    }

    onMouseDownItem(item, i){
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

        console.log(this.mouseX, this.mouseY)

        // NOTA: Esto no siempre será initialPos, porque igual estamos en la parte de drop!!!!
        this.draggingElementOriginalPos = {
            x: dataElement.currentPos.x,
            y: dataElement.currentPos.y
        }

        // Lo quitamos de la lista (está en nuestra mano!)
        this.itemsDragged = this.itemsDragged.filter(item => item != elementID)

        // Quitamos los mensajes que pudiera haber
        this.draggableCorrectElement.style.display = "none"
        this.draggableIncorrectElement.style.display = "none"
        this.showDraggableZone()

        // Incrementaoms el z-index del drageable
        this.draggingElement.style.zIndex = 999
    }

    setMousePosition(x, y){
        this.mouseX = x
        this.mouseY = y
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

           
            const dragID = this.dragElementsData[this.draggingElementPos].id
            if(nearestDrop != null){
                // Está bien puesto o mal puesto?
                
                const dropID = this.dropElementsData[nearestDrop].id
                
                // Ocupamos el lugar en el elemento que le toque del drop
                this.dropElementsData[nearestDrop].droppedID = dragID
                
                if(dragID == dropID){
                    // Add class "correct" to draggingElement
                    this.draggingElement.classList.add("correct")     
                    this.draggingElement.classList.remove("incorrect")     

                }else{
                    this.draggingElement.classList.add("incorrect")   
                    this.draggingElement.classList.remove("correct")     
                }

                this.itemsDragged.push(dragID)
            }else{
                this.draggingElement.classList.remove("incorrect")     
                this.draggingElement.classList.remove("correct")    
                
                this.itemsDragged = this.itemsDragged.filter(item => item != dragID)
            }
            
            if(this.itemsDragged.length == 4){
                // Bien o mal?
                this.hideDraggableZone()
                
                const correctOrder = this.isOrderCorrect()

                if(correctOrder){
                    this.draggableCorrectElement.style.display = "block"
                }else{
                    this.draggableIncorrectElement.style.display = "block"
                }
            }
        }
        
        this.isDragging = false
        this.draggingElement = undefined
        this.draggingElementData = undefined
    }

    hideDraggableZone(){
        // Add "draggable-zone-hidden" to this.draggableCorrectElement
        this.draggableZone.classList.add("draggable-zone-hidden")
    }

    showDraggableZone(){
        // Remove "draggable-zone-hidden" to this.draggableCorrectElement
        this.draggableZone.classList.remove("draggable-zone-hidden")
    }

    isOrderCorrect(){
        //Find if fields id and dropppedID from dropElementsData array are the same using reduce function
        const correct = this.dropElementsData.reduce((acc, drop) => {
            return acc && drop.id == drop.droppedID
        }, true)
        
        return correct
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