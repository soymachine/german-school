import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import ResponseUnique from '../helpers/ResponseUnique.js'
import Settings from '../helpers/Settings.js'
import Steps from '../helpers/Steps.js'
import AvatarCopier from './avatar/AvatarCopier.js'
import AvatarMovement from './avatar/AvatarMovement.js'



class ContentSocialMedia extends Content {
    constructor(){
        super(Steps.SOCIAL_MEDIA)

        //console.log("Enterpreneur")
        
        // Scope
        const self = this
        this.isMoving = true;
        this.isScoreShown = false
        this.isRetweetClicked = false
        this.isRetweetEnabled = false
        this.isLinkeEnabled = false
        this.yOffset = 20
        this.xOffset = 5
        this.duration = 250
        this.waitTime = 500
        this.durationStream = 1000//1000
        this.$holder
        this.buttonsData = []
        this.currentImage = 1;
        this.socialMediaStream = document.querySelector(".social-media-stream");
        this.socialMedias = document.querySelectorAll(".social-media");
        this.retweetButton = document.getElementById("social-media-button-1");

        this.retwetImage = document.getElementById("retweet-button");
        this.retwetCompletedImage = document.getElementById("retweet-button-completed");
        this.likeImage = document.getElementById("like-button");
        this.likeCompletedImage = document.getElementById("like-button-completed");

        this.likeButton = document.getElementById("social-media-button-2");
        this.socialMediaMarginBottom = 10;
        this.linksEnabled = [false, false]
       
        // Las posibles respuestas, solo podemos marcar una
        this.reponseUnique = new ResponseUnique(this.contentID)

        this.addEvent(this.retweetButton, Content.ON_RELEASE, (event)=>{
            self.onClickRetwet()
        })

        this.addEvent(this.likeButton, Content.ON_RELEASE, (event)=>{
            self.onClickLike()
        })

        document.querySelectorAll(`.social-media-link`).forEach(link => {
            const id = link.getAttribute("id").split("-")[3]
            console.log("id " + id)
            this.addEvent(link, Content.ON_RELEASE, (event)=>{
                self.onClickLink(id)
            })  
        })

        document.querySelectorAll(`.close-button`).forEach(closeButton => {
            const id = closeButton.getAttribute("id").split("-")[2]
            console.log("close id " + id)
            this.addEvent(closeButton, Content.ON_RELEASE, (event)=>{
                self.onClickClose(id)
            })  
        })
    }

    startLoop(){
        const self = this
        let start, prev
        const speed = 2;
        let currentX = 0;
        const busBackgroundHolder = document.querySelector(`.bus-background`)
        console.log("busBackgroundHolder " + busBackgroundHolder)

        function frame(timeStamp) {
            
            if (start === undefined) {
                start = 0
                prev = timeStamp
            }

            const elapsed = timeStamp - prev
            prev = timeStamp

            let nextX = currentX - speed;

            if(nextX < -self.w){
                nextX = 0
            }

            currentX = nextX
            // Move busBackgroundHolder to nextX using transform translateX
            busBackgroundHolder.style.transform = `translateX(${nextX}px)`
    
            if (self.isMoving) {
                window.requestAnimationFrame(frame);
            }
        }
    
        window.requestAnimationFrame(frame);
    }

    changeRetweet(){
        this.retwetImage.style.display = "none"
        this.retwetCompletedImage.style.display = "inline"
    }
    changeLike(){
        this.likeImage.style.display = "none"
        this.likeCompletedImage.style.display = "inline"
    }

    onClickLike(){
        if(!this.isLikeEnabled){
           return
        }

        this.changeLike();
        const self = this
        setTimeout(()=>{
            self.gotoNextStep()
        }, this.waitTime) 
    }
    unblur(id){
        setTimeout(()=>{
            console.log("unblur")
            const el = document.getElementById(id)
            // remove social-media-blur class
            el.classList.remove("social-media-blur")
            // add social-media-unblur class
            el.classList.add("social-media-unblur")
        }, this.waitTime) 
        
    }
    onClickRetwet(){
        if(this.isRetweetClicked || !this.isRetweetEnabled){
            return
        }
        const self = this
        this.isRetweetClicked = true
        this.changeRetweet();
        
        const y5 = this.y4 - this.getHeightAt(4);
        const y6 = y5 - this.getHeightAt(5);
        const y7 = y6 - this.getHeightAt(6);
        const y8 = y7 - this.getHeightAt(7);

        this.unblur("social-media-image-6")

        anime({
            targets: `.social-media-stream`,
            translateY: y5,
            duration: this.durationStream,
            easing:'easeInOutQuad',
            delay:this.waitTime,
            complete: function(anim) {
                moveSecond();
            }
        });

        const moveSecond = () => {
            anime({
                targets: `.social-media-stream`,
                translateY: y6,
                duration: this.durationStream,
                easing:'easeInOutQuad',
                delay:this.waitTime,
                complete: function(anim) {
                    moveThird();
                },
                begin: function(anim) {
                    self.unblur("social-media-image-7")
                }
            });
        }

        const moveThird = () => {
            anime({
                targets: `.social-media-stream`,
                translateY: y7,
                duration: this.durationStream,
                easing:'easeInOutQuad',
                delay:this.waitTime,
                complete: function(anim) {
                    moveFourth();
                },
                begin: function(anim) {
                    self.unblur("social-media-image-8")
                }
            });
        }
        
        const moveFourth = () => {
            anime({
                targets: `.social-media-stream`,
                translateY: y8,
                duration: this.durationStream,
                easing:'easeInOutQuad',
                delay:this.waitTime,
                complete: function(anim) {
                    // Directamente activamos el like
                    self.onClickClose(2)
                },
                begin: function(anim) {
                    self.unblur("social-media-image-sarah")
                }
            });
        }
    }

