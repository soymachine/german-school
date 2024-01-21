let punctuation = 0 
class Punctuation {
    constructor() {
        
    }

    addPunctuation(punctuation){
      punctuation = Number(punctuation)
      punctuation += punctuation
    }

    getPunctuation(){
      return punctuation
    }
  
    
  }
  
const currentPunctuation = new Punctuation();
  
// Export the singleton instance
export {currentPunctuation};