import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'
import Steps from '../helpers/Steps.js'
import { currentPunctuation } from '../helpers/Punctuation.js'
import { avatarSelection } from '../helpers/AvatarSelection.js'

const ACCESS_TOKEN = "1234567890"
class ContentForm extends Content {

    URL_BASE = "https://www.appnormals.com/whu/";

    constructor(){
      super(Steps.FORM)
        
        // Par aabrir navegador Chrome sin CORS restrictions
        // server: sql16427.sql16427.dreamhostps.com
        // "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --user-data-dir="C:/Chrome dev session" --disable-web-security
        // Scope
        const that = this

        // sistema de eventos        
        eventSystem.subscribe(Events.ON_DATA_UPDATED, (data)=>{ this.onDataUpdated(data)})

        this.$form = document.querySelector("#formulario")

        this.$emailInput = document.getElementById("form-email-input")
        this.$nameInput = document.getElementById("form-name-input")
        this.$surnameInput = document.getElementById("form-surname-input")
        this.$phoneInput = document.getElementById("form-phone-input")

        // next-button-link
        this.button = document.getElementById(`next-button-${this.contentID}`)
        this.button.onmousedown = function(event) { //asign a function
            that.onSubmit()
        }

        //  Formulario
        this.$form.addEventListener("submit", (e) => {
            console.log("submit del form")
            e.preventDefault()
            
            that.onSubmit()
           
        });
    }

    activateContent(){
    }

    onDataUpdated(data){

    }

    onSubmit(){
        // Aquí validar el formulario
        console.log("onSubmit")
        let email = this.$emailInput.value;
        let name = this.$nameInput.value;
        let surname = this.$surnameInput.value;
        let phone = this.$phoneInput.value;
        
        if (email.value == "") {
          // throw error
        } else {
          // perform operation with form input
          this.sendData({
            name:name,
            surname:surname,
            email:email,
            score:currentPunctuation.getPunctuation(),
            avatar:avatarSelection.getAvatarID(),
            phone:phone
          })
        }
    }

    sendData(data) {
        console.error("enviando formulario")  
        console.log(data)

        const xhr = new XMLHttpRequest();

        const urlEncodedDataPairs = [];
      
        // Turn the data object into an array of URL-encoded key/value pairs.
        for (const [name, value] of Object.entries(data)) {
          urlEncodedDataPairs.push(
            `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
          );
        }
      
        // Combine the pairs into a single string and replace all %-encoded spaces to
        // the '+' character; matches the behavior of browser form submissions.
        const urlEncodedData = urlEncodedDataPairs.join("&").replace(/%20/g, "+");
      
        // Define what happens on successful data submission
        xhr.addEventListener("load", (event) => {
            console.log("form regresa con éxito")
            console.log(event.target.responseText);
            
            this.$emailInput.value = ""
            this.$form.classList.remove("hide")
        });
      
        // Define what happens in case of an error
        xhr.addEventListener("error", (event) => {
            console.log("Oops! Something went wrong.");
            this.$emailInput.value = ""
            this.$form.classList.remove("hide")
        });
      
        // Set up our request
        xhr.open("POST", `${this.URL_BASE}save_user.php`);
      
        // Add the required HTTP header for form data POST requests
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader('Authorization', 'Bearer ' + ACCESS_TOKEN);
        //xhr.setRequestHeader('Custom-Header', 'custom-value');
      
        // Finally, send our data.
        xhr.send(urlEncodedData);

        // Hide form
        this.$form.classList.add("hide")
      }
}

export default ContentForm