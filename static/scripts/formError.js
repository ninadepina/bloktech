// if emailaddress meets all requirements
const regex = (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};

// check if all input meet all requirements
const form_signup = document.querySelector("#form_signup");

if (form_signup) {
    form_signup.addEventListener("click", (e) => {
        const form_name = document.querySelector("#name");
        const form_email = document.querySelector("#email");
        const form_username = document.querySelector("#username");
        const form_password = document.querySelector("#password");
        const form_confirm_password = document.querySelector("#confirm_password");
        const form_pet_name = document.querySelector("#name_pet");
        const form_birthday = document.querySelector("#birthday");
        const form_breed = document.querySelector("#breed");

        if (form_name.value.length !== 0 && regex(form_email.value) && form_password.value.length !== 0 && form_password.value === form_confirm_password.value) {

        } else {
            e.preventDefault();

            // check given name
            if (form_name.value.length !== 0) {
                console.log("A name has been given");
                form_name.classList.remove("error");
            } else {
                console.log("No name has been given");
                form_name.classList.add("error");
            }

            // check given email
            if (form_email.value.length = 0) {
                console.log("No email has been given");
                form_email.classList.add("error");
            } else if (!regex(form_email.value)) {
                console.log("Given email is not valid");
                form_email.classList.add("error");
            } else {
                console.log("Email has been given");
                form_email.classList.remove("error");
            }

            // check given username
            if (form_username.value.length !== 0) {
                console.log("A username has been given");
                form_username.classList.remove("error");
            } else {
                console.log("No username has been given");
                form_username.classList.add("error");
            }

            // check given password
            if (form_password.value.length !== 0) {
                if (form_password.value === form_confirm_password.value) {
                    console.log("Passwords are the same");
                    form_password.classList.remove("error");
                    form_confirm_password.classList.remove("error");
                } else {
                    console.log("Passwords are NOT the same");
                    form_password.classList.add("error");
                    form_confirm_password.classList.add("error");
                }
            } else {
                console.log("No password has been given");
                form_password.classList.add("error");
                form_confirm_password.classList.add("error");
            }

            // check given petname
            if (form_pet_name.value.length !== 0) {
                console.log("A petname has been given");
                form_pet_name.classList.remove("error");
            } else {
                console.log("No petname has been given");
                form_pet_name.classList.add("error");
            }

            // check given birthday
            if (form_birthday.value.length !== 0) {
                console.log("A birthday has been given");
                form_birthday.classList.remove("error");
            } else {
                console.log("No birthday has been given");
                form_birthday.classList.add("error");
            }

            // check given breed
            if (form_breed.value.length !== 0) {
                console.log("A breed has been given");
                form_breed.classList.remove("error");
            } else {
                console.log("No breed has been given");
                form_breed.classList.add("error");
            }
        }
    });
}
