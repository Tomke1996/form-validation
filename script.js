// Sign Up Form
const signForm = document.getElementById('sign-up');
const passwordEl1 = document.getElementById('password1');
const passwordEl2 = document.getElementById('password2');
const messageContainer = document.querySelector('.message-container');
const messageEl = document.querySelector('.message');
const logInSection = document.getElementById('content1');
const signUpSection = document.getElementById('content2');
const titleEl = document.getElementById('title');

let passwordsMatch = false;
let isValid;

function validateForm() {
    isValid = signForm.checkValidity();
    
    if (!isValid) {
        messageContainer.style.borderColor = 'red';
        messageEl.textContent = 'Please Fill out all Fields!';
        return;
    }
    if (passwordEl1.value === passwordEl2.value) {
        passwordsMatch = true;
        passwordEl1.style.borderColor = 'green';
        passwordEl2.style.borderColor = 'green';
    } else {
        passwordsMatch = false;
        passwordEl1.style.borderColor = 'red';
        passwordEl2.style.borderColor = 'red';
        messageContainer.style.borderColor = 'red';
        messageEl.textContent = 'Please Match Passwords!';
        return;
    }
    if (isValid && passwordsMatch) {
        messageContainer.style.borderColor = 'green';
        messageEl.textContent = 'Successfully Validated!';
    }
}

function storeFormData() {
    const user = {
        name: signForm.name.value,
        email: signForm.email.value,
        password: signForm.password.value
        };
    localStorage.setItem('savedUser', JSON.stringify(user));
}

function processFormData(e) {
    e.preventDefault();
    validateForm();
    if (isValid && passwordsMatch) {
        storeFormData();
    }
    setTimeout(() => {
        signUpSection.hidden = true;
        logInSection.hidden = false;
        titleEl.textContent = 'Log In';
    }, 1500);
}

// Log In
const logForm = document.getElementById('sign-in');
const logEmail = document.getElementById('logEmail');
const logPassword = document.getElementById('logPassword');

function loginCheck(e) {
    e.preventDefault();
    if (localStorage.getItem('savedUser')) {
        const user = JSON.parse(localStorage.savedUser);
        // console.log(user);
        if (logEmail.value === user.email && logPassword.value === user.password) {
            alert('Congrats, you are loged!');
        } else {
            alert('Incorect Email or Password!');
        }
    }
}

// Switch to Sign Up
const switchToSignBtn = document.querySelector('.redirection span');

// Add Event Listeners
signForm.addEventListener('submit', processFormData);
logForm.addEventListener('submit', loginCheck);
switchToSignBtn.addEventListener('click', () => {
    logInSection.hidden = true;
    signUpSection.hidden = false;
    titleEl.textContent = 'Sign Up';
});




