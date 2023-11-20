class GlobalEvents {

    constructor() {
        // Para los eventos
        this.events = {};

    }

    // TODO Suscribirse a un evento con una función
    // Ahora: suscribirse con una función
    subscribe(event = "", func) {
        if(this.events[event] == undefined){
            this.events[event] = []
        }

        this.events[event].push(func)
    }
     
    // TODO Desuscribirse a un evento con una función
    // Ahora: desuscribirse con una función
    unsubscribe(event = "", func) {
        if(this.events[event] != undefined){
            this.events[event] = this.events[event].filter((observer) => observer !== func)
        }
    }
     
    // Ahora: notifica siempre a todos los suscritores, no admite distinción del evento
    notify(event = "", data) {
        // Cuidado! No podemos notificar si no hay nadie escuchando este evento
        this.events[event]?.forEach((observer) => observer(data));
    }

    notifyWithDelay(delay, event, data) {
        const that = this
        const timeoutId = setTimeout(function(){
            that.notify(event, data)
            clearTimeout(timeoutId);    
        }, delay);
        
    }

}

GlobalEvents.myInstance = null
GlobalEvents.getInstance = ()=>{
    if(GlobalEvents.myInstance == null){
        GlobalEvents.myInstance = new GlobalEvents()   
    }
    
    return GlobalEvents.myInstance
}

GlobalEvents.ON_PROGRESS_LOADING = "ON_PROGRESS_LOADING"
GlobalEvents.ON_LOADING_COMPLETED = "ON_LOADING_COMPLETED"
GlobalEvents.ON_DATA_UPDATED = "ON_DATA_UPDATED"
GlobalEvents.ON_CONTENT_SHOWN = "ON_CONTENT_SHOWN"
GlobalEvents.ON_CONTENT_HIDE = "ON_CONTENT_HIDE"
GlobalEvents.ON_QUESTIONAIRE_UPDATE = "ON_QUESTIONAIRE_UPDATE"
GlobalEvents.ON_RESPONSE_UPDATE = "ON_RESPONSE_UPDATE"


export default GlobalEvents;