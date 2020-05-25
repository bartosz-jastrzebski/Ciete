function Gallery () {

var galleryItems = Array.from(document.getElementsByClassName('gallery-container'))
var gallery = document.getElementById('portfolio')
galleryItems.forEach(ShowItems);

function ShowItems(obj) {
    obj.onclick = function() {
        document.body.style.overflow = 'hidden';
        galleryTitle = this.dataset.title;
        var photoNum = this.dataset.number - 1; 

        var figure = document.createElement('figure')
        gallery.appendChild(figure)
        figure.innerHTML = `
        <div class='created__gallery--top'>
            <img id="close" src='/static/images/close-white.png'>
        </div>
        <div class='created__gallery--middle'>
            <div id="previous">
            <i class="material-icons" style="display:none;">navigate_before</i>
            </div>
            <div id="middle">
            <svg width="100" height="100" id="circle-loader">
            <defs>
                <linearGradient id="myGradient" gradientTransform="rotate(90)">
                <stop offset="5%"  stop-color="grey" />
                <stop offset="80%" stop-color="transparent" />
                </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="40" stroke="url('#myGradient')" stroke-width="15px" fill="rgba(1,1,1,0)" />
            </svg>
            </div>
            <div id="next">
            <i class="material-icons" style="display:none;">navigate_next</i>
            </div>
        </div>
        <div class='created__gallery--bottom'></div>`

        var circle = document.getElementById('circle-loader')
        var middle = document.getElementsByClassName('created__gallery--middle')[0]
        middle = Array.from(middle.children)
        var previous = middle[0]
        var next = middle[2]
        middle.forEach(changePhoto)
        
        var img = new Image();
        middle[1].appendChild(img)
        img.onload = function() {
            // img.style.display = 'block'
            circle.style.zIndex = -1
            }

        var photos
        var xhr = new XMLHttpRequest();
        xhr.open('GET', `gallery/${galleryTitle}`, true);
        xhr.responseType = 'json'
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.onreadystatechange = function(){
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                photos = xhr.response['photos']
                console.log(photos)
                img.src = photos[photoNum];
                switch(photoNum) {
                    case 0:
                        next.firstElementChild.style.display = 'block'
                        break;
                    case photos.length -1:
                        previous.firstElementChild.style.display = 'block'
                        break;
                    default:
                        previous.firstElementChild.style.display = 'block'
                        next.firstElementChild.style.display = 'block'
                        break;

                    }
                }
            }
        }
        xhr.send();

        var previousPhotoNum = 0
        function changePhoto(element) {
            element.onclick = function DisplayPhoto () {
                circle.style.zIndex = 1
                // img.style.display= 'none'
                if (this.id == 'next' || this.id == 'middle') {
                    photoNum ++
                    previous.firstElementChild.style.display = 'block'
                } else {
                    photoNum --
                    console.log('Minus')
                    next.firstElementChild.style.display = 'block'
                }
                
                console.log(photoNum);
                switch(photoNum){
                    case -1:
                        photoNum = 0
                        previousPhotoNum = 0
                        break;
                    case photos.length:
                        photoNum = photos.length - 1
                        previousPhotoNum = photos.length - 1
                        break;
                    case 0:
                        previous.firstElementChild.style.display = 'none'
                        break;
                    case photos.length -1:
                        next.firstElementChild.style.display = 'none'
                        break;
                }
                // if (photoNum != previousPhotoNum) {
                var toSet = photos[photoNum]
                console.log(toSet)
                img.setAttribute('src', toSet)
                // }
            }
        }
        document.getElementById('close').onclick = function() {
            gallery.removeChild(figure)
            document.body.style.overflow = 'auto';
        }
    }
}

}