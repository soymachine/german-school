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
        this.isScoreShown = false
        this.isRetweetClicked = false
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
       
        // Las posibles respuestas, solo podemos marcar una
        this.reponseUnique = new ResponseUnique(this.contentID)

        this.addEvent(this.retweetButton, Content.ON_RELEASE, (event)=>{
            self.onClickRetwet()
        })

        this.addEvent(this.likeButton, Content.ON_RELEASE, (event)=>{
            self.onClickLike()
        })


        /* AVATAR RELATED */
        // Posicionamos al avatar
        setTimeout(()=>{
            self.setupAvatar()
        }, 100)        
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
        this.changeLike();
        const self = this
        setTimeout(()=>{
            self.gotoNextStep()
        }, 500) 
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
        if(this.isRetweetClicked){
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
        if(this.avatarCopier) this.avatarCopier.update()
        if(this.avatarMovement) this.avatarMovement.activate()
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
                    
                },
                begin: function(anim) {
                    self.unblur("social-media-image-rainforest")
                }
            });
        }
        
    }

    deactivateContent(){
        this.avatarMovement.deactivate()
    }
}

export default ContentSocialMedia