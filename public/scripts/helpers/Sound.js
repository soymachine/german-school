import { eventSystem, Events } from "../helpers/EventSystem.js";
import Steps from "../helpers/Steps.js";

class Sound {
    backgroundMusic;

    busSongPath = "sound/sfx_amb_bus.mp3";
    planeSongPath = "sound/sfx_plane_flight.mp3";
    rainforestSongPath = "sound/sfx_amb_rainforest.mp3";
    laboratorySongPath = "sound/sfx_amb_laboratory.mp3";
    backgruondMusicPath = "sound/whu_gameplay.mp3";
    questionsMusicPath = "sound/clock_lp.mp3";
    effect_1_Path = "sound/sfx_UI_buttons_01.mp3";
    effect_2_Path = "sound/sfx_UI_buttons_02.mp3";
    effect_3_Path = "sound/sfx_UI_buttons_03.mp3";
    effect_4_Path = "sound/sfx_UI_buttons_04.mp3";
    effect_5_Path = "sound/sfx_UI_buttons_05.mp3";

    musics = {};
    loops = {};
    currentMusicPath = null;
    currentLoopPath = null;
    isSoundFXOn = true;
    isMusicOn = true;
    currentMusicVolume = 1;
    fadeOutVolume = 0.1;
    fadeInVolume = 1;

    constructor(src) {
        eventSystem.subscribe(Events.ON_CONTENT_BEGIN_SHOWN, (content) => {
            this.onContentShown(content);
        });

        eventSystem.subscribe(Events.ON_MUSIC_CHANGED, (isMusicOn) => {
            this.onMusicChanged(isMusicOn);
        });
        eventSystem.subscribe(Events.ON_SFX_CHANGED, (isSFXOn) => {
            this.onSFXChanged(isSFXOn);
        });
        eventSystem.subscribe(Events.ON_SFX_PLAY, (id) => {
            this.onSFXPlay(id);
        });
    }

    onSFXPlay(id) {
        if (this.isSoundFXOn) {
            console.log("playSoundFX " + id);
            this.playSoundFX("sound/" + id + ".mp3");
        }
    }

    onSFXChanged(isSFXOn) {
        this.isSoundFXOn = isSFXOn;
        // si hay algún loop, mutearlo!
        if (this.currentLoopPath != undefined) {
            this.loops[this.currentLoopPath].mute(!isSFXOn);
        }
    }

    onMusicChanged(isMusicOn) {
        this.isMusicOn = isMusicOn;
        if (this.currentMusicPath != undefined) {
            this.musics[this.currentMusicPath].mute(!isMusicOn);
        }
    }

