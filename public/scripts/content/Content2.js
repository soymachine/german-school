import ResponseMultiple from '../helpers/ResponseMultiple.js'
import ResponseUnique from '../helpers/ResponseUnique.js'
import Content from './Content.js'

class Content2 extends Content {
    constructor(){
        super(1)
        
        this.responseMultiple = new ResponseMultiple(1, 4) 
    }


    deactivateContent(){
        console.log("Deactivate content 2")
    }
}

export default Content2