import Content from './Content.js'
import GlobalEvents from '../helpers/GlobalEvents.js'

class Content3 extends Content {
    constructor(){
        super(2)
        
        // Par aabrir navegador Chrome sin CORS restrictions
        // server: sql16427.sql16427.dreamhostps.com
        // "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --user-data-dir="C:/Chrome dev session" --disable-web-security
        // Scope
        const that = this

        // sistema de eventos        
        this.events.subscribe(GlobalEvents.ON_DATA_UPDATED, (data)=>{ this.onDataUpdated(data)})

        //  Formulario
        this.$sendButton = document.querySelector("#send-form-btn")
        this.$sendButton.addEventListener("click", () => {
            that.onSubmit()
          });
        
        let loginForm = document.getElementById("formulario");
        
        loginForm.addEventListener("submit", (e) => {
            console.log("submit del form")
            e.preventDefault()
            
            that.onSubmit()
           
        });
    }

    activateContent(){
        console.log("Activate content 3")
    }

    onDataUpdated(data){

    }

    onSubmit(){
        let email = document.getElementById("email-input").value;
        
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
        console.log("Sending data");
      
        const XHR = new XMLHttpRequest();
      
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
        XHR.addEventListener("load", (event) => {
            console.log("form regresa con éxito")
            console.log(event.target.responseText);
        });
      
        // Define what happens in case of an error
        XHR.addEventListener("error", (event) => {
            console.log("Oops! Something went wrong.");
        });
      
        // Set up our request
        XHR.open("POST", "https://www.appnormals.com/german_school/save_user.php");
      
        // Add the required HTTP header for form data POST requests
        XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      
        // Finally, send our data.
        XHR.send(urlEncodedData);
      }
}

export default Content3