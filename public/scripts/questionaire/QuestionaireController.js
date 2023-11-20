import GlobalEvents from '../helpers/GlobalEvents.js'
import Response from '../questionaire/Response.js'
import Settings from '../helpers/Settings.js' 

class QuestionaireController{
    constructor(){
        // De dónde llegan los datos? De una llamada al evento que se encargue de ello
        this.events = GlobalEvents.getInstance()
        this.events.subscribe(GlobalEvents.ON_CONTENT_SHOWN, (content)=>{ this.onContentShown(content)})
        this.events.subscribe(GlobalEvents.ON_RESPONSE_UPDATE, (responseObj)=>{ this.onResponseUpdate(responseObj)})

        this.responses = {
            "response-0": new Response(Settings.SINGLE_RESPONSE, 0),
            "response-1": new Response(Settings.MULTIPLE_RESPONSE, 0),
            "response-2": new Response(Settings.SINGLE_RESPONSE, 0),
            "response-3": new Response(Settings.SINGLE_RESPONSE, 0),
            "response-4": new Response(Settings.SINGLE_RESPONSE, 0),
            "response-5": new Response(Settings.SINGLE_RESPONSE, 0),
            "response-6": new Response(Settings.SINGLE_RESPONSE, 0),
        }

        // TODO gestión de la logica de resultado por aqui
    }

    onContentShown(content){
        
    }

    onResponseUpdate(responseObj){
        const response = this.responses[`response-${responseObj.responseID}`]
        response.response = responseObj.response
    }
    
}

export default QuestionaireController