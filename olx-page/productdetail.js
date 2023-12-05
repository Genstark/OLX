document.addEventListener('DOMContentLoaded', gettingData());


let allImage = [];

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
        state.innerHTML = `${data['data']['state']}/ ${data['data']['city']}`;
        details.value = data['data']['details'];

        mainImage.src = `${data['data']['image-1']['data']}`;
        allImage.push(data['data']['image-1']['data']);

        image1.src = `${data['data']['image-1']['data']}`;
        // allImage.push(data['data']['image-2']['data']);

        image2.src = `${data['data']['image-2']['data']}`;
        allImage.push(data['data']['image-2']['data']);

        image3.src = `${data['data']['image-3']['data']}`;
        allImage.push(data['data']['image-3']['data']);

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
    
    try{
        sellerName.innerHTML = data['data']['userName'];
        sellerContact.innerHTML = data['data']['phoneNumber'];
        priceProduct.innerHTML = data['data']['price'];
        userAddress.innerHTML = `Address: ${data['data']['Address']}`;
        smallOverview.value = data['data']['overview'];
        state.innerHTML = `${data['data']['state']}/ ${data['data']['city']}`;
        details.value = data['data']['details'];

        
        mainImage.src = `${data['data']['image-1']['data']}`;
        allImage.push(data['data']['image-1']['data']);

        image1.src = `${data['data']['image-1']['data']}`;
        // allImage.push(data['data']['image-1']['data']);

        image2.src = `${data['data']['image-2']['data']}`;
        allImage.push(data['data']['image-2']['data']);

        image3.src = `${data['data']['image-3']['data']}`;
        allImage.push(data['data']['image-3']['data']);
        
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
    
    console.log(token);

    mainBody.style.display = 'none';


    const apiUrl = `http://localhost:2000/items/${item}`;
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

const userPage= document.getElementById('userPage');
userPage.addEventListener('click', () => {
    window.location.href = './profile.html';
});


const logout = document.getElementById('logout');
logout.addEventListener('click', () => {
    const login = document.getElementById('login');
    const dropDown = document.getElementById('dropdown');

    dropDown.style.display = 'block';
    login.classList.remove('d-none');

    sessionStorage.removeItem('data');
    sessionStorage.removeItem('token');
    location.reload();
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
    location.href = '../index.html';
});