import ResponseUnique from '../helpers/ResponseUnique.js'
import Content from './Content.js'

class Content2 extends Content {
    constructor(){
        super(1)
        
        this.responseUnique = new ResponseUnique(1)
    }


    deactivateContent(){
    }
}

export default Content2