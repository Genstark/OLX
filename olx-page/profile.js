document.addEventListener('DOMContentLoaded', loginFunction);

const heading = document.getElementById('heading');
heading.addEventListener('click', () => {
    location.href = '../index.html';
});


function loginFunction(){
    const token = sessionStorage.getItem('token');
    const item = sessionStorage.getItem('item');
    const loginOrNot = document.getElementById('loginOrNot');
    const userName = document.getElementById('userName');
    const userContact = document.getElementById('userContact');
    const main = document.getElementById('main');

    const dropDown = document.getElementById('dropdown');
    const name = document.getElementById('name');

    console.log(token);

    const apiUrl = `http://localhost:2000/item/profile/${item}`;
    const options = {
        method: 'GET',
    }

    if(item){

        main.style.display = 'none';

        fetch(apiUrl, options).then(res => {
            return res.json();
        }).then(data => {
            
            console.log(data);
            
            userName.innerHTML = data['data'][0]['userName'];
            userContact.innerHTML = '**********';

            let arrayLength = data['data'].length;

            for(let i=0; i < arrayLength; i++){
                createElement(data['data'][i]['image-1']['data'], data['data'][i]['productType'], data['data'][i]['overview'], data['data'][i]['_id']);
            }

            if(token !== null){
                loginOrNot.innerHTML = data['data'][0]['userName'];
                userContact.innerHTML = data['data'][0]['phoneNumber'];
            }

            main.style.display = 'block';

        }).catch(error => {
            console.log(error);
        });
    }
    else{
        console.log('currently is user is logout');
    }
}


function createElement(image, productName, overview, id){
    const allProduct = document.getElementById('allProduct');

    // allProduct.innerHTML += `
    //     <div class="card mb-3 w-100" id="nextPage">
    //         <div class="row g-0">
    //             <div class="col-md-4">
    //                 <img src="data:image/png image/jpg;base64,${image}" class="img-fluid rounded-start image-height" alt="produt image">
    //             </div>
    //             <div class="col-md-8">
    //                 <div class="card-body">
    //                     <h6 class="card-title">${productName}</h6>
    //                     <p class="card-text mt-1"><small>${overview}</small></p>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // `;

    // allProduct.innerHTML += `
    //     <div class="card">
    //         <img src="data:image/png image/jpg;base64,${image}" class="card-img-top" alt="Card Image">
    //         <div class="card-body">
    //             <h5 class="card-title">${productName}</h5>
    //             <p class="card-text">${overview}</p>
    //             <a href="#" class="btn btn-primary">Learn More</a>
    //         </div>
    //     </div>
    // `;

    allProduct.innerHTML += `

        <div class="card mb-2 mt-2 w-100">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="data:image/png image/jpg;base64,${image}" class="card-img w-100 h-100" alt="Card Image">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${productName}</h5>
                        <p class="card-text">${overview}</p>
                        <button class="btn border-danger rounded btn-sm" onclick="deleteItem(this, '${id}')" title="remove item">Remove</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}


function deleteItem(event, itemId){
    console.log(event);
    console.log(itemId);

    const apiUrl = `http://localhost:2000/item/${itemId}`;
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

const logout = document.getElementById('logout');
logout.addEventListener('click', () => {

    const loginOrNot = document.getElementById('loginOrNot');
    const dropDown = document.getElementById('dropdown');

    dropDown.style.display = 'block';
    loginOrNot.classList.remove('d-none');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('data');
    location.reload();
});