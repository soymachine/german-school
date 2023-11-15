import ResponseMultiple from '../helpers/ResponseMultiple.js'
import ResponseUnique from '../helpers/ResponseUnique.js'
import Content from './Content.js'

class Content2 extends Content {
    constructor(){
        super()
        
        this.resoponseMultiple = new ResponseMultiple(1, 4) 
    }
}

export default Content2