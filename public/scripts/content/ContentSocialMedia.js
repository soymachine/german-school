import Content from "./Content.js";
import { eventSystem, Events } from "../helpers/EventSystem.js";
import ResponseUnique from "../helpers/ResponseUnique.js";
import Settings from "../helpers/Settings.js";
import Steps from "../helpers/Steps.js";
import AvatarCopier from "./avatar/AvatarCopier.js";
import AvatarMovement from "./avatar/AvatarMovement.js";

class ContentSocialMedia extends Content {
    constructor() {
        super(Steps.SOCIAL_MEDIA);

        //console.log("Enterpreneur")

        // Scope
        const self = this;
        this.isMoving = true;
        this.isScoreShown = false;
        this.isRetweetClicked = false;
        this.isRetweetEnabled = false;
        this.isLinkeEnabled = false;
        this.yOffset = 20;
        this.xOffset = 5;
        this.offset = 10;
        this.offset_2 = 10;
        this.duration = 250;
        this.waitTime = 500;
        this.durationStream = 1000; //1000
        this.$holder;
        this.buttonsData = [];
        this.currentImage = 1;
        this.socialMediaStream = document.querySelector(".social-media-stream");
        this.socialMedias = document.querySelectorAll(".social-media");
        this.retweetButton = document.getElementById("social-media-button-1");
        this.wrapper = document.querySelector(".social-media-stream-wrapper");

        this.retwetImage = document.getElementById("retweet-button");
        this.retwetCompletedImage = document.getElementById("retweet-button-completed");
        this.likeImage = document.getElementById("like-button");
        this.likeCompletedImage = document.getElementById("like-button-completed");

        this.likeButton = document.getElementById("social-media-button-2");
        this.socialMediaMarginBottom = 0; // 10
        this.linksEnabled = [false, false];

        this.avatarCopier = new AvatarCopier(this.contentID);

        // Las posibles respuestas, solo podemos marcar una
        this.reponseUnique = new ResponseUnique(this.contentID);

        this.addEvent(this.retweetButton, Content.ON_RELEASE, (event) => {
            self.onClickRetwet();
        });

        this.addEvent(this.likeButton, Content.ON_RELEASE, (event) => {
            self.onClickLike();
        });

        document.querySelectorAll(`.social-media-link`).forEach((link) => {
            const id = link.getAttribute("id").split("-")[3];
            console.log("id " + id);
            this.addEvent(link, Content.ON_RELEASE, (event) => {
                self.onClickLink(id);
            });
        });

        document.querySelectorAll(`.close-button`).forEach((closeButton) => {
            const id = closeButton.getAttribute("id").split("-")[2];
            console.log("close id " + id);
            this.addEvent(closeButton, Content.ON_RELEASE, (event) => {
                self.onClickClose(id);
            });
        });
    }

    preactivateContent() {
        /* AVATAR RELATED */
        // Posicionamos al avatar
        this.setupAvatar();
        //this.avatarCopier.update()
        //this.avatarMovement.lookDown()
        this.avatarMovement.activate(true);
        // Que mire abajo?

        const foregroundImg = document.querySelector(`.bus-foreground img`);

        const foregroundImgRect = foregroundImg.getBoundingClientRect();
        const height = foregroundImgRect.height;

        // Cambiar el alto de las imagenes de background
        this.w = 0;
        const self = this;
        document.querySelectorAll(`.bus-background img`).forEach((backgroundImage) => {
            backgroundImage.style.height = `${height}px`;
            self.w = backgroundImage.getBoundingClientRect().width;
        });

        this.startLoop();

        const wrapperRect = this.wrapper.getBoundingClientRect();

        const rootRect = document.querySelector("#root").getBoundingClientRect();

        const footerHeight = 35;
        const offset = 10;
        const availHeight = rootRect.height - (wrapperRect.y - rootRect.y) - footerHeight - offset;
        // set height for wrapper
        this.wrapper.style.height = `${availHeight}px`;

        const x = rootRect.width * 0.5 - wrapperRect.width * 0.5;
        this.wrapper.style.left = `${x}px`;

        const speechAvatarBodyPart = document.querySelector("#speech-user-avatar .my-avatar-body-part");
        const avatarRect = speechAvatarBodyPart.getBoundingClientRect();
        const avatarX = rootRect.width * 0.5 - avatarRect.width * 0.5;

        const speechAvatar = document.querySelector("#speech-user-avatar");
        speechAvatar.style.left = `${avatarX}px`;

        const beta = availHeight / rootRect.height;
        const dif = 0.589 - beta;
        if (dif > 0) {
            this.offset_2 = dif * 1500;
            console.log("offset_2 " + this.offset_2 + " dif " + dif);
        }

        this.rotateAvatar();
    }

