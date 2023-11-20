function checkData(){
    const brandName = document.getElementById('brandname');
    const productType = document.getElementById('product-type');
    const address = document.getElementById('address');
    const phoneNumber = document.getElementById('phonenumber');
    const state = document.getElementById('state');
    const city = document.getElementById('city');
    const price = document.getElementById('price');
    const image1 = document.getElementById('image1');
    const overview = document.getElementById('overview');
    const details = document.getElementById('details');

    if(brandName.value.trim() === ''){
        brandName.classList.add('border-danger');
        brandName.focus();
        return false;
    }
    else if(productType.value.trim() === ''){
        brandName.classList.remove('border-danger');
        productType.classList.add('border-danger');
        productType.focus();
        return false;
    }
    else if(address.value.trim() === ''){
        productType.classList.remove('border-danger');
        address.classList.add('border-danger');
        address.focus();
        return false;
    }
    else if(validPhoneNumber(PhoneNumber) === false){
        address.classList.remove('border-danger');
        PhoneNumber.classList.add('border-danger');
        PhoneNumber.focus();
        return false;
    }
    else if(state.value.trim() === ''){
        PhoneNumber.classList.remove('border-danger');
        state.classList.add('border-danger');
        state.focus();
        return false;
    }
    else if(city.value.trim() === ''){
        state.classList.remove('border-danger');
        city.classList.add('border-danger');
        city.focus();
        return false;
    }
    else if(price.value === null || price.value === undefined){
        city.classList.remove('border-danger');
        price.classList.add('border-danger');
        price.focus();
        return false;
    }
    else if(overview.value.trim() === ''){
        price.classList.remove('border-danger');
        overview.classList.add('border-danger');
        overview.focus();
        return false;
    }
    else if(details.value.trim() === ''){
        overview.classList.remove('border-danger');
        details.classList.add('border-danger');
        details.focus();
        return false;
    }
    else{
        details.classList.remove('border-danger');
        
        const productData = {
            'brandName' : brandName.value,
            'productType': productType.value,
            'address' : address.value,
            'phoneNumber': phoneNumber.value,
            'state' : state.value,
            'city' : city.value,
            'price' : price.value,
            'overview' : overview.value,
            'details' : details.value
        };

        return productData;
    }
}


function addProduct(){
    const image = document.getElementById('images1');
    // Create a FormData object and append files
    let formData = new FormData();
    
    formData.append('brandname', );
    formData.append('files', image.files[0]);
    formData.append('files', image.files[1]);
    formData.append('files', image.files[2]);

    // if(image.files[0].type === 'image/jpeg' || image.files[0].type === 'image/png'){
    //     formData.append('files', image.files[0]);
    // }
    
    // if(image.files[1].type === 'image/jpeg' || image.files[1].type === 'image/png'){
    //     formData.append('files', image.files[1]);
    // }

    // if(image.files[2].type === 'image/jpeg' || image.files[2].type === 'image/png'){
    //     formData.append('files', image.files[0]);
    // }

    // for(let i=0; i < image1.files.length; i++){
    //     if(i === 3){
    //         break;
    //     }
    //     else{
    //         let fileType = image1.files[i].type;
    //         if(image1.files[i].type === 'image/png' || image1.files[i].type === 'image/jpeg'){
    //             console.log(image1.files[i].name);
    //             formData.append('files', image1.files[i]);
    //         }
    //         else{
    //             console.log('this is not image', i)
    //         }
    //     }
    // }

    const apiUrl = 'http://localhost:2000/addProduct';

    const options = {
        method: 'POST',
        body: formData,
    };

    
    const waiting = document.getElementById('addProduct');
    waiting.textContent = 'Wait....';
    waiting.style.cursor = 'wait';

    try {
        fetch(apiUrl, options).then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            else{
                return res.json();
            }
        }).then(data => {
            console.log(data);
            waiting.textContent = 'Add Product';
            waiting.style.cursor = '';
        }).catch(err => {
            console.log(err);
        });
    } 
    catch (error) {
        console.error('Error uploading images:', error);
    }

}

function validPhoneNumber(number){
    let numberChecking = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return numberChecking.test(number);
}

const changeLocation = document.getElementById('heading');
changeLocation.addEventListener('click', () => {
    location.href = '../index.html';
});

function auto_grow(element) {
    element.style.height = "auto";
    element.style.height = (element.scrollHeight) + "px";
}

document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('details');
    auto_grow(textarea);
});