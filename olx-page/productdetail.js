const changeLocation = document.getElementById('heading');
changeLocation.addEventListener('click', () => {
    location.href = '../index.html';
});

function auto_grow(element) {
    element.style.height = "auto";
    element.style.height = (element.scrollHeight) + "px";
}


document.addEventListener('DOMContentLoaded', function() {
    let textarea = document.getElementById('autoHeightTextarea');
    auto_grow(textarea);
});