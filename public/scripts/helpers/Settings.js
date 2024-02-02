
import Content from '../content/Content.js'
class Settings {
    constructor(){
        
        const self = this

        this.isPanelOpen = false
        console.log("Settings")
        this.settingsOpenButton = document.getElementById("settings-button")
        this.settingsCloseButton = document.getElementById("close-settings-button")
        this.settingsPanel = document.getElementById("settings-panel")
        console.log("settingsCloseButton")
        console.log(this.settingsCloseButton)

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