import Content from '../Content.js'
class AvatarMovement {
    constructor(parts)
    {
        this.id = parts.id // #my-avatar-1,-2,... o #avatar-image
        this.eyesID = parts.eyesID
        this.eyebrows = parts.eyebrows
        this.mouth = parts.mouth
        this.nose = parts.nose
        this.eyes = parts.eyes
        this.glasses = parts.glasses
        this.beard = parts.beard
        this.moustache = parts.moustache
        this.peloFront = parts.peloFront
        this.peloBack = parts.peloBack
        this.head = parts.head
        this.contentID = parts.contentID
        this.avatarImgRect = parts.avatarImgRect
        this.xDest = 0
        this.yDest = 0
        this.xCurrent = 0
        this.yCurrent = 0
        this.speed = 10
        this.avatarRatio = 1.3 // alto por cada pixel de ancho
        this.baseWidth = 350
        this.baseHeight = 455

        /* Correcciones en porcentajes */
        this.eyesCorrection = {x: 0.605, y:0.4}
        this.glassesCorrection = {x: 0.605, y:0.4}
        this.noseCorrection = {x: 0.622, y:0.477}
        this.mouthCorrection = {x: 0.605, y:0.549}
        this.eyebrowsCorrection = {x: 0.605, y:0.334}
        this.beardCorrection = {x: 0.605, y:0.549}
        this.moustacheCorrection = {x: 0.605, y:0.549}
        this.peloFrontCorrection = {x: 0.605, y:0.549}
        this.peloBackCorrection = {x: 0.605, y:0.549}
        this.headCorrection = {x: 0.605, y:0.549}

        /* Parpadeo */
        this.currentParpadeo = 0
        this.maxParpadeo = 3000

        this.radius = {
            "eyes": 13,
            "mouth": 5,
            "nose": 5,
            "eyebrows": 5,
            "glasses": 3,
            "beard": 3,
            "moustache": 3,
            "pelo-front": 3,
            "pelo-back": 3,
            "head": 3,
        }

        this.isMoving = true
        // Get the mouse X and Y
        
    }

    activate(isLookingDown = false){
        const self = this
        this.isLookingDown = isLookingDown

        if(isLookingDown){
            this.lookDown();
        }

        this.init()
        
        document.querySelector(`body`).onmousemove = function(event) { //asign a function
            self.onMouseMove(event)
        }
    }

    deactivate(){
        document.querySelector(`body`).onmousemove = null
        this.isMoving = false
    }

    lookDown(){
        const rect = document.getElementById(`root`).getBoundingClientRect()
        this.xDest = rect.x;
        this.yDest = rect.height;
        this.xCurrent = this.xDest;
        this.yCurrent = this.yDest;
        console.log("LOOK DOWN")
    }

    init(){
        const self = this
        let start, prev

        function frame(timeStamp) {
            
            if (start === undefined) {
                start = 0
                prev = timeStamp
            }
            const elapsed = timeStamp - prev
            prev = timeStamp

            self.currentParpadeo += elapsed

            if(self.currentParpadeo >= self.maxParpadeo){
                self.currentParpadeo = 0
                self.doParpadeo()
            }
            
            //console.log(`delta ${elapsed}`)
            
            self.loop()
    
            if (self.isMoving) {
                window.requestAnimationFrame(frame);
            }
        }
    
        window.requestAnimationFrame(frame);
    }

    doParpadeo(){
        // this.eyes to scale 0
        const durationClose = 30
        const durationOpen = 100
        const yPos = -(this.avatarWidth * 0.11)
        anime({
            targets: `${this.id} ${this.eyesID}`,
            translateY: [
                { value: yPos, duration: durationClose },
                { value: 0, duration: durationOpen, delay:100}
              ],
            scaleY:[
                { value: 0, duration: durationClose },
                { value: 1, duration: durationOpen, delay:100}
              ],
            easing:'easeOutQuad'
        })
    }

