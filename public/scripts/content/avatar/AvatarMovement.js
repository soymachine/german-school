import Content from '../Content.js'
class AvatarMovement {
    constructor(parts)
    {
        this.eyebrows = parts.eyebrows
        this.mouth = parts.mouth
        this.nose = parts.nose
        this.eyes = parts.eyes
        this.contentID = parts.contentID
        this.avatarImgRect = document.querySelector(".avatar-image").getBoundingClientRect()
        this.xDest = 0
        this.yDest = 0
        this.xCurrent = 0
        this.yCurrent = 0
        this.speed = 10

        /* Correcciones */
        this.eyesCorrection = {x: 195, y:131}
        this.noseCorrection = {x: 195, y:151}
        this.mouthCorrection = {x: 180, y:201}
        this.eyebrowsCorrection = {x: 195, y:100}

        /* Parpadeo */
        this.currentParpadeo = 0
        this.maxParpadeo = 3000

        this.radius = {
            "eyes": 15,
            "mouth": 10,
            "nose": 5,
            "eyebrows": 5,
        }
        const self = this

        this.isMoving = true
        // Get the mouse X and Y
        document.getElementById(`step-${this.contentID}`).onmousemove = function(event) { //asign a function
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
        console.log("parpadeo")
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

        const correccionX = 195 // estos números en base a las dimensiones de la imagen!
        const correccionY = 131

        /* EYES */
        this.movePart("eyes", this.eyes, this.eyesCorrection, this.radius["eyes"])

        /* MOUTH */
        this.movePart("mouth", this.mouth, this.mouthCorrection, this.radius["mouth"])

        /* NOSE */
        this.movePart("nose", this.nose, this.noseCorrection, this.radius["nose"])
        
        /* EYEBROWS */
        this.movePart("eyebrows", this.eyebrows, this.eyebrowsCorrection, this.radius["eyebrows"])
    }

    movePart(id, part, correction, radius){
        const angle = this.getAngle(this.avatarImgRect.x + correction.x, this.avatarImgRect.y + correction.y, this.xCurrent, this.yCurrent);
        // console.log(`angle ${angle} for part ${id}`)
        var x = 0 + radius * Math.cos(angle);
        var y = 0 + radius * Math.sin(angle);
        //part.style.left = `${x}px`;
        //part.style.top = `${y}px`;

        part.style.transform = `translateX(${x}px) translateY(${y}px)`
    }

    onMouseMove(event){
        this.xDest = event.clientX
        this.yDest = event.clientY
        // console.log(`angle ${angle}, eyeX ${eyeX}, eyeY ${eyeY}`)
    }

    updateImgRect(){
        this.avatarImgRect = document.querySelector(".avatar-image").getBoundingClientRect()
    }

    getAngle(x1, y1, x2, y2) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        return Math.atan2(dy, dx);
    }
}

export default AvatarMovement