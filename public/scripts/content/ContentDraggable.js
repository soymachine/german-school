import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import Steps from '../helpers/Steps.js'
import {currentPunctuation} from '../helpers/Punctuation.js'

class ContentDraggable extends Content {
    constructor(){
        super(Steps.FLOW_DIAGRAM)
        
        // Scope
        const self = this
        this.isCorrectOrder = false
        this.title = document.querySelector(`.title-step-${this.contentID} .why-intro-title`)
        this.resultElement = document.querySelector(`#result-step-${this.contentID}`)
        this.pointsElement = document.querySelector(`#result-step-${this.contentID} .business-result-points`)

        this.initialText = this.title.innerHTML
        this.duration = 500
        // Draggeo
        this.isActive = false
        this.isDragging = false
        this.resultSubmitted = false
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
        this.distanceThreshold = 60
        this.draggerX = 0
        this.draggerY = 0
        this.itemsDragged = []

        // Evento general para el release
        const stepElement = document.getElementById(`step-${this.contentID}`)
        this.addEvent(stepElement, Content.ON_RELEASE, (event)=>{
            self.onMouseUp()
        })
        /*
        document.onmouseup = function(event) { //asign a function
            event.preventDefault();
            console.log("onMouseUP primro")
            self.onMouseUp()
        }

        document.addEventListener('touchend', function(event){
            event.preventDefault();
            self.onMouseUp()
        }, false);
        */

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
        this.draggableCorrectElement = document.querySelector("#draggable-content-correct")
        this.draggableIncorrectElement = document.querySelector("#draggable-content-incorrect")
        this.draggableItems = document.querySelectorAll(".draggable-item")
        this.droppableItems = document.querySelectorAll(".dropzone")
        this.draggableZone = document.querySelector(".draggable-zone")
        this.linesList = document.querySelectorAll(".lines")
        
        // const content = document.querySelector("#content")
        this.content = document.querySelector(`#step-${this.contentID}`)
        this.dropZone = document.querySelector(".dropzone-content")

        /*
        console.log("Draggable Zone Element:")
        console.log(this.draggableZone)
        console.log("Draggable zone bounding rect:")
        console.log(this.draggableZoneBoundingRect)
        
        console.log("content Element:")
        console.log(content)
        console.log("content bounding Rect:")
        console.log(this.contentBoundingRect)
        */

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

        this.onTouchMove = this.onTouchMove.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);


        //console.log(itemWidth)

