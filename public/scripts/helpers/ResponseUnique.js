class ResponseUnique {
    constructor(step){
        this.step = step
        
        // Data
        this.buttons = {}

        this.currentButtonSelected = null

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
        // Remove previous current class
        if(this.currentButtonSelected != null){
            this.buttons[this.currentButtonSelected].anchor.classList.remove("btn-step-option-selected");
        }

        const anchor = this.buttons[id].anchor
        anchor.classList.add("btn-step-option-selected");

        this.currentButtonSelected = id
    }
}

export default ResponseUnique