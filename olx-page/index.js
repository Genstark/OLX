document.addEventListener("DOMContentLoaded", () => {

    const token = sessionStorage.getItem('token');
    const item = sessionStorage.getItem('item');
    // const withLogin = document.getElementById('withlogin');
    const withOutLogin = document.getElementById('withoutlogin');

    const dropDown = document.getElementById('dropdown');
    const name = document.getElementById('name');

    console.log(token);
    
    const apiUrl = 'http://localhost:2000/items';
    const options = {
        method : "GET",
    };


    fetch(apiUrl, options).then(res => {
        return res.json();
    }).then(data => {
        console.log(data);

        const dataLength = data['data'].length;

        for(let i=0; i < dataLength; i++){
            createElement(data['data'][i]['_id'], data['data'][i]['image-1']['data'], data['data'][i]['title'], data['data'][i]['overview'], data['data'][i]['state']);
            
            if(token === data['data'][i]['user_id']){

                dropDown.classList.remove('d-none');
                withOutLogin.classList.add('d-none');
                dropDown.classList.add('d-block');
                name.innerHTML = `${sessionStorage.getItem('data')}👋`;

                // withLogin.classList.remove('d-none');
                // withLogin.classList.add('d-block');

                // withLogin.innerHTML = `${data['data'][i]['userName']}`;
            }
        }

    }).catch(error => {
        console.log(error);
    });
});


function createElement(productKey, image, title, overview, state){
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


const reloadHeading = document.querySelector('.heading');
reloadHeading.addEventListener('click', () => {
    location.reload();
})

function pageChange(key, event){
    console.log(key);
    console.log(event);
    sessionStorage.setItem('item', key);
    location.href = '/olx-page/productdetail.html';
}

document.addEventListener('keypress', (event) => {
    if(event.key === 'Enter'){
        query();
    }
});

function query(){
    const search = document.getElementById('search').value.split(' ')[0];
    const state = document.getElementById('state');

    console.log('wait.....');

    const apiUrl = `http://localhost:2000/item/search/${search}`;
    const options = {
        method : 'GET',
    }

    fetch(apiUrl ,options).then((response)=> {
        return response.json();
    }).then(data => {
        console.log(data);

        const dataLength = data['data'].length;

        const mainContainer = document.getElementById('mainContainer');

        mainContainer.innerHTML = '';

        for(let i=0; i < dataLength; i++){
            createElement(data['data'][i]['_id'], data['data'][i]['image-1']['data'], data['data'][i]['title'], data['data'][i]['overview'], data['data'][i]['state']);
        }

    }).catch(error => {
        console.log(error);
    });
}


function entryPage(){
    const token = sessionStorage.getItem('token');

    if(token !== null){
        location.href = '/olx-page/productEntry.html';
    }
    else{
        location.href = '/olx-page/login.html';
    }
}

const logoutpage = document.getElementById('logout');
logoutpage.addEventListener('click', () => {

    const dropDown = document.getElementById('dropdown');
    // const name = document.getElementById('name');
    const withOutLogin = document.getElementById('withoutlogin');

    dropDown.classList.remove('d-block');
    withOutLogin.classList.add('d-block');
    withOutLogin.classList.remove('d-none');
    dropDown.classList.add('d-none');
    // name.innerHTML = `${sessionStorage.getItem('data')}👋`;

    sessionStorage.removeItem('data');
    sessionStorage.removeItem('token');
    // window.location.reload();
});

// Two types of users
// 1. Seller of  product.
// 2. Buyer of product.
// 3. Seller creates a Post mentioning the details of product. 
//    - Marketplace
// 4. Buyer search for a product.
// 5. Other factors to consider 
//    - Image of product / service
//    - Location
//    - Price
//    - Availability
//    - Auto login
//    - OTP