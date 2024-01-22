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
        this.yOffset = 20
        this.xOffset = 5
        this.duration = 250
        this.durationStream = 1000
        this.$holder
        this.buttonsData = []
        this.currentImage = 1;
        this.socialMediaStream = document.querySelector(".social-media-stream");
        
        // El botón de NEXT
        this.$nextButton = document.querySelector(`#next-button-${this.contentID}`)
        

        this.$nextButton.onmousedown = function(e) { //asign a function
            self.onClickNext()
        }
        this.$nextButton.addEventListener('touchend', function(event){
            event.preventDefault();
            self.onClickNext()
        }, false);

        // this.disableNextButton()

        // Las posibles respuestas, solo podemos marcar una
        this.reponseUnique = new ResponseUnique(this.contentID)


        /* AVATAR RELATED */
        // Posicionamos al avatar
        setTimeout(()=>{
            self.setupAvatar()
        }, 100)        
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

    startMovement(){
        // Movemos 3 imagenes sucesivamente
        const y1 = -151;
        const y2 = -151 - 114;
        const y3 = -151 - 114 - 195;
        const y4 = -151 - 114 - 195 - 114;
        const waitTime = 500;

        anime({
            targets: `.social-media-stream`,
            translateY: y1,
            duration: this.durationStream,
            easing:'easeInOutQuad',
            complete: function(anim) {
                moveSecond();
            }
        });

        const moveSecond = () => {
            anime({
                targets: `.social-media-stream`,
                translateY: y2,
                duration: this.durationStream,
                easing:'easeInOutQuad',
                delay:waitTime,
                complete: function(anim) {
                    moveThird();
                }
            });
        }

        const moveThird = () => {
            anime({
                targets: `.social-media-stream`,
                translateY: y3,
                duration: this.durationStream,
                easing:'easeInOutQuad',
                delay:waitTime,
                complete: function(anim) {
                    //moveFourth();
                }
            });
        }
        
        const moveFourth = () => {
            anime({
                targets: `.social-media-stream`,
                translateY: y4,
                duration: this.durationStream,
                easing:'easeInOutQuad',
                delay:waitTime,
                complete: function(anim) {
                    
                }
            });
        }

        
    }

    deactivateContent(){
        this.avatarMovement.deactivate()
    }

    onClickNext(){
        // Vamos a la siguiente sección
        this.gotoNextStep()
    }
    
}

export default ContentSocialMedia