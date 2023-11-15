function checkingData(){
    //checking if the user has entered a name and email address. If not, it will display an error message to the user
    //checking if the user has entered a name and email address. If not, it will display an error message to fill in these fields.
    // 	var data = {
        //     "name": $("#inputName").val(),
        //     "email":$("#inputEmail").val() ,
        //     "password" :$("#inputPassword").val() ,
        //     "confirm_pass" :$("#inputConfirmPass").val() ,
        // };
    const name = document.getElementById('username');
    const email = document.getElementById('useremail');
    const number = document.getElementById('usernumber');
    const password = document.getElementById('password');


    const numberLength = Number(number.value.length);

    if(name.value.trim() === ''){
        name.classList.add('border-danger');
        return;
    }
    else if(validateEmail(email.value) === false){
        name.classList.remove('border-danger');

        email.classList.add('border-danger');
        return;
    }
    else if(validPhoneNumber(number.value) === false){
        email.classList.remove('border-danger');

        number.classList.remove('border-danger');
        return;
    }
    else if(password.value.trim().length < 8){
        number.classList.remove('border-danger');

        password.classList.add('border-danger');
        return;
    }
    else{
        password.classList.remove('border-danger');

        const userData = {
            'name': name.value,
            'email' : email.value,
            'phone' : number.value,
            'password' : password.value,
        }

        return userData;
    }
    
}

function createAccount(){
    checkingData();
}

const homePage = document.querySelector('.homepage');
homePage.addEventListener('click', () => {
    location.href = '../index.html';
});

const checkbox = document.getElementById('checkbox');
checkbox.addEventListener('change', () => {
    if(checkbox.checked){
        document.getElementById('password').type = "text"; // if user want see password then password type convert into text
        document.getElementById('checkbox').style.backgroundColor = 'red';  //checkbox background color is change into red
    }
    else{
        document.getElementById('password').type = "password"; // if user don't want see password then type convert into password
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