        // Para que el cambio del width surja efecto en los getBoundingClientRect de los drop zone
        setTimeout(() => {
            this.getBoundingRects()
            this.positionDraggableElements()
        }, 100)

        
    }

    preactivateContent(){
        this.isActive = true
        // Empezamos el loop
        this.startLoop()

        document.addEventListener('touchmove', this.onTouchMove)

        // Track de la posición del mouse
        document.addEventListener('mousemove', this.onMouseMove);
    }

    deactivateContent(){
        this.isActive = false

        document.removeEventListener('touchmove', this.onTouchMove)

        // Track de la posición del mouse
        document.removeEventListener('mousemove', this.onMouseMove);
    }

    onTouchMove(event){
        event.preventDefault();
        this.setMousePosition(event.touches[0].clientX, event.touches[0].clientY)
    }

    onMouseMove(event){
        event.preventDefault();
        this.setMousePosition(event.clientX, event.clientY)
    }

    activateContent(){
        this.getBoundingRects()
        this.positionDropElements()
        this.setupLines()
    }

    positionDropElements(){
        // this.xLeft + marginInterior + this.marginLeft

        // Test
        const test = document.getElementById("draggable-test")

        this.droppableItems.forEach((item, i) => {
            // Adjust width of the element as itemWidth
            item.style.width = `${this.itemWidth}px`
            const dropBoundingRect = item.getBoundingClientRect()
            const id = item.id.split("-")[1]

            //console.log(dropBoundingRect)
            //console.log(this.rootRect.x)
            //console.log(this.marginLeft)
            //console.log(this.xLeft)
            //const x = dropBoundingRect.x - this.rootRect.x
            const x = dropBoundingRect.x - this.rootRect.x + this.xLeft
            const y = dropBoundingRect.y - this.contentBoundingRect.y
            //console.log(x)        
            test.style.left = `${x}px`
            test.style.top = `${y}px`

            const dropData = this.findDropElement(id)
            dropData.pos = {x,y}
            dropData.width = dropBoundingRect.width
            dropData.height = dropBoundingRect.height
        })
    }

  

    getBoundingRects(){
        this.draggableZoneBoundingRect  = this.draggableZone.getBoundingClientRect()
        this.dropZoneBoundingRect  = this.dropZone.getBoundingClientRect()
        this.contentBoundingRect  = this.content.getBoundingClientRect()
        this.rootRect = document.getElementById("root").getBoundingClientRect()
        
        const holder = document.querySelector(".draggable-holder").currentStyle || window.getComputedStyle(document.querySelector(".draggable-holder"))
        this.marginLeft = Number(holder.marginLeft.replace("px", ""))
        this.xLeft = this.rootRect.width * Number(this.contentID)
        /*
        console.log("rootBoundingRect")
        console.log(this.rootRect)
        console.log("contentBoundingRect")
        console.log(this.contentBoundingRect)
        */
    }

    positionDraggableElements(){
        const self = this
        // Reposicionar los elementos
        let col = 0
        let row = 0
        let maxCol = 2

        // Estos valores han de ser dinámicos
        const W = document.querySelector("#root").offsetWidth
        const marginExterior = 45 // 20
        const marginInterior = 15
        const marginEntreItems = 30
        const initialX = 30
        const initialY = 15
        const marginVertical = 10
        const marginVerticalEntreItems = 5
        const rowMargin = 10
        const extraWSpace = 20

        this.itemWidth = (W - (marginExterior * 2) - (marginInterior * 3)) / 2
        this.itemHeight = 44
        const rowWidth = 60

        console.log("this.itemWidth = " + this.itemWidth)
        console.log("this.itemHeight = " + this.itemHeight)

        
        // Elementos de drageo
        this.draggableItems.forEach((item, i) => {
            // Adjust width of the element as itemWidth
            item.style.width = `${this.itemWidth}px`

            // Data element
            const dataElement = this.dragElementsData[i]
            const elementID = dataElement.id
            
            // Punto 0,0
            //console.log("Checking")
            //console.log(`this.draggableZoneBoundingRect.x = ${this.draggableZoneBoundingRect.x} this.rootRect.x = ${this.rootRect.x} this.contentBoundingRect.x = ${this.contentBoundingRect.x}`)
            let x = this.xLeft + initialX + this.marginLeft //this.draggableZoneBoundingRect.x - this.rootRect.x + marginInterior 
            let y = this.draggableZoneBoundingRect.y - this.rootRect.y + initialY 
            
            // Posición según fila y columna
            x += col * (this.itemWidth + marginEntreItems)
            y += row * (this.itemHeight + marginVerticalEntreItems)

            // console.log(x, y)
            
            // Actualizamos las posiciones en la data
            dataElement.initialPos = {x, y}
            dataElement.currentPos = {x, y}

            item.style.left = `${x}px`
            item.style.top = `${y}px`

            console.log("x: " + x + " y: " + y + " para " + elementID)

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
                //console.log(x, y)
                self.setMousePosition(x, y)

                self.onMouseDownItem(item, i)
            }, false);

        })

        // Elementos de dropeo
        this.droppableItems.forEach((item, i) => {
            // Adjust width of the element as itemWidth
            item.style.width = `${this.itemWidth}px`
        })
    }

    onMouseDownItem(item, i){
        if(this.isCorrectOrder){
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

        // Lo quitamos de la lista (está en nuestra mano!)
        this.itemsDragged = this.itemsDragged.filter(item => item != elementID)

        // Quitamos los mensajes que pudiera haber
        this.draggableCorrectElement.style.display = "none"
        this.draggableIncorrectElement.style.display = "none"
        this.showDraggableZone()

        // Incrementaoms el z-index del drageable
        this.draggingElement.style.zIndex = 999

        //console.log("quitamos a dragID:" + elementID + " de la lista")
        this.dropElementsData.forEach(item => {
            if(item.droppedID == elementID){
                item.droppedID = undefined
            }
        })

        this.disableNextButton()
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
        //console.log("onMouseUp")
        // Hemos de calcular dónde hemos soltado el elemento
        // Si lo hemos soltado en una zona de drop, mirar el item de esa zona
        // Si no, lo dejamos en su posición original
        if(this.isDragging){
            const id = this.draggingElementID 

            // Qué drop está más cerca?
            let x;
            let y;
            let nearestDrop = null
            let minDistance = this.distance(this.draggerX, this.draggerY, this.draggingElementData.initialPos.x, this.draggingElementData.initialPos.y)
            this.dropElementsData.forEach((drop, i) => {
                // Calcular la distancia
                const distance = this.distance(this.draggerX, this.draggerY, drop.pos.x, drop.pos.y)
                if(distance < this.distanceThreshold && this.dropElementsData[i].droppedID == undefined){
                    nearestDrop = i
                    // Si el neareast drop está ya ocupado qué pasa?
                    minDistance = distance
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
            //this.draggingElement.style.left = `${x}px`
            //this.draggingElement.style.top = `${y}px`
            console.log(x, y, nearestDrop);

            let duration = minDistance * 5
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

           
            const dragID = this.dragElementsData[this.draggingElementPos].id
            if(nearestDrop != null){
                // Está bien puesto o mal puesto?
                
                const dropID = this.dropElementsData[nearestDrop].id
                
                // Ocupamos el lugar en el elemento que le toque del drop
                this.dropElementsData[nearestDrop].droppedID = dragID
                
                this.draggingElement.classList.add("correct")   

                this.itemsDragged.push(dragID)
            }else{
                this.draggingElement.classList.remove("correct")    
                
                

                //Quitamos el droppedID de donde estuviere
                // Find droppedID from this.dropElementsDat that equals dragID and remove it
                this.dropElementsData.forEach((drop, i) => {
                    if(drop.droppedID == dragID){
                        this.dropElementsData[i].droppedID = undefined
                    }
                })

                this.title.innerHTML = this.initialText
            }
            
            console.log("this.itemsDragged.length "+ this.itemsDragged.length);
            if(this.itemsDragged.length == 4){
                // Bien o mal?
                //this.hideDraggableZone()
                
                this.isCorrectOrder = this.isOrderCorrect()
                //console.log("correctOrder? " + correctOrder)

                this.prepareForResult()
            }
        }
        
        this.isDragging = false
        this.draggingElement = undefined
        this.draggingElementData = undefined
    }

    prepareForResult(){
        this.enableNextButton()
    }

    submitResult(){

        const totalAcertadas = this.totalAcertadas()
        console.log("totalAcertadas: " + totalAcertadas)
        currentPunctuation.addPunctuation(totalAcertadas)

        if(this.isCorrectOrder){

            this.title.innerHTML = "<strong>Well done, thank you!</strong><br>Let’s quickly check them."
            document.querySelector(`#result-step-${this.contentID} .business-result-points`).innerHTML = "+40"
        }else{
            this.title.innerHTML = "<strong>Something is off!</strong><br>"

            if(totalAcertadas == 0){
                document.querySelector(`#result-step-${this.contentID} .business-result-points`).innerHTML = "0"
            }else{
                document.querySelector(`#result-step-${this.contentID} .business-result-points`).innerHTML = "+" + totalAcertadas;
            }
        }

        this.repositionOptions();

        // Enviamos la respuesta
        eventSystem.publish(Events.ON_RESPONSE_UPDATE, {
            responseID:this.contentID,
            response:this.isCorrectOrder
        })

        // Mostramos el resultado
        anime({
            targets: `#result-step-${this.contentID}`,
            opacity: 1,
            duration: this.duration,
            easing:'easeOutQuad'
        })

        const draggableZone = document.querySelector(".draggable-zone");
        draggableZone.classList.add("draggable-zone-hidden");
    }

    repositionOptions(){    
        const delay = 2000;
        this.dropElementsData.forEach((item, i) => {
            // const el = document.getElementById(item.id);
            const droppedID = item.droppedID
            const correctID = item.id
            const pos = item.pos;

            if(droppedID != correctID){
                document.getElementById(droppedID).classList.add("incorrect")

                setInterval(() => {
                    document.getElementById(droppedID).classList.remove("incorrect")
                }, delay)

            }else{
                document.getElementById(droppedID).classList.add("final-correct")
            }
            /*
            el.style.left = `${pos.x}px`
            el.style.top = `${pos.y}px`
            */

            anime({
                targets: `#${correctID}`,
                left: pos.x,
                top: pos.y,
                duration: this.duration,
                easing:'easeOutQuad',
                delay:delay
            })
           
        })
    }


    onCorrectOrder(){
        this.isCorrectOrder = true
        currentPunctuation.addPunctuation(10)
        this.title.innerHTML = "<strong>Well done, thank you!</strong><br>Let’s quickly check them."
        

        // Enviamos la respuesta
        eventSystem.publish(Events.ON_RESPONSE_UPDATE, {
            responseID:this.contentID,
            response:true
        })

        // Mostramos el resultado
        anime({
            targets: `#result-step-${this.contentID}`,
            opacity: 1,
            duration: this.duration,
            easing:'easeOutQuad'
        })

        const draggableZone = document.querySelector(".draggable-zone");
        draggableZone.classList.add("draggable-zone-hidden");

       

        // Quitamos el fondito de las opciones draggables
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

    totalAcertadas(){
        const total = this.dropElementsData.reduce((acc, drop) => {
            if(drop.id == drop.droppedID){
                acc += 10;
            }
            return acc
        }, 0)
        
        return total
    }

    startLoop() {
        const self = this
        function frame(timestamp) {
            self.loop()

            if(self.isActive){
                window.requestAnimationFrame(frame);
            }
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

        if(!this.resultSubmitted){
            this.resultSubmitted = true;
            this.submitResult()
            return
        }
        
        this.gotoNextStep()
        eventSystem.publish(Events.ON_PROGRESS_UPDATE, 6)

    }

    setupLines(){
        {
            // linea 1
            this.line1 = document.querySelector(`#line-1`)
            const dropData1 = this.findDropElement("predictiveanalysis")
            this.line1.style.transform = "rotate(-45deg)"
            const line1Rect = this.line1.getBoundingClientRect()
            const x = dropData1.pos.x + (dropData1.width * .5)
            const y = dropData1.pos.y - (dropData1.height) + (line1Rect.height * .5) - 6
            this.line1.style.left = x + "px"
            this.line1.style.top = y + "px"
        }

        {
            // linea 2
            this.line2 = document.querySelector(`#line-2`)
            const dropData2 = this.findDropElement("predictiveanalysis")
            this.line2.style.transform = "rotate(-135deg)"
            const line2Rect = this.line2.getBoundingClientRect()
            const x = dropData2.pos.x + (dropData2.width * .5) - line2Rect.width - 10
            const y = dropData2.pos.y - (dropData2.height) + (line2Rect.height * .5) - 6
            this.line2.style.left = x + "px"
            this.line2.style.top = y + "px"
        }

        {
            // linea 3
            const line = document.querySelector(`#line-3`)
            const dropData = this.findDropElement("predictiveanalysis")
            line.style.transform = "rotate(90deg)"
            const lineRect = line.getBoundingClientRect()
            const x = dropData.pos.x + (dropData.width * .5) - (lineRect.height * .5)    
            console.log("lineRect.width: " + lineRect.width)
            const y = dropData.pos.y + (dropData.height) + (lineRect.height * .5) - 2
            line.style.left = x + "px"
            line.style.top = y + "px"

            // Wedge-1
            const wedge = document.querySelector(`#wedge-1`)
            const wedgeRect = wedge.getBoundingClientRect()
            wedge.style.transform = "rotate(90deg)"
            wedge.style.left = (x + (lineRect.height * .5) - (wedgeRect.width * .5) + 1) + "px"
            wedge.style.top = (y + (lineRect.height * .5) - (wedgeRect.width * .5 ) - 3) + "px"
        }
    }
}

export default ContentDraggable