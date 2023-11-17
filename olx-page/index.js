const card1 = document.getElementById('card1');
card1.addEventListener('click', () => {
    location.href = '/olx-page/productdetail.html';
});

const card2 = document.getElementById('card2');
card1.addEventListener('click', () => {
    location.href = '/olx-page/productdetail.html';
});

const card3 = document.getElementById('card3');
card1.addEventListener('click', () => {
    location.href = '/olx-page/productdetail.html';
});



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