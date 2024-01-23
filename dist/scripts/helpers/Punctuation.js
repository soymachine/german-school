let punctuation = 0 
class Punctuation {
    constructor() {
        
    }

    addPunctuation(_punctuation){
      _punctuation = Number(_punctuation)
      punctuation += _punctuation
    }

    getPunctuation(){
      return punctuation
    }
  
    
  }
  
const currentPunctuation = new Punctuation();
  
// Export the singleton instance
export {currentPunctuation};