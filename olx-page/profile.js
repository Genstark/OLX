document.addEventListener('DOMContentLoaded', loginFunction);

const heading = document.getElementById('heading');
heading.addEventListener('click', () => {
    location.href = '../index.html';
});


function loginFunction(){
    const token = sessionStorage.getItem('token');
    const item = sessionStorage.getItem('item');
    const loginOrNot = document.getElementById('loginOrNot');
    const userName = document.getElementById('userName');
    const userContact = document.getElementById('userContact');
    const main = document.getElementById('main');

    const dropDown = document.getElementById('dropdown');
    const name = document.getElementById('name');

    console.log(token);

    const apiUrl = `http://localhost:2000/item/profile/${item}`;
    const options = {
        method: 'GET',
    }

    if(item){

        main.style.display = 'none';

        fetch(apiUrl, options).then(res => {
            return res.json();
        }).then(data => {
            
            console.log(data);
            
            userName.innerHTML = data['data'][0]['userName'];
            userContact.innerHTML = data['data'][0]['phoneNumber'];

            let arrayLength = data['data'].length;

            for(let i=0; i < arrayLength; i++){
                createElement(data['data'][i]['image-1']['data'], data['data'][i]['productType'], data['data'][i]['overview']);
            }

            if(token !== null){
                loginOrNot.innerHTML = data['data'][0]['userName'];
            }

            main.style.display = 'block';

        }).catch(error => {
            console.log(error);
        });
    }
    else{
        console.log('currently is user is logout');
    }
}


function createElement(image, productName, overview){
    const allProduct = document.getElementById('allProduct');

    allProduct.innerHTML += `
        <div class="card mb-3 w-100 mt-3" id="nextPage">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="data:image/png image/jpg;base64,${image}" class="img-fluid rounded-start" alt="produt image">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${productName}</h5>
                        <p class="card-text mt-3">${overview}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}


const logout = document.getElementById('logout');
logout.addEventListener('click', () => {

    const loginOrNot = document.getElementById('loginOrNot');
    const dropDown = document.getElementById('dropdown');

    dropDown.style.display = 'block';
    loginOrNot.classList.remove('d-none');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('data');
    location.reload();
});