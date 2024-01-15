function checkingData(){
    const name = document.getElementById('username');
    const email = document.getElementById('useremail');
    const number = document.getElementById('usernumber');
    const password = document.getElementById('password');



    if(name.value.trim() === ''){
        name.classList.add('border-danger');
        console.log('empyt');
        return false;
    }
    else if(validateEmail(email.value) === false){
        name.classList.remove('border-danger');

        email.classList.add('border-danger');
        return false;
    }
    else if(password.value.trim().length < 8){
        email.classList.remove('border-danger');

        password.classList.add('border-danger');
        return false;
    }
    else{
        password.classList.remove('border-danger');

        const userData = {
            'UserName': name.value,
            'UserEmail': email.value,
            'Password': password.value,
        }

        return userData;
    }
    
}

function createAccount(){
    
    const userdata = checkingData();
    
    if(userdata === false){
        return;
    }
    else{
        const apiUrl = 'https://cmp-olx.onrender.com/signIn';
        const options = {
            method:'POST',
            headers:{
                "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(userdata)
        }


        const signIn = document.getElementById('signIn');
        signIn.textContent = 'Wait....';
        signIn.style.cursor = 'wait';

        try{
            fetch(apiUrl, options).then(res => {
                if(!res.ok){
                    signIn.textContent = 'Sign In';
                    signIn.style.cursor = 'pointer';
                    throw new Error('Network response was not ok');
                }
                return res.json();
            }).then(data => {
                console.log(data);
                signIn.textContent = 'Sign In';
                signIn.style.cursor = 'pointer';
            }).catch(err => {
                console.log(err);
            });
        }
        catch(error){
            console.log('server is not working, please try again');
            signIn.textContent = 'Sign In';
        }
    }
}

const homePage = document.querySelector('.homepage');
homePage.addEventListener('click', () => {
    location.href = 'https://cmp-olx.onrender.com/home';
});


const loginpage = document.getElementById('loginpage');
loginpage.addEventListener('click', () => {
    location.href = 'https://cmp-olx.onrender.com/login';
});


const checkbox = document.getElementById('checkbox');
checkbox.addEventListener('change', () => {
    if(checkbox.checked){
        document.getElementById('password').type = 'text'; // if user want see password then password type convert into text
        document.getElementById('checkbox').style.backgroundColor = 'red';  //checkbox background color is change into red
    }
    else{
        document.getElementById('password').type = 'password'; // if user don't want see password then type convert into password
        document.getElementById('checkbox').style.backgroundColor = 'white'; //checkbox background color is change into red
    }
});


function validateEmail(email) {
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validPhoneNumber(number){
    let numberChecking = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return numberChecking.test(number);
}