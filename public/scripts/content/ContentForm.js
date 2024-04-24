import Content from "./Content.js";
import { eventSystem, Events } from "../helpers/EventSystem.js";
import Steps from "../helpers/Steps.js";
import { currentPunctuation } from "../helpers/Punctuation.js";
import { avatarSelection } from "../helpers/AvatarSelection.js";

const ACCESS_TOKEN = "1234567890";
class ContentForm extends Content {
    URL_BASE = "";

    constructor() {
        super(Steps.FORM);

        // Par aabrir navegador Chrome sin CORS restrictions
        // server: sql16427.sql16427.dreamhostps.com
        // "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --user-data-dir="C:/Chrome dev session" --disable-web-security
        // Scope
        const that = this;

        // sistema de eventos
        eventSystem.subscribe(Events.ON_DATA_UPDATED, (data) => {
            this.onDataUpdated(data);
        });

        this.$form = document.querySelector("#formulario");

        this.$emailInput = document.getElementById("form-email-input");
        this.$nameInput = document.getElementById("form-name-input");
        this.$surnameInput = document.getElementById("form-surname-input");
        this.$acceptance = document.getElementById("acceptance");
        this.$close = document.getElementById("close-message");
        this.$message = document.getElementById("message-wrapper-div");
        this.$messageContent = document.getElementById("message-content");
        this.$buttonHolder = document.querySelector(".sending-area .button-holder");
        this.$infoArea = document.querySelector(".info-area");
        this.$formulario = document.getElementById("formulario");
        this.$sending = document.querySelector(".form-sending");
        this.$sucess = document.querySelector(".form-sucess");
        this.$resendButtonHolder = document.querySelector(".resend-button-holder");
        this.$sendingLabel = document.querySelector(".sending-label");
        this.$waitLabel = document.querySelector(".wait-label");
        this.$formatErrorLabel = document.querySelector(".format-error-label");
        this.$incorrectFormImage = document.getElementById("incorrect-form");

        this.$emailInput.onchange =
            this.$nameInput.onchange =
            this.$surnameInput.onchange =
            this.$acceptance.onchange =
                function (event) {
                    //asign a function
                    that.onChangeInput();
                };

        // next-button-link
        this.button = document.getElementById(`next-button-${this.contentID}`);
        this.button.onmousedown = function (event) {
            //asign a function
            that.onSubmit();
        };

        // resend button after error
        this.resendButton = document.getElementById(`next-resend-button-${this.contentID}`);
        this.$resendButtonHolder.style.display = "none";
        this.resendButton.onmousedown = function (event) {
            //asign a function
            that.onSubmit();
        };

        this.$close.onmousedown = function (event) {
            //asign a function
            that.onClickClose();
        };

        //  Formulario
        this.$form.addEventListener("submit", (e) => {
            console.log("submit del form");
            e.preventDefault();
            that.onSubmit();
        });

        this.rootRect = document.getElementById("root").getBoundingClientRect();
        this.$close.style.left = this.rootRect.width * 0.5 - 40 + "px";

        $("#title-select").on("changed.bs.select", function (e, clickedIndex, isSelected, previousValue) {
            //$("#title-select").val();
        });
    }

    removeErrorsFromFields() {
        this.$emailInput.classList.remove("field-format-error");
        this.$nameInput.classList.remove("field-format-error");
        this.$surnameInput.classList.remove("field-format-error");
    }

    onChangeInput() {
        this.removeErrorsFromFields();

        let email = this.$emailInput.value;
        let name = this.$nameInput.value;
        let surname = this.$surnameInput.value;
        let titleSelect = $("#title-select").val();
        let countrySelect = $("#country-select").val();
        let programSelect = $("#program-select").val();
        const accepted = this.$acceptance.checked;

        console.log("onChangeInput", email, name, surname, titleSelect, countrySelect, programSelect, accepted);

        // Check si todo está lleno y aceptado
        if (name != "" && surname != "" && email != "" && accepted) {
            // Todo lleno
            // Check for format errors first
            let passChecks = true;
            const isValidEmail = this.checkValidEmail(email);
            if (!isValidEmail) {
                this.$emailInput.classList.add("field-format-error");
                passChecks = false;
            }

            if (passChecks) {
                this.$buttonHolder.style.display = "block";
                this.$infoArea.style.display = "none";

                // Quitar el mensaje de mal formateado
                this.$formatErrorLabel.style.opacity = 0;
            } else {
                this.$buttonHolder.style.display = "none";
                this.$infoArea.style.display = "block";

                // Mostrar el mensaje de mal formateado
                this.$formatErrorLabel.style.opacity = 1;
            }
        } else {
            this.$buttonHolder.style.display = "none";
            this.$infoArea.style.display = "block";
            this.$formatErrorLabel.style.opacity = 0;
        }
    }

