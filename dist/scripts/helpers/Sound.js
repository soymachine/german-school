import {eventSystem, Events} from '../helpers/EventSystem.js'
import Steps from '../helpers/Steps.js'

class Sound {

    backgroundMusic;

    busSongPath = "sound/sfx_amb_bus.mp3"
    planeSongPath = "sound/sfx_plane_flight.mp3"
    rainforestSongPath = "sound/sfx_amb_rainforest.mp3"
    laboratorySongPath = "sound/sfx_amb_laboratory.mp3"

    musics = {}
    currentMusicPath = null;
    isSoundFXOn = true;
    isMusicOn = true;

    constructor(src){
        eventSystem.subscribe(Events.ON_CONTENT_BEGIN_SHOWN, (content)=>{
            this.onContentShown(content)
        })

        eventSystem.subscribe(Events.ON_MUSIC_CHANGED, (isMusicOn)=>{ this.onMusicChanged(isMusicOn) })
        eventSystem.subscribe(Events.ON_SFX_CHANGED, (isSFXOn)=>{ this.onSFXChanged(isSFXOn) })
    }
    onSFXChanged(isSFXOn){
        this.isSoundFXOn = isSFXOn;
    }

    onMusicChanged(isMusicOn){
        this.isMusicOn = isMusicOn;
        if(this.currentMusicPath != undefined){
            this.musics[this.currentMusicPath].mute(!isMusicOn)
        }
    }

    onContentShown(content){
        console.log("Sound, content "+ content);

        if(content == Steps.SOCIAL_MEDIA)
        {
            this.stopPreviousMusic()
            this.playSonng(this.busSongPath)
        }else if(content == Steps.ACT_II_CINEMATICS || content == Steps.ACT_2_PREQUESTION)
        {
            this.stopPreviousMusic()
            this.playSonng(this.rainforestSongPath)
        }else if(content == Steps.ACT_III_CINEMATICS || content == Steps.ACT_III_CINEMATICS_ALEX_AFTER_IA)
        {
            this.stopPreviousMusic()
            this.playSonng(this.laboratorySongPath)
        }else if(content == Steps.TRAVEL_TO_MANAUS){
            this.stopPreviousMusic()
            this.playSoundFX(this.planeSongPath)
        }else{
            this.stopPreviousMusic()
            this.currentMusicPath = null;
        }
    }

    playSoundFX(songPath){
        console.log("playSonng " + songPath);
        this.musics[songPath] = new Howl({
            src: [songPath],
            autoplay: true,
            loop: false,
            volume: 1
        });
    }

    playSonng(songPath){
        console.log("playSonng " + songPath);
        this.musics[songPath] = new Howl({
            src: [songPath],
            autoplay: true,
            loop: true,
            volume: 1
        });

        this.musics[songPath].fade(0, 1, 2000).onfade = ()=>{
            console.log("fading in finished")
        };

        if(!this.isMusicOn){
            this.musics[songPath].mute(true)
        }
        
        this.currentMusicPath = songPath;
    }

    stopPreviousMusic(){
        console.log("stopPreviousMusic")
        if(this.currentMusicPath != undefined){
            const t = this;
            const fadeOutTime = 1000
            const currentMusicToStop = this.currentMusicPath
            this.musics[currentMusicToStop].fade(1, 0, fadeOutTime);
            setTimeout(function() {
                console.log("a parar a " + currentMusicToStop)
                t.musics[currentMusicToStop].stop();
            }, fadeOutTime);
        }
    }  
}

export default Sound