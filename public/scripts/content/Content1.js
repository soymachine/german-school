import ResponseUnique from '../helpers/ResponseUnique.js'
import Content from './Content.js'

class Content1 extends Content {
    constructor(){
        super(0)
        
        this.responseUnique = new ResponseUnique(0)
    }
}

export default Content1