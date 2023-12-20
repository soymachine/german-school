class AvatarSelection {
    constructor() {
        this.hair = 0 
        this.eyes = 0 
        this.skinColor = 0 
        this.hairColor = 0 
        this.bodyColor = 0 
        this.hairStyle = 0 
        this.beard = 0 
        this.glasses = 0 
        this.moustache = 0 
        this.name = "" 
    }

    setName(name){
      this.name = name
    }

    removeExtras(){
        this.beard = 0 
        this.glasses = 0 
        this.moustache = 0 
    }

    removeExtra(extraID){
      switch(extraID){
        case "beard":
          this.beard = 0
          break
        case "glasses":
          this.glasses = 0
          break
        case "moustache":
          this.moustache = 0
          break
      }
    }

    addExtra(extraID){
        switch(extraID){
          case "beard":
            this.beard = 1
            break
          case "glasses":
            this.glasses = 1
            break
          case "moustache":
            this.moustache = 1
            break
        }
    }
  
    
  }
  
const avatarSelection = new AvatarSelection();
  
// Export the singleton instance
export {avatarSelection};