document.addEventListener("DOMContentLoaded", () => {

    const token = sessionStorage.getItem('token');
    const item = sessionStorage.getItem('item');
    const withLogin = document.getElementById('withlogin');
    const withOutLogin = document.getElementById('withoutlogin');

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
            createElement(data['data'][i]['_id'], data['data'][i]['image-1']['data'], data['data'][i]['productType'], data['data'][i]['overview'], data['data'][i]['state'], data['data'][i]['city']);
            
            if(token === data['data'][i]['user_id']){
                withLogin.classList.remove('d-none');
                withLogin.classList.add('d-block');

                withOutLogin.style.display = 'none';

                withLogin.innerHTML = `${data['data'][i]['userName']}`;
            }
        }

    }).catch(error => {
        console.log(error);
    });
});

function createElement(productKey, image, productname, overview, state, city){
    const mainContainer = document.getElementById('mainContainer');

    mainContainer.innerHTML += `
        <div class="card mb-3 w-100 mouseHover" onclick="pageChange('${productKey}', this)">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="data:image/png image/jpeg;base64,${image}" class="img-fluid rounded-start" alt="produt image">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${productname}</h5>
                        <p class="card-text mt-3">${overview}</p>
                        <p class="card-text bottom-text"><small class="text-muted">${state} and ${city}</small></p>
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
    location.href = '/olx-page/productdetail.html';

    // const apiUrl = `http://localhost:2000/product/${key}`;
    // const options = {
    //     method: 'GET',
    // }

    // fetch(apiUrl, options).then(res => {
    //     return res.json();
    // }).then(data => {
    //     console.log(data);
    // }).catch(error => {
    //     console.log(error);
    // });
}

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