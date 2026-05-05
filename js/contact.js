document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const subjectError = document.getElementById("subjectError");
    const messageError = document.getElementById("messageError");


    const nameRegex = /^[A-Za-z]{2,}( [A-Za-z]{2,})+$/;
    const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;


    function validateName() {
        if (!nameRegex.test(nameInput.value.trim())) {
            nameError.textContent = "Enter full name (e.g. John Doe)";
            nameInput.classList.add("error-border");
            return false;
        }
        nameError.textContent = "";
        nameInput.classList.remove("error-border");
        return true;
    }

    function validateEmail() {
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = "Enter a valid email";
            emailInput.classList.add("error-border");
            return false;
        }
        emailError.textContent = "";
        emailInput.classList.remove("error-border");
        return true;
    }

    function validateSubject() {
        if (subjectInput.value.trim().length < 3) {
            subjectError.textContent = "Subject must be at least 3 characters";
            subjectInput.classList.add("error-border");
            return false;
        }
        subjectError.textContent = "";
        subjectInput.classList.remove("error-border");
        return true;
    }

    function validateMessage() {
        if (messageInput.value.trim().length < 10) {
            messageError.textContent = "Message must be at least 10 characters";
            messageInput.classList.add("error-border");
            return false;
        }
        messageError.textContent = "";
        messageInput.classList.remove("error-border");
        return true;
    }


    nameInput.addEventListener("input", validateName);
    emailInput.addEventListener("input", validateEmail);
    subjectInput.addEventListener("input", validateSubject);
    messageInput.addEventListener("input", validateMessage);


    form.addEventListener("submit", (e) => {
        const isValid =
            validateName() &&
            validateEmail() &&
            validateSubject() &&
            validateMessage();

        if (!isValid) {
            e.preventDefault();
        } else {

            form.innerHTML = "<h2 style='color:#f1c40f;text-align:center;'>✅ Message Sent Successfully!</h2>";
        }
    });

});