    onContentShown(content) {
        console.log("WTF Sound, content " + content);

        switch (content) {
            case Steps.INTRO_MESSAGE:
            case Steps.AVATAR:
            case Steps.ACT_I_CINEMATICS:
            case Steps.SARAH_APPROVES:
            case Steps.ACT_III_CINEMATICS:
            case Steps.INTERVIEW:
            case Steps.ACT_IV_CINEMATICS:
            case Steps.ACT_IV_CINEMATICS_AFTER_9:
            case Steps.SARAH_DIALOGUE_1:
            case Steps.SARAH_DIALOGUE_2:
            case Steps.CONGRATS:
            case Steps.POINTS_EXPLANATION:
            case Steps.CALL_TO_ACTION:
            case Steps.FORM:
                this.stopPreviousLoop();
                this.playSong(this.backgruondMusicPath);
                this.changeMusicVolume(this.fadeInVolume);
                break;
            case Steps.SOCIAL_MEDIA:
                //this.stopPreviousMusic(this.busSongPath)
                this.changeMusicVolume(this.fadeOutVolume);
                this.playLoop(this.busSongPath);
                break;
            case Steps.TRAVEL_TO_MANAUS:
                this.stopPreviousLoop();
                this.changeMusicVolume(this.fadeOutVolume);
                //this.playSoundFX(this.planeSongPath)
                break;
            case Steps.ACT_II_CINEMATICS:
            case Steps.ACT_2_PREQUESTION:
                this.stopPreviousLoop();
                this.changeMusicVolume(this.fadeOutVolume);
                this.playLoop(this.rainforestSongPath);
                break;
            case Steps.WHY_ENTERPRENEUR:
            case Steps.BUSINESS:
            case Steps.FINANCIAL_METRICS:
            case Steps.VALUES:
            case Steps.PATAGONIA:
            case Steps.FLOW_DIAGRAM:
            case Steps.ELEVATOR_PITCH:
            case Steps.SARAH_QUESTION_9:
            case Steps.SARAH_QUESTION_10:
            case Steps.STARTUPS:
                this.stopPreviousLoop(this.questionsMusicPath);
                //this.stopPreviousMusic(this.questionsMusicPath)
                this.playLoop(this.questionsMusicPath);
                this.changeMusicVolume(this.fadeOutVolume);
                break;
            default:
                this.stopPreviousLoop(this.backgruondMusicPath);
                this.playSong(this.backgruondMusicPath);
                this.changeMusicVolume(this.fadeInVolume);
        }

        /*
        if(content == Steps.SOCIAL_MEDIA)
        {
            
        }else if(content == Steps.ACT_II_CINEMATICS || content == Steps.ACT_2_PREQUESTION)
        {
            this.stopPreviousMusic()
            this.playSonng(this.rainforestSongPath)
        }else if(content == Steps.TRAVEL_TO_MANAUS){
            this.stopPreviousMusic()
            this.playSoundFX(this.planeSongPath)
        }else{
            this.stopPreviousMusic()
            this.currentMusicPath = null;
        }
        */
    }

    changeMusicVolume(newVolume) {
        console.log("Cambio de volumen de " + this.currentMusicVolume + " a " + newVolume);
        if (this.musics[this.currentMusicPath] != undefined) {
            this.musics[this.currentMusicPath].fade(this.currentMusicVolume, newVolume, 2000);
            this.currentMusicVolume = newVolume;
        }
    }

    playSoundFX(soundPath) {
        //  console.log("playSonng " + soundPath);
        this.musics[soundPath] = new Howl({
            src: [soundPath],
            autoplay: true,
            loop: false,
            volume: 1,
        });
    }

    playSong(songPath) {
        console.log("playSonng " + songPath);
        if (songPath == this.currentMusicPath) {
            return;
        }

        this.currentMusicVolume = this.fadeInVolume;

        this.musics[songPath] = new Howl({
            src: [songPath],
            autoplay: true,
            loop: true,
            volume: this.currentMusicVolume,
        });

        this.musics[songPath].fade(0, 1, 2000).onfade = () => {
            console.log("fading in finished");
        };

        if (!this.isMusicOn) {
            this.musics[songPath].mute(true);
        }

        this.currentMusicPath = songPath;
    }

    playLoop(loopPath) {
        console.log("playLoop " + loopPath);
        if (loopPath == this.currentLoopPath) {
            return;
        }

        this.loops[loopPath] = new Howl({
            src: [loopPath],
            autoplay: true,
            loop: true,
            volume: 1,
        });

        this.loops[loopPath].fade(0, 1, 2000).onfade = () => {
            console.log("fading in finished");
        };

        if (!this.isSoundFXOn) {
            this.loops[loopPath].mute(true);
        }

        this.currentLoopPath = loopPath;
    }

    stopPreviousLoop(newLoop = undefined) {
        if (this.currentLoopPath != undefined) {
            if (newLoop == this.currentLoopPath) {
                console.log("Algo va mal, no se puede parar el mismo loop");
                return;
            }

            const t = this;
            const fadeOutTime = 1000;
            const currentLoopToStop = this.currentLoopPath;
            this.loops[currentLoopToStop].fade(1, 0, fadeOutTime);
            setTimeout(function () {
                console.log("a parar a " + currentLoopToStop);
                t.loops[currentLoopToStop].stop();
            }, fadeOutTime);
        }
    }
}

export default Sound;
