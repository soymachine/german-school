import {eventSystem, Events} from '../helpers/EventSystem.js'
import Response from '../questionaire/Response.js'
import Settings from '../helpers/Settings.js' 

class QuestionaireController{
    constructor(){
        // De dónde llegan los datos? De una llamada al evento que se encargue de ello
        eventSystem.subscribe(Events.ON_CONTENT_SHOWN, (content)=>{ this.onContentShown(content)})
        eventSystem.subscribe(Events.ON_RESPONSE_UPDATE, (responseObj)=>{ this.onResponseUpdate(responseObj)})


        // Tener en cuenta que el 0 de "response-0" es el step, no el numero de la pregunta!
        // habrá que dejar espacios vacios? "response-3" por ejemplo ahora es el step del viaje a Manaus
        this.responses = {
            "response-0": new Response(Settings.MULTIPLE_RESPONSE, null, [0, 1, 2]),
            "response-1": new Response(Settings.SINGLE_RESPONSE, null, [1,3,5,6,7,9]),
            "response-2": new Response(Settings.SINGLE_RESPONSE, null, 1),
            "response-3": new Response(Settings.MULTIPLE_RESPONSE, null, [0, 1, 2]),
            "response-4": new Response(Settings.SINGLE_RESPONSE, null, 1),
            "response-5": new Response(Settings.SINGLE_RESPONSE, null, 1),
            "response-6": new Response(Settings.SINGLE_RESPONSE, null, 1),
            "response-7": new Response(Settings.SINGLE_RESPONSE, null, 1),
            "response-8": new Response(Settings.SINGLE_RESPONSE, null, 1),
            "response-9": new Response(Settings.SINGLE_RESPONSE, null, 1),
            "response-10": new Response(Settings.SINGLE_RESPONSE, null, 1),
            "response-11": new Response(Settings.SINGLE_RESPONSE, null, 1),
            "response-12": new Response(Settings.SINGLE_RESPONSE, null, 1),
            "response-13": new Response(Settings.SINGLE_RESPONSE, null, 1),
            "response-14": new Response(Settings.SINGLE_RESPONSE, null, 1),
            "response-15": new Response(Settings.SINGLE_RESPONSE, null, 1),
            "response-16": new Response(Settings.SINGLE_RESPONSE, null, 1),
            "response-17": new Response(Settings.SINGLE_RESPONSE, null, 1),
            "response-18": new Response(Settings.SINGLE_RESPONSE, null, 1),
            "response-19": new Response(Settings.SINGLE_RESPONSE, null, 1),
            "response-20": new Response(Settings.SINGLE_RESPONSE, null, 1),
            "response-21": new Response(Settings.SINGLE_RESPONSE, null, 1),
            "response-22": new Response(Settings.SINGLE_RESPONSE, null, 1),
            "response-23": new Response(Settings.SINGLE_RESPONSE, null, 1),
            "response-24": new Response(Settings.SINGLE_RESPONSE, null, 1),
            "response-25": new Response(Settings.SINGLE_RESPONSE, null, 1),
            "response-26": new Response(Settings.SINGLE_RESPONSE, null, 1),
            "response-27": new Response(Settings.SINGLE_RESPONSE, null, 1),
            "response-28": new Response(Settings.SINGLE_RESPONSE, null, 1),
            "response-29": new Response(Settings.SINGLE_RESPONSE, null, 1),
            "response-30": new Response(Settings.SINGLE_RESPONSE, null, 1),
        }

        // TODO gestión de la logica de resultado por aqui
    }

    onContentShown(content){
        
    }

    onResponseUpdate({responseID, response}){
        const responseObj = this.responses[`response-${responseID}`]
        responseObj.response = response
    }
    
}

export default QuestionaireController