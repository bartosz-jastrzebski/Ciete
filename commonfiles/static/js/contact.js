function Contact () {
    var contactForm = document.querySelector('#contact form')
    var sent = document.querySelector('.wrapper__item--form .sent')
    var envelope = document.querySelector('.form-wrap')

    var newUrl = document.URL + 'send_contact/'

    contactForm.onsubmit = function(event) {
        var formData = new FormData(document.querySelector('form'))
        event.preventDefault()
        var xhr = new XMLHttpRequest();
        xhr.open("POST", newUrl, true);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader("X-CSRFToken", document.querySelector("[name=csrfmiddlewaretoken]").value);
        xhr.responseType = 'json';
        xhr.onreadystatechange = function() {
            if ( xhr.readyState == 4 ) {
               if (xhr.status == 200 && xhr.response['status'] == 'ok') {
                    envelopeAnimate();
               } else {
                    document.querySelector('.unsent').style.display = 'block';
               }
            }
        }
        xhr.send(formData);
    }


    function envelopeAnimate() {
        var width = envelope.clientWidth / 2;
        var height = envelope.clientHeight / 2;
        var borderSizes = `${height}px ${width}px ${height}px ${width}px`
        var divs = Array.from(envelope.getElementsByTagName('div'));
        divs.forEach(setDimensions);

        contactForm.parentElement.style.transform = 'translateZ(-300px) translateX(0px)';
        divs[0].style.transform = 'rotateX(0deg)'
        divs[1].style.transform = 'translateY(0px)'
        divs[2].style.transform = 'translateY(0px)'
        divs[3].style.transform = 'translateY(0px)'

        setTimeout(() => {
            envelope.style.transform = 'translateZ(-300px) translateX(2000px)';
            sent.style.opacity = 1;
        }, 4200);

        function setDimensions (e) {
            e.style.borderWidth = borderSizes;
        }
    }
}
Contact();



