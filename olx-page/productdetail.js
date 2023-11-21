document.addEventListener('DOMContentLoaded', gettingData());


function changeElementContent(data){
    const sellerName = document.getElementById('sellerName');
    const sellerContact = document.getElementById('sellerContact');
    const priceProduct = document.getElementById('productPrice');
    const userAddress = document.getElementById('userAddress');
    const smallOverview = document.getElementById('smallOverview');
    const city = document.getElementById('city');
    const state = document.getElementById('userState');
    const details = document.getElementById('autoHeightTextarea');

    sellerName.innerHTML = data['data']['UserName'];
    sellerContact.innerHTML = data['data']['product']['phoneNumber'];
    priceProduct.innerHTML = data['data']['product']['price'];
    userAddress.innerHTML = data['data']['product']['Address'];
    smallOverview.value = data['data']['product']['overview'];
    city.innerHTML = data['data']['product']['city'];
    state.innerHTML = data['data']['product']['state'];
    details.value = data['data']['product']['details'];
}


function gettingData(){
    const tokenId = sessionStorage.getItem('token');
    console.log(tokenId);

    const apiUrl = `http://localhost:2000/${tokenId}`;
    const options = {
        method : 'GET',
    }

    fetch(apiUrl, options).then(res => {
        return res.json();
    }).then(data => {
        console.log(data);
        
        let textarea = document.getElementById('autoHeightTextarea');
        
        changeElementContent(data);
        auto_grow(textarea);

    }).catch(error => {
        console.log(error);
    });
}


function auto_grow(element) {
    element.style.height = "auto";
    element.style.height = (element.scrollHeight) + "px";
}

const userPage= document.getElementById('userPage');
userPage.addEventListener('click', () => {
    window.location.href = './userPageView.html';
});


const image1 = document.getElementById('image1');
image1.addEventListener('click', () => {
    image1.src = `data:image/png image/jpeg;base64,${image}`;
});

const image2 = document.getElementById('image2');
image2.addEventListener('click', () => {
    image2.src = `data:image/png image/jpeg;base64,${image}`;
});

const image3 = document.getElementById('image3');
image3.addEventListener('click', () => {
    image3.src = `data:image/png image/jpeg;base64,${image}`;
});

const changeLocation = document.getElementById('heading');
changeLocation.addEventListener('click', () => {
    location.href = '../index.html';
});