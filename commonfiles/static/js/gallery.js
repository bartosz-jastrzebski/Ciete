function Gallery () {

var galleryItems = Array.from(document.getElementsByClassName('gallery-container'))
var gallery = document.getElementById('portfolio')
galleryItems.forEach(ShowItems);

function ShowItems(obj) {
    obj.onclick = function() {
        document.body.style.overflow = 'hidden';
        galleryTitle = this.dataset.title
        imageURL = this.dataset.url
        imageNumber = this.dataset.number - 1
        
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
            <img id="full-photo" src="${imageURL}">
            </div>
            <div id="next">
            <i class="material-icons" style="display:none;">navigate_next</i>
            </div>
        </div>
        <div class='created__gallery--bottom'></div>`

        var image = document.getElementById('full-photo')
        var middle = document.getElementsByClassName('created__gallery--middle')[0]
        middle = Array.from(middle.children)
        var previous = middle[0]
        var next = middle[2]
        middle.forEach(changePhoto)
        var photos
        var xhr = new XMLHttpRequest();
        xhr.open('GET', `${document.URL}gallery/${galleryTitle}`, true);
        console.log(`${document.URL}gallery/${galleryTitle}`);
        
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.responseType = 'json'
        xhr.onreadystatechange = function(){
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                next.firstElementChild.style.display = 'block'
                photos = xhr.response['photos']
                }
            }
        }
        xhr.send();

        var photoNum = imageNumber
        var previousPhotoNum = 0
        function changePhoto(element) {
            element.onclick = function () {

                if (this.id == 'next' || this.id == 'middle') {
                    photoNum ++
                    previous.firstElementChild.style.display = 'block'
                } else {
                    photoNum --
                    next.firstElementChild.style.display = 'block'
                }

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
                if (photoNum != previousPhotoNum) {
                    var toSet = photos[photoNum]
                    image.setAttribute('src', toSet)
                }
            }
        }
        document.getElementById('close').onclick = function() {
            gallery.removeChild(figure)
            document.body.style.overflow = 'auto';
        }
    }
}

}