    rotateAvatar() {
        const elementsIDs = [];
        const rootElement = "#my-avatar-" + this.contentID + " ";
        elementsIDs.push(rootElement + "#my-avatar-hair-back-preview");
        elementsIDs.push(rootElement + "#my-avatar-head-preview");
        elementsIDs.push(rootElement + "#my-avatar-eyebrows-preview");
        elementsIDs.push(rootElement + "#my-avatar-eyes-preview");
        elementsIDs.push(rootElement + "#my-avatar-mouth-preview");
        elementsIDs.push(rootElement + "#my-avatar-nose-preview");
        elementsIDs.push(rootElement + "#my-avatar-glasses-preview");
        elementsIDs.push(rootElement + "#my-avatar-moustache-preview");
        elementsIDs.push(rootElement + "#my-avatar-beard-preview");
        elementsIDs.push(rootElement + "#my-avatar-hair-preview");

        const elementsString = elementsIDs.join(",");

        const rotation = 16;
        const yOrigin = 50;
        const xOrigin = 70;
        document.querySelectorAll(elementsString).forEach((bodyPart) => {
            bodyPart.style.transform += ` rotate(${rotation}deg)`;
            bodyPart.style.transformOrigin = `${yOrigin}% ${xOrigin}%`;
        });
    }

    startLoop() {
        const self = this;
        let start, prev;
        const speed = 2;
        let currentX = 0;
        const busBackgroundHolder = document.querySelector(`.bus-background`);
        console.log("busBackgroundHolder " + busBackgroundHolder);

        function frame(timeStamp) {
            if (start === undefined) {
                start = 0;
                prev = timeStamp;
            }

            const elapsed = timeStamp - prev;
            prev = timeStamp;

            let nextX = currentX - speed;

            if (nextX < -self.w) {
                nextX = 0;
            }

            currentX = nextX;
            // Move busBackgroundHolder to nextX using transform translateX
            busBackgroundHolder.style.transform = `translateX(${nextX}px)`;

            if (self.isMoving) {
                window.requestAnimationFrame(frame);
            }
        }

        window.requestAnimationFrame(frame);
    }

    changeRetweet() {
        this.retwetImage.style.display = "none";
        this.retwetCompletedImage.style.display = "inline";
    }
    changeLike() {
        this.likeImage.style.display = "none";
        this.likeCompletedImage.style.display = "inline";
    }

    onClickLike() {
        if (!this.isLikeEnabled) {
            return;
        }

        eventSystem.publish(Events.ON_SFX_PLAY, "sfx_social_media_like");

        this.changeLike();
        const self = this;
        setTimeout(() => {
            self.gotoNextStep(true);
        }, this.waitTime);
    }
    unblur(id) {
        setTimeout(() => {
            const el = document.getElementById(id);
            // remove social-media-blur class
            el.classList.remove("social-media-blur");
            // add social-media-unblur class
            el.classList.add("social-media-unblur");
        }, this.waitTime);
    }
    onClickRetwet() {
        if (this.isRetweetClicked || !this.isRetweetEnabled) {
            return;
        }
        const self = this;
        this.isRetweetClicked = true;
        this.changeRetweet();

        eventSystem.publish(Events.ON_SFX_PLAY, "sfx_social_media_like");

        const y5 = this.y4 - this.getHeightAt(4);
        const y6 = y5 - this.getHeightAt(5);
        const y7 = y6 - this.getHeightAt(6);
        const y8 = y7 - this.getHeightAt(7) - this.offset_2;

        this.unblur("social-media-image-6");
        this.unblur("social-media-image-7");
        this.unblur("social-media-image-8");

        anime({
            targets: `.social-media-stream`,
            translateY: y8,
            duration: this.durationStream * 2,
            easing: "easeInOutQuad",
            delay: this.waitTime,
            complete: function (anim) {
                // Directamente activamos el like
                self.onClickClose(2);
            },
            begin: function (anim) {
                self.unblur("social-media-image-sarah");
                //eventSystem.publish(Events.ON_SFX_PLAY, "sfx_social_media_swipe")
            },
        });

        const moveSecond = () => {
            anime({
                targets: `.social-media-stream`,
                translateY: y6,
                duration: this.durationStream,
                easing: "easeInOutQuad",
                delay: this.waitTime,
                complete: function (anim) {
                    moveThird();
                },
                begin: function (anim) {
                    self.unblur("social-media-image-7");
                },
            });
        };

        const moveThird = () => {
            anime({
                targets: `.social-media-stream`,
                translateY: y7,
                duration: this.durationStream,
                easing: "easeInOutQuad",
                delay: this.waitTime,
                complete: function (anim) {
                    moveFourth();
                },
                begin: function (anim) {
                    self.unblur("social-media-image-8");
                },
            });
        };

        const moveFourth = () => {
            anime({
                targets: `.social-media-stream`,
                translateY: y8,
                duration: this.durationStream,
                easing: "easeInOutQuad",
                delay: this.waitTime,
                complete: function (anim) {
                    // Directamente activamos el like
                    self.onClickClose(2);
                },
                begin: function (anim) {
                    self.unblur("social-media-image-sarah");
                },
            });
        };
    }