    loop(){
        const dX = this.xDest - this.xCurrent;
        const dY = this.yDest - this.yCurrent;
        
        this.xCurrent += (dX / this.speed);
        this.yCurrent += (dY / this.speed);

        /* EYES */
        this.movePart("eyes", this.eyes, this.eyesCorrection, this.radius["eyes"], "1")

        /* MOUTH */
        this.movePart("mouth", this.mouth, this.mouthCorrection, this.radius["mouth"], "2")

        /* NOSE */
        this.movePart("nose", this.nose, this.noseCorrection, this.radius["nose"], "3")
        
        /* EYEBROWS */
        this.movePart("eyebrows", this.eyebrows, this.eyebrowsCorrection, this.radius["eyebrows"], "4")

        /* GLASSES */
        this.movePart("glasses", this.glasses, this.glassesCorrection, this.radius["glasses"], "5")

        /* BEARD */
        this.movePart("beard", this.beard, this.beardCorrection, this.radius["beard"], "6")

        /* MOUSTACHE */
        this.movePart("moustache", this.moustache, this.moustacheCorrection, this.radius["moustache"], "7")

        /* PELO - FRONT */
        this.movePart("pelo-front", this.peloFront, this.peloFrontCorrection, this.radius["pelo-front"], "8")

        /* PELO - BACK */
        this.movePart("pelo-back", this.peloBack, this.peloBackCorrection, this.radius["pelo-back"], "9")
        
        /* HEAD */
        this.movePart("head", this.head, this.headCorrection, this.radius["head"], "10")
    }

    movePart(id, part, correction, radius, testID){
        
        if(part == undefined){
            return
        }

        const correctionX = correction.x * this.avatarWidth
        const correctionY = correction.y * this.avatarHeight
        const angle = this.getAngle(this.avatarImgRect.x + correctionX, this.avatarImgRect.y + correctionY, this.xCurrent, this.yCurrent);
        const distance = this.getDistance(this.avatarImgRect.x + correctionX, this.avatarImgRect.y + correctionY, this.xCurrent, this.yCurrent);

        radius = (this.avatarWidth / 350) * radius

        let percentRadius = distance / radius
        // if percentRadius > 1 => percentRadius = 1
        percentRadius = Math.min(percentRadius, 1)

        const alphaRadius = (radius * percentRadius) 
        /*
        // Testing 
        if(id == "eyes"){
            const x = this.avatarImgRect.x + correctionX
            const y = this.avatarImgRect.y + correctionY
            const dist = this.getDistance(x, y, this.xCurrent, this.yCurrent)
            //console.log(`dist ${dist} x ${x} y ${y} this.xCurrent ${this.xCurrent} this.yCurrent ${this.yCurrent}`)
            console.log(alphaRadius)
        }
        //*/
        
        var x = 0 + alphaRadius * Math.cos(angle);
        var y = 0 + alphaRadius * Math.sin(angle);
        

        if(this.isLookingDown){
            const rotation = 16;
            const yOrigin = 50;
            const xOrigin = 70;
            part.style.transformOrigin = `${yOrigin}% ${xOrigin}%`  
            part.style.transform = `translateX(${x}px) translateY(${y}px) rotate(${rotation}deg)` //  
        }else{
            part.style.transform = `translateX(${x}px) translateY(${y}px)` //  rotate(${rotation}deg)
        }
        /*
        const testX = correctionX
        const testY = correctionY
        document.getElementById("avatar-test-" + testID).style.transform = `translateX(${testX}px) translateY(${testY}px)`
        */
    }

    onMouseMove(event){
        if(this.isLookingDown){
            return;
        }
        this.xDest = event.clientX
        this.yDest = event.clientY

        // console.log(`xDest ${this.xDest} yDest ${this.yDest}`)
    }

    updateAvatarSize(size){
        this.avatarWidth = size
        this.avatarHeight = size * this.avatarRatio
        this.avatarImgRect = document.querySelector(this.id).getBoundingClientRect()        
    }

    updateAvatarImgRect(){
        this.avatarImgRect = document.querySelector(this.id).getBoundingClientRect()        
    }

    getAngle(x1, y1, x2, y2) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        return Math.atan2(dy, dx);
    }

    getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    }
}

export default AvatarMovement