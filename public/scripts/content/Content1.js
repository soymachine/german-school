import ResponseMultiple from '../helpers/ResponseMultiple.js'
import Content from './Content.js'

class Content1 extends Content {
    constructor(){
        super(0)
        
        this.responseMultiple = new ResponseMultiple(0, 4) 
        
    }
}

export default Content1