document.addEventListener('DOMContentLoaded', loginFunction);

const heading = document.getElementById('heading');
heading.addEventListener('click', () => {
    location.href = '../index.html';
});


function loginFunction(){
    const sessionData = sessionStorage.getItem('token');
    const loginOrNot = document.getElementById('loginOrNot');
    const dropDown = document.getElementById('dropdown');
    const name = document.getElementById('name');
    const userName = document.getElementById('userName');

    const apiUrl = `http://localhost:2000/${sessionData}`;
    const options = {
        method: 'GET',
    }

    fetch(apiUrl, options).then(res => {
        return res.json();
    }).then(data => {
        
        console.log(data);
        console.log(data['data']['UserName']);
        loginOrNot.style.display = 'none';
        dropDown.classList.remove('d-none');
        name.innerHTML = data['data']['UserName'];
        userName.innerHTML = data['data']['UserName'];

        let arrayLength = data['data']['product'].length; 

        for(let i=0; i < arrayLength; i++){
            createElement(data['data']['product'][i]['image-1']['data'], data['data']['product'][i]['productType'], data['data']['product'][i]['overview']);
        }

    }).catch(error => {
        console.log(error);
    });
}


function createElement(image, productName, overview){
    const allProduct = document.getElementById('allProduct');

    allProduct.innerHTML += `
        <div class="card mb-3 w-100 mt-2" id="nextPage">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="data:image/png image/jpg;base64,${image}" class="img-fluid rounded-start" alt="produt image">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${productName}</h5>
                        <p class="card-text mt-3">${overview}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}