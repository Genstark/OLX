document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = 'http://localhost:2000/';
    const options ={
        method : "GET" ,
        headers:{
            "content-type":"application/json",
        }
    }

    fetch(apiUrl, options).then(res => {
        return res.json();
    }).then(data => {
        console.log(data);    
    }).catch(error => {
        console.log(error);
    });
});



function createElement(token, image, productType){
    const mainContainer = document.getElementById('mainContainer');

    mainContainer.innerHTML += `
        <div class="card mb-3 w-100" onclick='pageChange(${token})'>
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="data:image/png image/jpeg;base64,${image}" class="img-fluid rounded-start" alt="produt image">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${productType}</h5>
                        <p class="card-text mt-3">${overview}</p>
                        <p class="card-text bottom-text"><small class="text-muted">${state} and ${city}</small></p>
                    </div>
                </div>
            </div>
        </div>   
    `;
}


const nextPage = document.getElementById('nextPage');
nextPage.addEventListener('click', () => {
    location.href = '/olx-page/productdetail.html';
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