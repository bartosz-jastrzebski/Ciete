var page = 1;
var empty_page = false;
var block_request = false;

window.onscroll = function () {
    var contact = document.querySelector('#contact');
    var portfolio = document.querySelector('.block__content')
    var margin = contact.offsetTop - 500;

    if (window.pageYOffset > margin && 
        empty_page == false && 
        block_request == false) {

            block_request = true;
            page += 1

            var xhr = new XMLHttpRequest();
            xhr.open('GET', `?page=` + page, true);
            xhr.responseType = 'text'
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            xhr.setRequestHeader("page", page);
            xhr.onreadystatechange = function(){
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    data = xhr.response
                    if (data == '') {
                        empty_page = true
                    } else {
                        var div = document.createElement('div')
                        div.innerHTML = data
                        portfolio.appendChild(div)
                        block_request = false
                        }
                    }
                }
            }
            xhr.send();
    }
}