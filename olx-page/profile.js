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
    const main = document.getElementById('main');
    const userAddress = document.getElementById('userAddress');
    const userContact = document.getElementById('userContact');

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
            userContact.innerHTML = '**********';
            userAddress.innerHTML = '**********'

            let arrayLength = data['data'].length;

            for(let i=0; i < arrayLength; i++){
                createElement(data['data'][i]['image-1']['data'], data['data'][i]['title'], data['data'][i]['overview'], data['data'][i]['_id'], data['data'][i]['Address']);
            }

            if(token !== null){
                dropDown.classList.remove('d-none');
                loginOrNot.classList.add('d-none');
                dropDown.classList.add('d-block');
                name.innerText = `${sessionStorage.getItem('data')}👋`;
                loginOrNot.innerHTML = data['data'][0]['userName'];
                userContact.innerHTML = data['data'][0]['phoneNumber'];
                userAddress.innerHTML = data['data'][0]['Address'];
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


function createElement(image, productName, overview, id){
    const allProduct = document.getElementById('allProduct');


    allProduct.innerHTML += `

        <div class="card mb-2 mt-2 w-100">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="${image}" class="card-img w-100 h-100" alt="Card Image">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title" id="product-title" onclick="changeView(this, '${id}')">${productName}</h5>
                        <p class="card-text">${overview}</p>
                        <button class="btn border-danger rounded btn-sm" onclick="deleteItem(this, '${id}')" title="remove item">Remove</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}


function changeView(event, itemId){
    sessionStorage.setItem('item', itemId);
    location.href = '/olx-page/productdetail.html';
}

function deleteItem(event, itemId){
    console.log(event);
    console.log(itemId);

    const apiUrl = `http://localhost:2000/item/${itemId}`;
    const options = {
        method: 'DELETE',
    };

    fetch(apiUrl, options).then(res => {
        return res.json();
    }).then(data => {
        console.log(data);
        event.parentNode.parentNode.parentNode.parentNode.remove();
    }).catch(error => {
        console.log(error);
    });
}

const logout = document.getElementById('logout');
logout.addEventListener('click', () => {

    const dropDown = document.getElementById('dropdown');
    const loginOrNot = document.getElementById('loginOrNot');
    const userAddress = document.getElementById('userAddress');
    const userContact = document.getElementById('userContact');

    dropDown.classList.remove('d-block');
    loginOrNot.classList.add('d-block');
    loginOrNot.classList.remove('d-none');
    dropDown.classList.add('d-none');

    loginOrNot.innerHTML = `Login`;
    userAddress.innerText = '*************';
    userContact.innerText = '**********';

    sessionStorage.removeItem('data');
    sessionStorage.removeItem('token');
    // window.location.reload();
});