import {eventSystem, Events} from '../helpers/EventSystem.js'
import Response from '../questionaire/Response.js'
import Settings from '../helpers/Settings.js' 

class QuestionaireController{
    constructor(){
        // De dónde llegan los datos? De una llamada al evento que se encargue de ello
        eventSystem.subscribe(Events.ON_CONTENT_SHOWN, (content)=>{ this.onContentShown(content)})
        eventSystem.subscribe(Events.ON_RESPONSE_UPDATE, (responseObj)=>{ this.onResponseUpdate(responseObj)})

        this.responses = {
            "response-0": new Response(Settings.MULTIPLE_RESPONSE, 0, [0, 1, 2]),
            "response-1": new Response(Settings.SINGLE_RESPONSE, 0, 1),
            "response-2": new Response(Settings.SINGLE_RESPONSE, 0, 1),
            "response-3": new Response(Settings.MULTIPLE_RESPONSE, 0, [0, 1, 2]),
            "response-4": new Response(Settings.SINGLE_RESPONSE, 0, 1),
            "response-5": new Response(Settings.SINGLE_RESPONSE, 0, 1),
            "response-6": new Response(Settings.SINGLE_RESPONSE, 0, 1),
            "response-7": new Response(Settings.SINGLE_RESPONSE, 0, 1),
            "response-8": new Response(Settings.SINGLE_RESPONSE, 0, 1),
            "response-9": new Response(Settings.SINGLE_RESPONSE, 0, 1),
            "response-10": new Response(Settings.SINGLE_RESPONSE, 0, 1),
            "response-11": new Response(Settings.SINGLE_RESPONSE, 0, 1),
            "response-12": new Response(Settings.SINGLE_RESPONSE, 0, 1),
            "response-13": new Response(Settings.SINGLE_RESPONSE, 0, 1),
            "response-14": new Response(Settings.SINGLE_RESPONSE, 0, 1)
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