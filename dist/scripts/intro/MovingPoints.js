class MovingPoints  {
    constructor() {
        console.log("MovingPOints contructor")
        this.points = []
        this.totalPoints = 25
        this.rootRect = document.getElementById("root").getBoundingClientRect() 
        this.isActive = true;


        const perc = this.rootRect.width  / 448;
        console.log("perc", perc)
        this.xCenter = this.rootRect.width * 0.4629;
        this.yCenter = 310 * perc;//this.rootRect.width  * 0.3875;
        const minRadius = this.xCenter * .55;
        const maxRadius = this.xCenter * .80;
        const minSpeed = .1;
        const maxSpeed = .20;
        const minSize = 2;
        const maxSize = 8;
        const minBlur = 1.5;
        const maxBlur = 3.5;

        for (let i = 0; i < this.totalPoints; i++) {
            const element = document.getElementById(`point-${i+1}`)
            // random between minRadius and maxRadius
            const radius = Math.random() * (maxRadius - minRadius) + minRadius;
            // random between minSpeed and maxSpeed
            const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
            // random angle between 0 and 360
            const angle = Math.random() * 360;
             
            // random between minSize and maxSize
            const size = Math.random() * (maxSize - minSize) + minSize;

            // random between minBlur and maxBlur
            const blur = Math.random() * (maxBlur - minBlur) + minBlur;

            // direction 1 or -1
            const direction = Math.random() > 0.5 ? 1 : -1;


            element.style.width = `${size}px`
            element.style.height = `${size}px`
            element.style.filter = "blur(" + blur + "px)";

            this.points.push({
                element: element,
                radius: radius,
                speed: speed,
                angle: angle,
                size: size,
                direction : direction
                
            })
        }

        this.startLoop();
    }

    startLoop() {
        const self = this
        function frame(timestamp) {
            self.loop()

            if(self.isActive){
                window.requestAnimationFrame(frame);
            }
        }
        window.requestAnimationFrame(frame);
    }

    loop() {
        for (let i = 0; i < this.totalPoints; i++) {
            const point = this.points[i];
            const element = point.element;
            const radius = point.radius;
            const speed = point.speed;
            const direction = point.direction;
            let angle = point.angle;

            const newAngle = angle + (speed * direction);
            const angleInRadians = (newAngle * Math.PI) / 180;
            //console.log("newAngle", newAngle + " speed " + speed)            
            const x = this.xCenter + (radius * Math.cos(angleInRadians));
            const y = this.yCenter + (radius * Math.sin(angleInRadians));

            this.points[i].angle = newAngle

            element.style.left = `${x}px`
            element.style.top = `${y}px`
        }
    }

}

export default MovingPoints;
