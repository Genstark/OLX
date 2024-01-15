const registration = document.getElementById('registration');
registration.addEventListener('click', () => {
    location.href = 'https://cmp-olx.onrender.com/signIn';
});

const homePage = document.querySelector('.homepage');
homePage.addEventListener('click', () => {
    location.href = 'https://cmp-olx.onrender.com/home';
});


const checkbox = document.getElementById('checkbox');
checkbox.addEventListener('click', () => {
    const password = document.getElementById('password');

    if(checkbox.checked){
        password.type = 'text';
        checkbox.classList.add('bg-danger');
    }
    else{
        password.type = 'password';
        checkbox.classList.remove('bg-danger');
    }
});

// login button click event listener
function gettingData(){
    const userEmail = document.getElementById('useremail');
    const userPassword = document.getElementById('password');

    if(validateEmail(userEmail.value) === false){
        userEmail.classList.add('border-danger');
        return false;
    }
    else if(userPassword.value.trim() === ''){
        userEmail.classList.remove('border-danger');
        userPassword.classList.add('border-danger');
        return false;
    }
    else{
        userPassword.classList.remove('border-danger');
        userEmail.classList.remove('border-danger');


        const loginData = {
            'email': userEmail.value,
            'password': userPassword.value
        }
        return loginData;
    }
}


function loginAccount(){
    const data = gettingData();
    
    if(data === false){
        return;
    }
    else{
        
        const apiUrl = 'https://cmp-olx.onrender.com/login';
        const options = {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({'email': data['email'], 'password': data['password']})
        }


        const email = document.getElementById('useremail');
        const password = document.getElementById('password');

        const loginButton = document.getElementById('loginButton');

        loginButton.textContent = 'Wait....';
        loginButton.style.cursor = 'wait';

        fetch(apiUrl,options).then(res => {
            return res.json();
        }).then(data => {
            if(data['done'] === true){
                console.log(data);
                sessionStorage.setItem('token', data['token']);
                sessionStorage.setItem('data', data['data']);
                location.href = 'https://cmp-olx.onrender.com/home';
                email.classList.remove('border-danger');
                password.classList.remove('border-danger');
            }
            else if(data['done'] === null){
                console.log(data);
                email.classList.add('border-danger');
                password.classList.add('border-danger');
            }
            else{
                console.log(data);
                email.classList.add('border-danger');
                password.classList.add('border-danger');
            }
            
            loginButton.textContent = 'Login';
            loginButton.style.cursor = '';
        });
    }
}

document.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        loginAccount();
    }
});

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}