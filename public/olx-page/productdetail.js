document.addEventListener('DOMContentLoaded', gettingData());


let allImage = [];
let userId;
let user_name;

async function changeElementContentItem(data){
    const sellerName = document.getElementById('sellerName');
    const sellerContact = document.getElementById('sellerContact');
    const priceProduct = document.getElementById('productPrice');
    const userAddress = document.getElementById('userAddress');
    const smallOverview = document.getElementById('smallOverview');
    const state = document.getElementById('userStateAndCity');
    const details = document.getElementById('autoHeightTextarea');
    const mainImage = document.getElementById('mainImage');
    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');
    const image3 = document.getElementById('image3');

    try{
        sellerName.innerHTML = data['data']['userName'];
        sellerContact.innerHTML = '**********';
        priceProduct.innerHTML = data['data']['price'];
        // userAddress.innerHTML = data['data']['Address'];
        userAddress.innerHTML = `Address: **************`;
        smallOverview.value = data['data']['overview'];
        state.innerHTML = `${data['data']['state']}`;
        details.value = data['data']['details'];
        userId = data['data']['user_id'];
        user_name = data['data']['userName'];

        mainImage.src = `${data['data']['image-1']['data']}`;
        allImage.push(data['data']['image-1']['data']);

        image1.src = `${data['data']['image-1']['data']}`;
        // allImage.push(data['data']['image-2']['data']);

        if(image2.value !== ''){
            image2.src = `${data['data']['image-2']['data']}`;
            allImage.push(data['data']['image-2']['data']);
        }
        else{
            image2.style.display = 'none';
        }
        if(image3.value !== ''){
            image3.src = `${data['data']['image-3']['data']}`;
            allImage.push(data['data']['image-3']['data']);
        }
        else{
            image3.style.display = 'none';
        }

        // console.log(allImage);
    }
    catch(error){
        console.error(error);
    }
}

async function changeElementContentUser(data){
    const sellerName = document.getElementById('sellerName');
    const sellerContact = document.getElementById('sellerContact');
    const priceProduct = document.getElementById('productPrice');
    const userAddress = document.getElementById('userAddress');
    const smallOverview = document.getElementById('smallOverview');
    const state = document.getElementById('userStateAndCity');
    const details = document.getElementById('autoHeightTextarea');
    const mainImage = document.getElementById('mainImage');
    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');
    const image3 = document.getElementById('image3');
    userId = data['data']['user_id'];
    user_name = data['data']['userName'];
    
    try{
        sellerName.innerHTML = data['data']['userName'];
        sellerContact.innerHTML = data['data']['phoneNumber'];
        priceProduct.innerHTML = data['data']['price'];
        userAddress.innerHTML = `Address: ${data['data']['Address']}`;
        smallOverview.value = data['data']['overview'];
        // state.innerHTML = `${data['data']['state']}/ ${data['data']['city']}`;
        state.innerHTML = `${data['data']['state']}`;
        details.value = data['data']['details'];

        
        mainImage.src = `${data['data']['image-1']['data']}`;
        allImage.push(data['data']['image-1']['data']);

        image1.src = `${data['data']['image-1']['data']}`;
        // allImage.push(data['data']['image-1']['data']);
        
        if(image2.value !== ''){
            image2.src = `${data['data']['image-2']['data']}`;
            allImage.push(data['data']['image-2']['data']);
        }
        else{
            image2.style.display = 'none';
        }
        if(image3.value !== ''){
            image3.src = `${data['data']['image-3']['data']}`;
            allImage.push(data['data']['image-3']['data']);
        }
        else{
            image3.style.display = 'none';
        }

        // image3.src = `${data['data']['image-3']['data']}`;
        // allImage.push(data['data']['image-3']['data']);
        
        // console.log(allImage);
    }
    catch(error){
        console.error(error);
    }
}


function gettingData(){
    const token = sessionStorage.getItem('token');
    const item = sessionStorage.getItem('item');
    const mainBody = document.getElementById('main');

    const username = document.getElementById('username');
    const login = document.getElementById('login');

    const dropDown = document.getElementById('dropdown');
    const name = document.getElementById('name');
    
    const urlData = window.location.href.split('/').pop();
    console.log(token);

    mainBody.style.display = 'none';


    const apiUrl = `http://localhost:2000/items/${urlData}`;
    const options = {
        method : 'GET',
    }

    try{
        fetch(apiUrl, options).then(res => {
            return res.json();
        }).then(data => {
        
            console.log(data);
            let textarea = document.getElementById('autoHeightTextarea');
            
            if(token !== null){

                login.classList.remove('d-block');
                login.classList.add('d-none');

                dropDown.classList.remove('d-none');
                dropDown.classList.add('d-block');
                // name.innerHTML = `${data['data']['userName']}`;
                
                // username.classList.remove('d-none');
                // username.classList.add('d-block');


                // username.innerHTML = data['data']['userName'];
                
                changeElementContentUser(data).then(data => {
                    name.innerHTML = `${sessionStorage.getItem('data')}👋`;
                    auto_grow(textarea);
                }).catch(error => {
                    console.log(error);
                });
            }
            else{
                changeElementContentItem(data).then(data => {
                    auto_grow(textarea);
                }).catch(error => {
                    console.log(error);
                });
            }

            mainBody.style.display = 'block';

        }).catch(error => {
            console.error(error);
            console.log('token is not valid');
        });
    }
    catch(error){
        console.log('server is not working');
    }
}

function auto_grow(element) {
    element.style.height = "auto";
    element.style.height = (element.scrollHeight) + "px";
}


const addProductPage = document.getElementById('addProduct');
addProductPage.addEventListener('click', () => {
    const token = sessionStorage.getItem('token');
    if(token !== null){
        location.href = 'http://localhost:2000/addProduct';
    }
    else{
        location.href = 'http://localhost:2000/login';
    }
});

const userPage= document.getElementById('userPage');
userPage.addEventListener('click', () => {
    window.location.href = `http://localhost:2000/home/user/profile/${user_name}/${userId}`;
});


const logout = document.getElementById('logout');
logout.addEventListener('click', () => {

    const dropDown = document.getElementById('dropdown');
    const withOutLogin = document.getElementById('login');
    const sellerContact = document.getElementById('sellerContact');
    const userAddress = document.getElementById('userAddress');

    dropDown.classList.remove('d-block');
    withOutLogin.classList.add('d-block');
    withOutLogin.classList.remove('d-none');
    dropDown.classList.add('d-none');

    sellerContact.innerHTML = `**************`;
    userAddress.innerHTML = `**********`;

    sessionStorage.removeItem('data');
    sessionStorage.removeItem('token');
    // window.location.reload();
});


const mainImage = document.getElementById('mainImage');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');

image1.addEventListener('click', () => {
    mainImage.src = `${allImage[0]}`;
});

image2.addEventListener('click', () => {
    mainImage.src = `${allImage[1]}`;
});

image3.addEventListener('click', () => {
    mainImage.src = `${allImage[2]}`;
});


const changeLocation = document.getElementById('heading');
changeLocation.addEventListener('click', () => {
    location.href = 'http://localhost:2000/home';
});



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


function createElement(productKey, image, title, overview, state){
    const mainContainer = document.getElementById('mainContainer');

    mainContainer.innerHTML += `
        <div class="card mt-2 mb-3 w-100 mouseHover" onclick="pageChange('${productKey}', this)">
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
    console.log(key);
    console.log(event);
    sessionStorage.setItem('item', key);
    location.href = `http://localhost:2000/home/item/${key}`;
}