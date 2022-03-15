// if emailaddress meets all requirements
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

// check if all input meet all requirements
const form_signup = document.querySelector('#form-signup');

if (form_signup) {
    form_signup.addEventListener('click', (e) => {
        const formName = document.querySelector('#name');
        const formEmail = document.querySelector('#email');
        const formUsername = document.querySelector('#username');
        const formPassword = document.querySelector('#password');
        const formConfirmPassword = document.querySelector('#confirm_password');
        const formPetName = document.querySelector('#namePet');
        const formBirthday = document.querySelector('#birthday');
        const formBreed = document.querySelector('#breed');

        if (formName.value.length != 0 && isEmail(formEmail.value) && formPassword.value.length != 0 && formPassword.value === formConfirmPassword.value) {
            console.log('All info is okay');
        } else {
            e.preventDefault()

            // check given name
            if (formName.value.length != 0) {
                console.log('A name has been given');
                formName.classList.remove('error');
            } else {
                console.log('No name has been given');
                formName.classList.add('error');
            }

            // check given email
            if (formEmail.value.length = 0) {
                console.log('No email has been given');
                formEmail.classList.add('error');
            } else if (!isEmail(formEmail.value)) {
                console.log('Given email is not valid');
                formEmail.classList.add('error');
            } else {
                console.log('Email has been given');
                formEmail.classList.remove('error');
            }

            // check given username
            if (formUsername.value.length != 0) {
                console.log('A username has been given');
                formUsername.classList.remove('error');
            } else {
                console.log('No username has been given');
                formUsername.classList.add('error');
            }

            // check given password
            if (formPassword.value.length != 0) {
                if (formPassword.value === formConfirmPassword.value) {
                    console.log('Passwords are the same');
                    formPassword.classList.remove('error');
                    formConfirmPassword.classList.remove('error');
                } else {
                    console.log('Passwords are NOT the same');
                    formPassword.classList.add('error');
                    formConfirmPassword.classList.add('error');
                }
            } else {
                console.log('No password has been given');
                formPassword.classList.add('error');
                formConfirmPassword.classList.add('error');
            }

            // check given petname
            if (formPetName.value.length != 0) {
                console.log('A petname has been given');
                formPetName.classList.remove('error');
            } else {
                console.log('No petname has been given');
                formPetName.classList.add('error');
            }

            // check given birthday
            if (formBirthday.value.length != 0) {
                console.log('A birthday has been given');
                formBirthday.classList.remove('error');
            } else {
                console.log('No birthday has been given');
                formBirthday.classList.add('error');
            }

            // check given breed
            if (formBreed.value.length != 0) {
                console.log('A breed has been given');
                formBreed.classList.remove('error');
            } else {
                console.log('No breed has been given');
                formBreed.classList.add('error');
            }
        }
    });
}