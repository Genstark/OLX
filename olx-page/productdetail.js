document.addEventListener('DOMContentLoaded', gettingData());


function changeElementContentItem(data){
    const sellerName = document.getElementById('sellerName');
    const sellerContact = document.getElementById('sellerContact');
    const priceProduct = document.getElementById('productPrice');
    const userAddress = document.getElementById('userAddress');
    const smallOverview = document.getElementById('smallOverview');
    const state = document.getElementById('userStateAndCity');
    const details = document.getElementById('autoHeightTextarea');
    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');
    const mainImage = document.getElementById('mainImage');

    try{
        sellerName.innerHTML = data['data']['UserName'];
        sellerContact.innerHTML = '**********';
        priceProduct.innerHTML = data['data']['price'];
        userAddress.innerHTML = data['data']['Address'];
        smallOverview.value = data['data']['overview'];
        state.innerHTML = `${data['data']['state']}/ ${data['data']['city']}`;
        details.value = data['data']['details'];
        mainImage.src = `data:image/png image/jpeg;base64,${data['data']['image-1']['data']}`;
        image1.src = `data:image/png image/jpeg;base64,${data['data']['image-2']['data']}`;
        image2.src = `data:image/png image/jpeg;base64,${data['data']['image-3']['data']}`;
    }
    catch(error){
        console.error(error);
    }
}

function changeElementContentUser(data){
    const sellerName = document.getElementById('sellerName');
    const sellerContact = document.getElementById('sellerContact');
    const priceProduct = document.getElementById('productPrice');
    const userAddress = document.getElementById('userAddress');
    const smallOverview = document.getElementById('smallOverview');
    const state = document.getElementById('userStateAndCity');
    const details = document.getElementById('autoHeightTextarea');
    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');
    const mainImage = document.getElementById('mainImage');

    try{
        sellerName.innerHTML = data['data']['UserName'];
        sellerContact.innerHTML = data['data']['PhoneNumber'];
        priceProduct.innerHTML = data['data']['price'];
        userAddress.innerHTML = data['data']['Address'];
        smallOverview.value = data['data']['overview'];
        state.innerHTML = `${data['data']['state']}/ ${data['data']['city']}`;
        details.value = data['data']['details'];
        mainImage.src = `data:image/png image/jpeg;base64,${data['data']['image-1']['data']}`;
        image1.src = `data:image/png image/jpeg;base64,${data['data']['image-2']['data']}`;
        image2.src = `data:image/png image/jpeg;base64,${data['data']['image-3']['data']}`;
    }
    catch(error){
        console.error(error);
    }
}


function gettingData(){
    const token = sessionStorage.getItem('token');
    const item = sessionStorage.getItem('item');

    console.log(token);

    if(token !== null){
        const apiUrl = `http://localhost:2000/${token}`;
        const options = {
            method : 'GET',
        }

        try{
            fetch(apiUrl, options).then(res => {
                return res.json();
            }).then(data => {
                console.log(data);
                
                let textarea = document.getElementById('autoHeightTextarea');
                
                changeElementContentUser(data);
                auto_grow(textarea);

            }).catch(error => {
                console.error(error);
                console.log('token is not valid');
            });
        }
        catch(error){
            console.log('server is not working');
        }
    }
    else{

        const apiUrl = `http://localhost:2000/item/${item}`;
        const options = {
            method: 'GET',
        }
        console.log(item);

        fetch(apiUrl, options).then(res => {
            return res.json();
        }).then(data => {
            console.log(data);

            let textarea = document.getElementById('autoHeightTextarea');
            
            changeElementContentItem(data);
            auto_grow(textarea);

        }).catch(error => {
            console.log(error);
        });

        // fetch(apiUrl, options).then(res => {
        //     return res.json();
        // }).then(data => {
        //     console.log(data);
            
        //     let textarea = document.getElementById('autoHeightTextarea');
            
        //     changeElementContent(data);
        //     auto_grow(textarea);

        // }).catch(error => {
        //     console.error(error);
        //     console.log('item is not valid');
        // });
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


const image1 = document.getElementById('image1');
image1.addEventListener('click', () => {
    image1.src = `data:image/png image/jpeg;base64,${image}`;
});

const image2 = document.getElementById('image2');
image2.addEventListener('click', () => {
    image2.src = `data:image/png image/jpeg;base64,${image}`;
});

const changeLocation = document.getElementById('heading');
changeLocation.addEventListener('click', () => {
    location.href = '../index.html';
});