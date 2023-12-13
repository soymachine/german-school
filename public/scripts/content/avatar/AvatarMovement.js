import Content from '../Content.js'
class AvatarMovement {
    constructor(parts)
    {
        this.eyebrows = parts.eyebrows
        this.mouth = parts.mouth
        this.nose = parts.nose
        this.eyes = parts.eyes
        this.glasses = parts.glasses
        this.contentID = parts.contentID
        this.avatarImgRect = document.querySelector(".avatar-image").getBoundingClientRect()
        this.xDest = 0
        this.yDest = 0
        this.xCurrent = 0
        this.yCurrent = 0
        this.speed = 10
        this.avatarRatio = 1.3 // alto por cada pixel de ancho

        /* Correcciones en porcentajes */
        this.eyesCorrection = {x: 0.605, y:0.4}
        this.glassesCorrection = {x: 0.605, y:0.4}
        this.noseCorrection = {x: 0.622, y:0.477}
        this.mouthCorrection = {x: 0.605, y:0.549}
        this.eyebrowsCorrection = {x: 0.605, y:0.334}

        /* Parpadeo */
        this.currentParpadeo = 0
        this.maxParpadeo = 3000

        this.radius = {
            "eyes": 13,
            "mouth": 5,
            "nose": 5,
            "eyebrows": 5,
            "glasses": 3,
        }
        const self = this

        this.isMoving = true
        // Get the mouse X and Y
        
        
        document.querySelector(`body`).onmousemove = function(event) { //asign a function
            self.onMouseMove(event)
        }

        this.init()
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
        anime({
            targets: `#avatar-eyes-image`,
            translateY: [
                { value: -50, duration: durationClose },
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
        this.movePart("glasses", this.glasses, this.eyebrowsCorrection, this.radius["glasses"], "5")
    }

    movePart(id, part, correction, radius, testID){
        const correctionX = correction.x * this.avatarWidth
        const correctionY = correction.y * this.avatarHeight
        const angle = this.getAngle(this.avatarImgRect.x + correctionX, this.avatarImgRect.y + correctionY, this.xCurrent, this.yCurrent);
        // console.log(`correction.x  ${correction.x } , correctionY ${correction.y} this.avatarImgRect.width ${this.avatarImgRect.width} this.avatarImgRect.height ${this.avatarImgRect.height}`)
        var x = 0 + radius * Math.cos(angle);
        var y = 0 + radius * Math.sin(angle);

        
        part.style.transform = `translateX(${x}px) translateY(${y}px)`

        /*
        const testX = correctionX
        const testY = correctionY
        document.getElementById("avatar-test-" + testID).style.transform = `translateX(${testX}px) translateY(${testY}px)`
        */
    }

    onMouseMove(event){
        this.xDest = event.clientX
        this.yDest = event.clientY
        // console.log(`angle ${angle}, eyeX ${eyeX}, eyeY ${eyeY}`)
    }

    updateAvatarSize(size){
        this.avatarWidth = size
        this.avatarHeight = size * this.avatarRatio
        this.avatarImgRect = document.querySelector(".avatar-image").getBoundingClientRect()
        console.log(this.avatarImgRect)
    }

    getAngle(x1, y1, x2, y2) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        return Math.atan2(dy, dx);
    }
}

export default AvatarMovement