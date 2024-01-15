document.addEventListener('DOMContentLoaded', loginFunction);

const heading = document.getElementById('heading');
heading.addEventListener('click', () => {
    location.href = 'https://cmp-olx.onrender.com/home';
});

const addProductPage = document.getElementById('addProduct');
addProductPage.addEventListener('click', () => {
    const token = sessionStorage.getItem('token');

    if(token !== null){
        location.href = 'https://cmp-olx.onrender.com/addProduct';
    }
    else{
        location.href = 'https://cmp-olx.onrender.com/login';
    }
});


function loginFunction(){
    const token = sessionStorage.getItem('token');
    const item = sessionStorage.getItem('item');
    const loginOrNot = document.getElementById('loginOrNot');
    const userName = document.getElementById('userName');
    const mainContainer = document.getElementById('mainContainer');
    const userAddress = document.getElementById('userAddress');
    const userContact = document.getElementById('userContact');
    const button = document.querySelectorAll('.removeButton');

    const dropDown = document.getElementById('dropdown');
    const name = document.getElementById('name');

    const urlData = window.location.href.split('/').pop();
    console.log(token);

    const apiUrl = `https://cmp-olx.onrender.com/item/profile/${urlData}`;
    const options = {
        method: 'GET',
    }


    mainContainer.style.display = 'none';

    const loadingRing = document.getElementById('ring');
    loadingRing.style.display = 'block';

    fetch(apiUrl, options).then(res => {
        return res.json();
    }).then(data => {
        
        console.log(data);
        
        userName.innerHTML = data['data'][0]['userName'];
        userContact.innerHTML = '**********';
        userAddress.innerHTML = '**********'

        const comapreToken = data['data'][0]['user_id'];

        let arrayLength = data['data'].length;

        for(let i=0; i < arrayLength; i++){
            createElement(data['data'][i]['image-1']['data'], data['data'][i]['title'], data['data'][i]['overview'], data['data'][i]['_id'], data['data'][i]['Address']);
            
            if(token !== comapreToken){
                document.querySelectorAll('.removeButton')[i].classList.add('d-none');
            }
            else{
                document.querySelectorAll('.removeButton')[i].classList.add('d-block');
            }
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

        loadingRing.style.display = 'none';
        mainContainer.style.display = 'block';

    }).catch(error => {
        console.log(error);
    });
}


function createElement(image, productName, overview, id){
    const allProduct = document.getElementById('allProduct');


    allProduct.innerHTML += `
        <div class="card mb-2 mt-2 w-100">
            <div class="row no-gutters mouseHover">
                <div class="col-md-4">
                    <img src="${image}" class="card-img w-100 h-100" alt="Card Image">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title" id="product-title" onclick="changeView(this, '${id}')">${productName}</h5>
                        <p class="card-text">${overview}</p>
                        <button class="btn border-danger rounded btn-sm removeButton" onclick="deleteItem(this, '${id}')" title="remove item">Remove</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}


function changeView(event, itemId){
    sessionStorage.setItem('item', itemId);
    location.href = `https://cmp-olx.onrender.com/home/item/${itemId}`;
}

function deleteItem(event, itemId){
    console.log(event);
    console.log(itemId);

    const apiUrl = `https://cmp-olx.onrender.com/item/${itemId}`;
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


document.addEventListener('keypress', (event) => {
    if(event.key === 'Enter'){
        query();
    }
});

function query(){
    const search = document.getElementById('search').value.split(' ')[0];
    const state = document.getElementById('state');

    const mainContainer = document.getElementById('mainContainer');
    mainContainer.innerHTML = '';

    console.log('wait.....');

    const loadingRing = document.getElementById('ring');
    loadingRing.style.display = 'block';


    const apiUrl = `https://cmp-olx.onrender.com/item/search/${search}`;
    const options = {
        method : 'GET',
    }

    fetch(apiUrl ,options).then((response)=> {
        return response.json();
    }).then(data => {
        console.log(data);

        const dataLength = data['data'].length;

        for(let i=0; i < dataLength; i++){
            createNewElement(data['data'][i]['_id'], data['data'][i]['image-1']['data'], data['data'][i]['title'], data['data'][i]['overview'], data['data'][i]['state']);
        }

        loadingRing.style.display = 'none';

    }).catch(error => {
        console.log(error);
    });
}


function createNewElement(productKey, image, title, overview, state){
    const mainContainer = document.getElementById('mainContainer');

    mainContainer.innerHTML += `
        <div class="card mb-3 w-100 mouseHover" onclick="pageChange('${productKey}', this)">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${image}" class="img-fluid rounded-start" alt="produt image">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${overview}</p>
                        <p class="card-text bottom-text"><small class="text-muted">${state}</small></p>
                    </div>
                </div>
            </div>
        </div>   
    `;
}

function pageChange(key, event){
    // console.log(key);
    // console.log(event);
    sessionStorage.setItem('item', key);
    location.href = `https://cmp-olx.onrender.com/home/item/${key}`;
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

    const buttons = document.querySelectorAll('.removeButton')
    
    for(let i=0; i < buttons.length; i++){
        buttons[i].classList.add('d-none');
    }

    sessionStorage.removeItem('data');
    sessionStorage.removeItem('token');
    // window.location.reload();
});