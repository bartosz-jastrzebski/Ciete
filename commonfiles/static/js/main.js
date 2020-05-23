var counter = 0;

var navbar = document.getElementsByTagName('nav')[0]
var languages = document.getElementsByClassName('languages')[0]
function Main () {

var scrollIds = ['home', 'offer', 'portfolio', 'team', 'contact' ]

var overlay = document.getElementsByClassName('overlay')[0]
var overlayHeight = this.getComputedStyle(overlay)['height']
overlayHeight = Number(overlayHeight.replace('px', ''))

var imgHome = document.getElementById('img-home')
var imgHomeHeight = this.getComputedStyle(imgHome)['height']
imgHomeHeight = Number(imgHomeHeight.replace('px', ''))

var sectionAbout = document.getElementById('about')
var aboutHeight = this.getComputedStyle(sectionAbout)['height']
aboutHeight = Number(aboutHeight.replace('px', ''))

var navbarHeight = this.getComputedStyle(navbar)['height']
navbarHeight = Number(navbarHeight.replace('px', ''))


var position = 0;
var images = sectionAbout.getElementsByTagName('img');
var animationCountdown = 0

images[2].setAttribute('src', '/static/images/choose3.jpg')
images[3].setAttribute('src', '/static/images/choose4.jpg')
images[4].setAttribute('src', '/static/images/choose5.jpg')

animate();
scrollIds.forEach(scrollEvent)

if (window.outerWidth > 1060) {
    document.onscroll = ScrollAnimate
} 

function scrollEvent (id) {
    let obj = document.getElementById(`${id}-link`)
    obj.addEventListener('click', function(event) {
        event.preventDefault()
        document.getElementById(id).scrollIntoView({
            behavior: 'smooth'
        })     
    })
}

function ScrollAnimate() {
    let offset = window.pageYOffset;
    let overlayValue = overlayHeight-offset;
    overlay.style.height = `${overlayValue}px`;
    if (offset >= overlayValue) {
        navbar.classList.add('white')
    } else {
        navbar.classList.remove('white')
    }
    console.log(offset);
    console.log(navbarHeight);
    console.log(imgHomeHeight);
    if (offset + navbarHeight >= imgHomeHeight) {
        navbar.classList.add('bordered')
    } else {
        navbar.classList.remove('bordered')
    }
}

function AnimateGallery(num) {
                
    switch (num) {
        case 0:
            position += images[0].width
            images[0].style.transform = `translateX(-${position}px)`
            images[1].style.transform = `translateX(-${position}px)`
            images[2].style.transform = `translateX(-${position}px)`
            images[3].style.transform = `translateX(-${position}px)`
            break;
        case 1:
            position += images[2].width
            images[1].style.transform = `translateX(-${position}px)`
            images[2].style.transform = `translateX(-${position}px)`
            images[3].style.transform = `translateX(-${position}px)`
            images[4].style.transform = `translateX(-${position}px)`
            break;
        case 2:
            position += images[3].width
            images[2].style.transform = `translateX(-${position}px)`
            images[3].style.transform = `translateX(-${position}px)`
            images[4].style.transform = `translateX(-${position}px)`
            break;
        case 3:
            position += images[3].width
            images[2].style.transform = `translateX(-${position}px)`
            images[3].style.transform = `translateX(-${position}px)`
            images[4].style.transform = `translateX(-${position}px)`
            break;
            // GOING BACK
        case 4:
            position -= images[3].width
            images[2].style.transform = `translateX(-${position}px)`
            images[3].style.transform = `translateX(-${position}px)`
            images[4].style.transform = `translateX(-${position}px)`
            break;
        case 5:
            position -= images[2].width
            images[1].style.transform = `translateX(-${position}px)`
            images[2].style.transform = `translateX(-${position}px)`
            images[3].style.transform = `translateX(-${position}px)`
            images[4].style.transform = `translateX(-${position}px)`
            break;
        case 6:
            position -= images[0].width
            images[0].style.transform = `translateX(-${position}px)`
            images[1].style.transform = `translateX(-${position}px)`
            images[2].style.transform = `translateX(-${position}px)`
            images[3].style.transform = `translateX(-${position}px)`
            break;
        case 7:
            position -= images[0].width
            images[0].style.transform = `translateX(0px)`
            images[1].style.transform = `translateX(0px)`
            images[2].style.transform = `translateX(0px)`
            images[3].style.transform = `translateX(0px)`
            break;
    }
}

function animate() {
    if (animationCountdown > 7 ) {
        animationCountdown = 0;
        }
    AnimateGallery(animationCountdown)
    animationCountdown ++
    setTimeout(animate, 3000);
    }

}