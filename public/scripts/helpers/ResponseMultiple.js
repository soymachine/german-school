class ResponseMultiple {
    constructor(step, maxResponses){
        this.step = step
        this.maxResponses = maxResponses
        
        // Data
        this.buttons = {}

        this.currentButtonsSelected = []

        // Scope
        const that = this

        // Lista de botones de selección
        document.querySelectorAll(`.btn-multsel-step-${step}-option`).forEach(button => {
            const id = Number(button.getAttribute("id").split("-")[4])
            const anchor = button.querySelector("a")
            
            that.buttons[id] = {
                anchor: anchor,
                div: button
            }

            button.onclick = function(e){
                that.onClickSelection(id)
            }
        })
    }

    onClickSelection(id){

        // Está marcada?
        if(this.currentButtonsSelected.indexOf(id) == -1){
            // No está marcada
            
            // Hay espacio para marcarla?
            if(this.currentButtonsSelected.length < this.maxResponses){
                // Sí, la podemos togglear
                this.buttons[id].anchor.classList.add("btn-step-option-selected");
                this.currentButtonsSelected.push(id)
            }

            console.log(this.currentButtonsSelected)
        }else{
            // Está marcada, la desmarcamos
            this.buttons[id].anchor.classList.remove("btn-step-option-selected");
            // La quitamos del array
            this.currentButtonsSelected = this.currentButtonsSelected.filter(currentID => currentID !=id)

            console.log(this.currentButtonsSelected)
        }

    }
}

export default ResponseMultiple