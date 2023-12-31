import Content from './Content.js'
import {eventSystem, Events} from '../helpers/EventSystem.js'

const ACCESS_TOKEN = "1234567890"
class Content3 extends Content {
    constructor(){
        super(2)
        
        // Par aabrir navegador Chrome sin CORS restrictions
        // server: sql16427.sql16427.dreamhostps.com
        // "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --user-data-dir="C:/Chrome dev session" --disable-web-security
        // Scope
        const that = this

        // sistema de eventos        
        eventSystem.subscribe(Events.ON_DATA_UPDATED, (data)=>{ this.onDataUpdated(data)})

        this.$form = document.querySelector("#formulario")

        this.$emailInput = document.getElementById("email-input")

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
        let email = this.$emailInput.value;
        
        if (email.value == "") {
          // throw error
        } else {
          // perform operation with form input
          this.sendData({
            name:"Dani",
            email:email,
            score:90,
            avatar:"2-1-1-2",
          })
        }
    }

    sendData(data) {
        console.error("enviando formulario")  

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
        xhr.open("POST", "https://www.appnormals.com/german_school/save_user.php");
      
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

export default Content3