    setupAvatar() {
        //*
        this.avatarMovement = new AvatarMovement({
            id: `#my-avatar-${this.contentID}`,
            eyesID: "#my-avatar-eyes-image",
            eyebrows: this.avatarCopier.eyebrows,
            mouth: this.avatarCopier.mouth,
            nose: this.avatarCopier.nose,
            eyes: this.avatarCopier.eyes,
            glasses: this.avatarCopier.glasses,
            beard: this.avatarCopier.beard,
            moustache: this.avatarCopier.moustache,
            avatarImgRect: document.getElementById(`my-avatar-${this.contentID}`).getBoundingClientRect(),
            contentID: this.contentID,
        });
        this.avatarMovement.updateAvatarSize(150);
        //*/
    }

    activateContent() {
        this.avatarMovement.updateAvatarImgRect();
        this.startMovement();
    }

    getHeightAt(at) {
        const socialMediaRect = this.socialMedias[at].getBoundingClientRect();
        return socialMediaRect.height + this.socialMediaMarginBottom;
    }

    startMovement() {
        // Movemos hasta el primer retweet
        const y1 = -this.getHeightAt(0);
        const y2 = y1 - this.getHeightAt(1);
        const y3 = y2 - this.getHeightAt(2);
        this.y4 = y3 - this.getHeightAt(3) + this.offset;
        const self = this;

        anime({
            targets: `.social-media-stream`,
            translateY: this.y4,
            duration: this.durationStream * 2,
            easing: "easeInOutQuad",
            delay: this.waitTime,
            complete: function (anim) {
                self.onClickClose(1);
                //moveSecond();
            },
            begin: function (anim) {
                self.unblur("social-media-image-2");
                self.unblur("social-media-image-3");
                self.unblur("social-media-image-4");
                self.unblur("social-media-image-rainforest");
                //eventSystem.publish(Events.ON_SFX_PLAY, "sfx_social_media_swipe")
            },
        });
    }

    onpenLink(id) {
        console.log("onpenLink " + id);
        const socialMediaPopup = document.getElementById("sm-popup-" + id);
        socialMediaPopup.style.pointerEvents = "all";
        anime({
            targets: "#sm-popup-" + id,
            opacity: 1,
            duration: this.durationStream,
            easing: "easeInOutQuad",
            complete: function (anim) {},
        });
    }

    onClickLink(id) {
        const num = Number(id);
        const pos = num - 1;
        // console.log("on click link is enabled " + this.linksEnabled[pos] + " pos: " + pos)

        if (this.linksEnabled[pos]) {
            this.onpenLink(num);
        }
    }
    onClickClose(id) {
        const num = Number(id);
        console.log("num " + num);
        if (id == 1) {
            this.isRetweetEnabled = true;
            anime({
                targets: "#retweet-button",
                opacity: 1,
                duration: this.durationStream,
                easing: "easeInOutQuad",
            });
        } else {
            this.isLikeEnabled = true;
            console.log("Entramos aqui");
            anime({
                targets: "#like-button",
                opacity: 1,
                duration: this.durationStream,
                easing: "easeInOutQuad",
            });
        }
    }

    deactivateContent() {
        this.avatarMovement.deactivate();
    }
}

export default ContentSocialMedia;
