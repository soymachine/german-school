import { avatarSelection } from '../../helpers/AvatarSelection.js'
class AvatarCopier {

    constructor(id) {
        this.id = id
        this.hair = document.querySelector(`#my-avatar-${this.id} #my-avatar-hair-preview`)
        this.hairBack = document.querySelector(`#my-avatar-${this.id} #my-avatar-hair-back-preview`)
        this.head = document.querySelector(`#my-avatar-${this.id} #my-avatar-head-preview`)
        this.eyes = document.querySelector(`#my-avatar-${this.id} #my-avatar-eyes-preview`)
        this.eyebrows = document.querySelector(`#my-avatar-${this.id} #my-avatar-eyebrows-preview`)
        this.mouth = document.querySelector(`#my-avatar-${this.id} #my-avatar-mouth-preview`)
        this.neck = document.querySelector(`#my-avatar-${this.id} #my-avatar-neck-preview`)
        this.nose = document.querySelector(`#my-avatar-${this.id} #my-avatar-nose-preview`)
        this.body = document.querySelector(`#my-avatar-${this.id} #my-avatar-body-preview`)
        this.glasses = document.querySelector(`#my-avatar-${this.id} #my-avatar-glasses-preview`)
        this.beard = document.querySelector(`#my-avatar-${this.id} #my-avatar-beard-preview`)
        this.moustache = document.querySelector(`#my-avatar-${this.id} #my-avatar-moustache-preview`)
        this.name = document.getElementById(`my-avatar-name-${this.id}`)
        this.hairColors = ["black", "blonde", "blue", "brown", "redhair"]
    }

    update(){
        const skinColor = avatarSelection.skinColor + 1
        const hairStyle = avatarSelection.hairStyle + 1
        const hairColor = this.hairColors[avatarSelection.hairColor]
        const bodyColor = avatarSelection.bodyColor + 1

        this.head.src = `./imgs/avatar/parts/skin-${(skinColor)}.svg` 
        this.eyebrows.src = `./imgs/avatar/parts/eyebrows-skin-${(skinColor)}.svg` 
        this.mouth.src = `./imgs/avatar/parts/mouth-skin-${(skinColor)}.svg` 
        this.neck.src = `./imgs/avatar/parts/neck-${(skinColor)}.svg` 
        this.nose.src = `./imgs/avatar/parts/nose-skin-${(skinColor)}.svg` 
        this.hair.src = `./imgs/avatar/parts/hair-style-${(hairStyle)}-${(hairColor)}.svg`
        this.body.src = `./imgs/avatar/parts/body-${(bodyColor)}.svg`

        if(this.name) this.name.innerHTML = avatarSelection.name

        /* El pelo back */
        if(avatarSelection.hairStyle == 0){
            // ocultamos el pelo back
            this.hairBack.style.opacity = 0 
        }else{
            this.hairBack.style.opacity = 1 
            this.hairBack.src = `./imgs/avatar/parts/hair-style-${(hairStyle)}-back-${(hairColor)}.svg`
        }
        
        /* Los extras */
        if(avatarSelection.beard == 0){
            this.beard.style.opacity = 0
        }

        if(avatarSelection.glasses == 0){
            this.glasses.style.opacity = 0
        }

        if(avatarSelection.moustache == 0){
            this.moustache.style.opacity = 0
        }
    }
} 

export default AvatarCopier