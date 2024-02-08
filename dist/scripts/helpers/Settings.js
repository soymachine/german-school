
import Content from '../content/Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
class Settings {
    constructor(){
        
        const self = this

        this.isPanelOpen = false
        this.isMusicOn = true;
        this.isSFXOn = true;
        console.log("Settings")
        this.settingsOpenButton = document.getElementById("settings-button")
        this.settingsCloseButton = document.getElementById("close-settings-button")
        this.restartButton = document.getElementById("button-reload")
        this.settingsPanel = document.getElementById("settings-panel")
        this.musicCheckbox = document.getElementById("music-checkbox")
        this.soundFXCheckbox = document.getElementById("sound-checkbox")
        
        this.musicCheckbox.addEventListener('change', function(event){
            self.onClickMusicCheckbox()
        })

        this.soundFXCheckbox.addEventListener('change', function(event){
            self.onClickSoundFXCheckbox()
        })

        this.settingsCloseButton.onmousedown = function(e) { //asign a function
            self.onClickCloseSettingsButton()
        }
        this.settingsCloseButton.addEventListener('touchend', function(event){
            event.preventDefault();
            self.onClickCloseSettingsButton()
        }, false);

        this.settingsOpenButton.onmousedown = function(e) { //asign a function
            self.onClickOpenSettingsButton()
        }
        this.settingsOpenButton.addEventListener('touchend', function(event){
            event.preventDefault();
            self.onClickOpenSettingsButton()
        }, false);



        this.restartButton.onmousedown = function(e) { //asign a function
            self.onClickResetButton()
        }
        this.restartButton.addEventListener('touchend', function(event){
            event.preventDefault();
            self.onClickResetButton()
        }, false);
        
    }

    onClickMusicCheckbox(){
        this.isMusicOn = this.musicCheckbox.checked
        eventSystem.publish(Events.ON_MUSIC_CHANGED, this.isMusicOn)
    }

    onClickSoundFXCheckbox(){
        this.isSFXOn = this.soundFXCheckbox.checked

        eventSystem.publish(Events.ON_SFX_CHANGED, this.isSFXOn)
    }

    onClickResetButton(){
        // Reload current window
        window.location.reload()
    }

    onClickOpenSettingsButton(){
        this.isPanelOpen = true;
        // remove class settings-hide from settingsPanel
        this.settingsPanel.classList.remove("settings-hide")
    }

    onClickCloseSettingsButton(){
        this.isPanelOpen = false;
        console.log("onClickCloseSettingsButton")
        // remove class settings-hide from settingsPanel
        this.settingsPanel.classList.add("settings-hide")
    }
}

Settings.duration = 1000
Settings.margin = 10
Settings.ease = "easeInOutQuart"
Settings.SINGLE_RESPONSE = "SINGLE_RESPONSE"
Settings.MULTIPLE_RESPONSE = "MULTIPLE_RESPONSE"


export default Settings;