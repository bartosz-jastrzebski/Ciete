var page = 1;
var empty_page = false;
var block_request = false;
var portfolio = document.querySelector('.block__content .no-margin')

window.onscroll = function () {
    var contact = document.querySelector('#contact');
    var margin = contact.offsetTop - 400;
    // console.log(window.pageYOffset)
    // console.log(margin)
    if (window.pageYOffset > margin && 
        empty_page == false && 
        block_request == false) {
            console.log('Running')
            block_request = true;
            page += 1
            console.log(page)
            
            var xhr = new XMLHttpRequest();
            xhr.open('GET', `?page=` + page, true);
            xhr.responseType = 'text'
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            xhr.setRequestHeader("page", page);
            xhr.onreadystatechange = function(){
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    data = xhr.response
                    console.log(data)
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