    onClickClose() {
        this.hideMessage();
    }

    showMessage(message) {
        this.$message.style.display = "flex";
        this.$messageContent.innerHTML = message;
    }

    hideMessage() {
        this.$message.style.display = "none";
    }

    checkValidEmail(email) {
        let regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

        if (regex.test(email)) {
            return true;
        } else {
            return false;
        }
    }

    activateContent() {}

    onDataUpdated(data) {}

    onSubmit() {
        // Aquí validar el formulario
        console.log("onSubmit");
        let email = this.$emailInput.value;
        let name = this.$nameInput.value;
        let surname = this.$surnameInput.value;
        let titleSelect = $("#title-select").val();
        let countrySelect = $("#country-select").val();
        let programSelect = $("#program-select").val();

        this.sendNewData({
            name: name,
            surname: surname,
            email: email,
            score: currentPunctuation.getPunctuation(),
            avatar: avatarSelection.getAvatarID(),
            title: titleSelect,
            country: countrySelect,
            program: programSelect,
        });
    }

    sendNewData(data) {
        console.log(data);
        const t = this;
        // Quitamos acceptance wrapper
        document.querySelector(".acceptance-wrapper").style.display = "none";
        document.getElementById("form-title").style.opacity = 0;

        this.$resendButtonHolder.style.display = "none";
        this.$incorrectFormImage.style.display = "none";

        this.$sendingLabel.innerHTML = "<strong>Sending...</strong>";
        this.$waitLabel.innerHTML = "Please wait";

        // Show Loading
        this.$formulario.style.display = "none";
        this.$sending.style.display = "flex";

        // Wait 2 seconds before fetching
        setTimeout(function () {
            fetch(`${t.URL_BASE}save_user.php`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);
                    t.onFormSuccess();
                })
                .catch((err) => {
                    t.onFormError();
                });
        }, 2000);
    }

    onFormError() {
        console.log("onFormError");
        this.$sendingLabel.innerHTML = "<strong>Submission error!</strong>";
        this.$waitLabel.innerHTML = "Please try again";
        this.$resendButtonHolder.style.display = "block";
        this.$incorrectFormImage.style.display = "block";
    }

    onFormSuccess() {
        console.log("onFormSuccess");
        this.clearFields();
        this.$form.classList.add("hide");

        this.$sending.style.display = "none";
        this.$sucess.style.display = "flex";
        document.getElementById("form-title").innerHTML = "<strong>Thank you!</strong>";
        document.getElementById("form-title").style.opacity = 1;
    }

    clearFields() {
        this.$emailInput.value = "";
        this.$nameInput.value = "";
        this.$surnameInput.value = "";
        this.$phoneInput.value = "";
    }

    sendData(data) {
        console.error("enviando formulario");
        console.log(data);

        const xhr = new XMLHttpRequest();

        const urlEncodedDataPairs = [];

        // Turn the data object into an array of URL-encoded key/value pairs.
        for (const [name, value] of Object.entries(data)) {
            urlEncodedDataPairs.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`);
        }

        // Combine the pairs into a single string and replace all %-encoded spaces to
        // the '+' character; matches the behavior of browser form submissions.
        const urlEncodedData = urlEncodedDataPairs.join("&").replace(/%20/g, "+");

        // Define what happens on successful data submission
        xhr.addEventListener("load", (event) => {
            console.log("form regresa con éxito");
            console.log(event.target.responseText);

            this.clearFields();
            this.$form.classList.remove("hide");
        });

        // Define what happens in case of an error
        xhr.addEventListener("error", (event) => {
            console.log("Oops! Something went wrong.");
            this.clearFields();
            this.$form.classList.remove("hide");
        });

        // Set up our request
        xhr.open("POST", `${this.URL_BASE}save_user.php`);

        // Add the required HTTP header for form data POST requests
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Authorization", "Bearer " + ACCESS_TOKEN);
        //xhr.setRequestHeader('Custom-Header', 'custom-value');

        // Finally, send our data.
        xhr.send(urlEncodedData);

        // Hide form
        this.$form.classList.add("hide");
    }
}

export default ContentForm;