    setupAvatar(){
        this.avatarCopier = new AvatarCopier(this.contentID)
        this.avatarMovement = new AvatarMovement({
            id: `#my-avatar-${this.contentID}`,
            eyesID:"#my-avatar-eyes-image",
            eyebrows:this.avatarCopier.eyebrows,
            mouth:this.avatarCopier.mouth,
            nose:this.avatarCopier.nose,
            eyes:this.avatarCopier.eyes,
            glasses:this.avatarCopier.glasses,
            beard:this.avatarCopier.beard,
            moustache:this.avatarCopier.moustache,
            avatarImgRect: document.getElementById(`my-avatar-${this.contentID}`).getBoundingClientRect(),
            contentID:this.contentID,
        })
        this.avatarMovement.updateAvatarSize(150)
    }

    preactivateContent(){
        /* AVATAR RELATED */
        // Posicionamos al avatar
        this.setupAvatar()
        this.avatarCopier.update()
        this.avatarMovement.activate()

        const foregroundImg = document.querySelector(`.bus-foreground img`)
        
        const foregroundImgRect = foregroundImg.getBoundingClientRect();
        const height = foregroundImgRect.height
        
        // Cambiar el alto de las imagenes de background
        this.w = 0;
        const self = this;
        document.querySelectorAll(`.bus-background img`).forEach(backgroundImage => {
            backgroundImage.style.height = `${height}px`
            self.w = backgroundImage.getBoundingClientRect().width;    
        })

        this.startLoop();
    }

    activateContent(){
        this.avatarMovement.updateAvatarImgRect()
        this.startMovement();
    }

    getHeightAt(at){
        const socialMediaRect = this.socialMedias[at].getBoundingClientRect()
        return socialMediaRect.height + this.socialMediaMarginBottom
    }

    startMovement(){
        // Movemos hasta el primer retweet
        const y1 = - this.getHeightAt(0);
        const y2 = y1 - this.getHeightAt(1);
        const y3 = y2 - this.getHeightAt(2);
        this.y4 = y3 - this.getHeightAt(3);
        const self = this

        this.unblur("social-media-image-1")

        anime({
            targets: `.social-media-stream`,
            translateY: y1,
            duration: this.durationStream,
            easing:'easeInOutQuad',
            delay:this.waitTime,
            complete: function(anim) {
                moveSecond();
            },
            begin: function(anim) {
                self.unblur("social-media-image-2")
            }
        });

        const moveSecond = () => {
            anime({
                targets: `.social-media-stream`,
                translateY: y2,
                duration: this.durationStream,
                easing:'easeInOutQuad',
                delay:this.waitTime,
                complete: function(anim) {
                    moveThird();
                },
                begin: function(anim) {
                    self.unblur("social-media-image-3")
                }
            });
        }

        const moveThird = () => {
            anime({
                targets: `.social-media-stream`,
                translateY: y3,
                duration: this.durationStream,
                easing:'easeInOutQuad',
                delay:this.waitTime,
                complete: function(anim) {
                    moveFourth();
                },
                begin: function(anim) {
                    self.unblur("social-media-image-4")
                }
            });
        }
        
        const moveFourth = () => {
            anime({
                targets: `.social-media-stream`,
                translateY: this.y4,
                duration: this.durationStream,
                easing:'easeInOutQuad',
                delay:this.waitTime,
                complete: function(anim) {
                    self.onClickClose(1)
                },
                begin: function(anim) {
                    self.unblur("social-media-image-rainforest")
                }
            });
        }
    }

    onpenLink(id){
        console.log("onpenLink " + id)
        const socialMediaPopup = document.getElementById("sm-popup-" + id)
        socialMediaPopup.style.pointerEvents = "all";
        anime({
            targets: "#sm-popup-" + id,
            opacity: 1,
            duration: this.durationStream,
            easing:'easeInOutQuad',
            complete: function(anim) {
               
            },
            
        });
    }

    onClickLink(id){
        const num = Number(id)
        const pos = num - 1
        // console.log("on click link is enabled " + this.linksEnabled[pos] + " pos: " + pos)

        if(this.linksEnabled[pos]){
            this.onpenLink(num)
        }
    }
    onClickClose(id){
        const num = Number(id)
        console.log("num " + num);
        if(id == 1){
            this.isRetweetEnabled = true;
            anime({
                targets: "#retweet-button",
                opacity: 1,
                duration: this.durationStream,
                easing:'easeInOutQuad'
            });
            
        }else{
            this.isLikeEnabled = true;
            console.log("Entramos aqui")
            anime({
                targets: "#like-button",
                opacity: 1,
                duration: this.durationStream,
                easing:'easeInOutQuad'
            });
        }
        
    }

    deactivateContent(){
        this.avatarMovement.deactivate()
    }
}

export default ContentSocialMedia