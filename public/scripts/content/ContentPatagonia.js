import Content from "./Content.js";
import { eventSystem, Events } from "../helpers/EventSystem.js";
import Steps from "../helpers/Steps.js";
import { currentPunctuation } from "../helpers/Punctuation.js";

class ContentPatagonia extends Content {
    constructor() {
        super(Steps.PATAGONIA);

        // Scope
        const self = this;

        // Draggeo
        this.isActive = false;
        this.isDragging = false;
        this.isDraggingEnabled = true;
        this.draggingElement = undefined;
        this.draggingElementPos = undefined;
        this.draggingElementData = undefined;
        this.mouseX = undefined;
        this.mouseY = undefined;
        this.mouseOriginalPos = {
            x: undefined,
            y: undefined,
        };
        this.draggingElementOriginalPos = {
            x: undefined,
            y: undefined,
        };
        this.distanceThreshold = 80;
        this.founderImageHeight = 140;
        this.draggerX = 0;
        this.draggerY = 0;
        this.itemsDragged = [];
        this.itemWidth = 77;
        this.itemHeight = 77;
        this.duration = 500;

        this.dashedLines = document.getElementById("patagonia-dashed-line");
        console.log(this.dashedLines);
        this.parpadeoTime = 0;
        this.parpadeoShown = true;
        this.maxParpadeoTime = 6;

        // Evento general para el release

        /*
        document.onmouseup = function() { //asign a function
            self.onMouseUp()
        }

        document.addEventListener('touchend', function(event){
            event.preventDefault();
            self.onMouseUp()
        }, false);
        */

        const stepElement = document.getElementById(`step-${this.contentID}`);
        this.addEvent(stepElement, Content.ON_RELEASE, (event) => {
            self.onMouseUp();
        });

        // El botón de NEXT
        this.$nextButton = document.querySelector(`#next-button-${this.contentID}`);
        this.$nextButton.onmousedown = function (e) {
            //asign a function
            self.onClickNext();
        };
        this.$nextButton.addEventListener(
            "touchend",
            function (event) {
                event.preventDefault();
                self.onClickNext();
            },
            false
        );
        this.disableNextButton();

        // Zonas de Drag y de Drop
        this.content = document.querySelector(`#step-${this.contentID}`);
        this.dropIndicator = document.querySelector(`#patagonia-drop-indicator`);

        // Test images
        //this.testImage = document.querySelector(`#test-image`)
        //this.testImage2 = document.querySelector(`#test-image2`)

        // Images de correct / incorrect
        this.correctImage = document.querySelector(`#image-correct`);
        this.incorrectImage = document.querySelector(`#image-incorrect`);

        this.founderImage = document.querySelector(`#founder-image`);

        // Textos
        this.firstSentence = document.querySelector(`#patagonia-first-sentence`);
        this.secondSentence = document.querySelector(`#patagonia-second-sentence`);

        this.draggableZone = document.querySelector(".draggable-zone-patagonia");
        this.draggableCorrectElement = document.querySelector("#draggable-content-correct");
        this.draggableIncorrectElement = document.querySelector("#draggable-content-incorrect");
        this.draggableItems = document.querySelectorAll(".logo-anchor");
        this.dropZone = document.querySelector(".founder-dropzone");

        // Estructura de datos de los elementos
        this.dragElementsData = [
            {
                id: "google",
                initialPos: { x: 0, y: 0 },
                correctPos: { x: 0, y: 0 },
                currentPos: { x: 0, y: 0 },
            },
            {
                id: "snapchat",
                initialPos: { x: 0, y: 0 },
                correctPos: { x: 0, y: 0 },
                currentPos: { x: 0, y: 0 },
            },
            {
                id: "patagonia",
                initialPos: { x: 0, y: 0 },
                correctPos: { x: 0, y: 0 },
                currentPos: { x: 0, y: 0 },
            },
            {
                id: "twitter",
                initialPos: { x: 0, y: 0 },
                correctPos: { x: 0, y: 0 },
                currentPos: { x: 0, y: 0 },
            },
        ];

        this.onTouchMove = this.onTouchMove.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);

        // Para que el cambio del width surja efecto en los getBoundingClientRect de los drop zone
        setTimeout(() => {
            this.getBoundingRects();
            this.positionDraggableElements();
        }, 100);

        // Empezamos el loop
        //this.startLoop()
    }

    preactivateContent() {
        this.isActive = true;
        // Empezamos el loop
        this.startLoop();
        document.addEventListener("touchmove", this.onTouchMove);

        // Track de la posición del mouse
        document.addEventListener("mousemove", this.onMouseMove);
    }

    deactivateContent() {
        this.isActive = false;
        document.removeEventListener("touchmove", this.onTouchMove);

        // Track de la posición del mouse
        document.removeEventListener("mousemove", this.onMouseMove);
    }

    onTouchMove(event) {
        event.preventDefault();
        this.setMousePosition(event.touches[0].clientX, event.touches[0].clientY);
        this.updateDistance();
        this.updateDropIndicator();
    }

    onMouseMove(event) {
        event.preventDefault();
        this.setMousePosition(event.clientX, event.clientY);
        this.updateDistance();
        this.updateDropIndicator();
    }

    updateTestImage() {
        // console.log(`updateTestImage: ${this.draggerX} , ${this.draggerY}`)
    }

    updateDistance() {
        const xImage = this.draggerX + this.itemWidth / 2;
        const yImage = this.draggerY + this.itemHeight / 2;
        this.distance = this.getDistance(xImage, yImage, this.dropZoneCenterX, this.dropZoneCenterY);

        /*
        this.testImage.style.left = `${xImage}px`
        this.testImage.style.top = `${yImage}px`

        this.testImage2.style.left = `${this.dropZoneCenterX}px`
        this.testImage2.style.top = `${this.dropZoneCenterY}px`
        */
    }

    updateDropIndicator() {
        if (this.isDraggingEnabled) {
            if (this.distance < this.distanceThreshold) {
                this.dropIndicator.style.opacity = 1;
            } else {
                this.dropIndicator.style.opacity = 0;
            }
        }
    }

    activateContent() {
        this.getBoundingRects();
        this.positionDraggableElements();
    }

    getBoundingRects() {
        this.draggableZoneBoundingRect = this.draggableZone.getBoundingClientRect();
        this.dropZoneBoundingRect = this.dropZone.getBoundingClientRect();
        this.contentBoundingRect = this.content.getBoundingClientRect();
        this.founderImageRect = this.founderImage.getBoundingClientRect();

        this.dropZoneCenterX = this.dropZoneBoundingRect.width / 2;
        this.dropZoneCenterY = this.dropZoneBoundingRect.height / 2;

        //this.dropZoneCenterX -= this.contentBoundingRect.x
        //this.dropZoneCenterY -= this.contentBoundingRect.y
    }

    positionDraggableElements() {
        const self = this;
        // Reposicionar los elementos
        let col = 0;
        let row = 0;
        let maxCol = 4;
        const marginInterior = 5;
        const marginVertical = 10;

        // Estos valores han de ser dinámicos
        const W = document.querySelector(`#step-${this.contentID}`).offsetWidth;
        const allItemsWidth = 4 * this.itemWidth + 3 * marginInterior;
        const xStart = (W - allItemsWidth) * 0.5;

        // Elementos de drageo
        this.draggableItems.forEach((item, i) => {
            // Adjust width of the element as itemWidth
            item.style.width = `${this.itemWidth}px`;

            // Data element
            const dataElement = this.dragElementsData[i];
            const elementID = dataElement.id;

            // Punto 0,0
            let x = xStart; // this.draggableZoneBoundingRect.x
            let y = this.founderImageHeight + marginVertical; // this.draggableZoneBoundingRect.y

            // Posición según fila y columna
            x += i * (this.itemWidth + marginInterior);

            // Actualizamos las posiciones en la data
            dataElement.initialPos = { x, y };
            dataElement.currentPos = { x, y };

            item.style.left = `${x}px`;
            item.style.top = `${y}px`;

            // Incremento de posiciones
            col += 1;
            if (col >= maxCol) {
                col = 0;
                row += 1;
            }

            item.onmousedown = function (e) {
                //asign a function
                self.onMouseDownItem(item, i);
            };

            item.addEventListener(
                "touchstart",
                function (event) {
                    event.preventDefault();

                    var x = event.touches[0].clientX;
                    var y = event.touches[0].clientY;
                    self.setMousePosition(x, y);

                    self.onMouseDownItem(item, i);
                },
                false
            );
        });
    }

    onMouseDownItem(item, i) {
        if (!this.isDraggingEnabled) {
            return;
        }
        const dataElement = this.dragElementsData[i];
        const elementID = dataElement.id;

        this.draggingElementPos = i;
        this.isDragging = true;
        this.draggingElement = item;
        this.draggingElementData = dataElement;
        this.mouseOriginalPos = {
            x: this.mouseX,
            y: this.mouseY,
        };

        // NOTA: Esto no siempre será initialPos, porque igual estamos en la parte de drop!!!!
        this.draggingElementOriginalPos = {
            x: dataElement.currentPos.x,
            y: dataElement.currentPos.y,
        };

        // Incrementaoms el z-index del drageable
        this.draggingElement.style.zIndex = 999;

        this.disableNextButton();
    }

    setMousePosition(x, y) {
        this.mouseX = x;
        this.mouseY = y;
    }

    onMouseUp() {
        // Hemos de calcular dónde hemos soltado el elemento
        // Si lo hemos soltado en una zona de drop, mirar el item de esa zona
        // Si no, lo dejamos en su posición original
        if (this.isDragging) {
            const id = this.draggingElementID;
            let x;
            let y;
            // A qué distancia está del centro de la imagen?
            const xImage = this.draggerX + this.itemWidth / 2;
            const yImage = this.draggerY + this.itemHeight / 2;

            // Hemos hecho clic?
            const distanceFromOrigin = this.getDistance(this.mouseX, this.mouseY, this.mouseOriginalPos.x, this.mouseOriginalPos.y);
            if (distanceFromOrigin < 1) {
                // Hemos tapeado en el elemento, por lo que es como si lo hubieramos drageado a puesto
                this.distance = this.distanceThreshold - 1;
            }

            //const distance = this.getDistance(xImage, yImage, this.dropZoneCenterX, this.dropZoneCenterY)
            if (this.distance < this.distanceThreshold) {
                // Calcular esto mejor
                const xOffset = -8;
                const yOffset = 0;
                x = this.dropZoneCenterX - this.founderImageRect.width * 0.5 - this.itemWidth + xOffset;
                y = this.dropZoneCenterY - this.itemHeight * 0.5; // + (this.founderImageRect.height * .5) - this.itemHeight + yOffset

                this.processResponse();
            } else {
                // Calcular aquí se va a la pos inicial o a uno de los drops
                x = this.draggingElementData.initialPos.x;
                y = this.draggingElementData.initialPos.y;
            }

            let duration = this.distance * 20;
            duration > 500 ? (duration = 500) : duration;

            console.log(`element oto move: #${this.draggingElement.id}`);
            anime({
                targets: `#${this.draggingElement.id}`,
                left: x,
                top: y,
                duration: duration,
                easing: "easeOutQuad",
            });

            // Actualizamos la posición actual
            const dataElement = this.dragElementsData[this.draggingElementPos];
            dataElement.currentPos = { x, y };

            // Ponemos el z-index del drageable a su estado original
            this.draggingElement.style.zIndex = 1;
        }

        this.isDragging = false;
        this.draggingElement = undefined;
        this.draggingElementData = undefined;
    }

    processResponse() {
        this.enableNextButton();
        this.isDraggingEnabled = false;
        eventSystem.publish(Events.ON_STOP_TICK_TACK_LOOP);

        this.draggableItems.forEach((item, i) => {
            // get attribute id from item
            const itemID = item.getAttribute("id");
            const position = itemID.split("-")[1];

            if (position == this.draggingElementPos) {
            } else {
                anime({
                    targets: `#${itemID}`,
                    scale: 0,
                    duration: this.duration,
                    easing: "easeOutQuad",
                });
            }
        });

        // Marker de correcto / incorrecto
        let points = "0";
        let imageFinal = this.incorrectImage;
        let imageName = "image-incorrect";
        let textFinal = "<strong>You missed that one!</strong><br>Yvon Chouinard is the<br>founder of Patagonia.";
        if (this.draggingElementPos == 2) {
            imageFinal = this.correctImage;
            imageName = "image-correct";
            points = "+10";
            currentPunctuation.addPunctuation(10);
            textFinal = "<strong>You’re right!</strong><br>Yvon Chouinard is the<br>founder of Patagonia.";
            //this.firstSentence.innerHTML = "<strong>That's correct!</strong>"
        } else {
            //this.firstSentence.innerHTML = "<strong>That's incorrect!</strong>"
        }

        //this.secondSentence.innerHTML = "<strong>Yvon Chouinard</strong> founded this American outdoor clothing company in 1973."
        const xOffset = 8;
        const yOffset = 30;
        let x;
        let y;

        x = this.dropZoneCenterX + this.founderImageRect.width * 0.5 + xOffset;
        y = this.dropZoneCenterY - this.correctImage.getBoundingClientRect().height * 0.5;

        imageFinal.style.left = `${x}px`;
        imageFinal.style.top = `${y}px`;

        anime({
            targets: `#${imageName}, #image-patagonia, #result-step-${this.contentID}`,
            opacity: 1,
            duration: this.duration,
            easing: "easeOutQuad",
        });

        anime({
            targets: `#patagonia-drop-indicator, #patagonia-dashed-line, .founder-explanation-text`,
            opacity: 0,
            duration: this.duration,
            easing: "easeOutQuad",
        });

        document.querySelector(`#result-step-${this.contentID} .business-result-points`).innerHTML = points;
        document.querySelector(`.title-step-${this.contentID} .why-intro-title`).innerHTML = textFinal;
    }

    startLoop() {
        const self = this;
        function frame(timestamp) {
            self.loop();
            window.requestAnimationFrame(frame);
        }
        window.requestAnimationFrame(frame);
    }

    loop() {
        if (this.isDragging) {
            // Partimos de la posición inicial del elemento
            let x = this.draggingElementOriginalPos.x;
            let y = this.draggingElementOriginalPos.y;

            // Le agregamos la pos del mouse
            const diffMouseX = this.mouseX - this.mouseOriginalPos.x;
            const diffMouseY = this.mouseY - this.mouseOriginalPos.y;
            x += diffMouseX;
            y += diffMouseY;

            this.draggerX = x;
            this.draggerY = y;

            this.draggingElement.style.left = `${x}px`;
            this.draggingElement.style.top = `${y}px`;

            // parpadear
            this.parpadeoTime += 1;
            if (this.parpadeoTime > this.maxParpadeoTime) {
                this.dashedLines.style.opacity = this.parpadeoShown ? 1 : 0;
                this.parpadeoTime = 0;
                this.parpadeoShown = !this.parpadeoShown;
            }
        } else {
            // Dejamos de parpadear
            this.dashedLines.style.opacity = 1;
            this.parpadeoTime = 0;
        }
    }

    distance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    onClickNext() {
        if (!this.isNextEnabled) {
            return;
        }

        this.gotoNextStep();
        eventSystem.publish(Events.ON_PROGRESS_UPDATE, 5);
    }
}

export default ContentPatagonia;
