

var scrollIds = ['home', 'offer', 'portfolio', 'team', 'contact' ]

var overlay = document.getElementsByClassName('overlay')[0]
var overlayHeight = this.getComputedStyle(overlay)['height']
overlayHeight = Number(overlayHeight.replace('px', ''))

var imgHome = document.getElementById('img-home')
var imgHomeHeight = this.getComputedStyle(imgHome)['height']
imgHomeHeight = Number(imgHomeHeight.replace('px', ''))

overlay.style.height = `${imgHomeHeight}px`;

var navbar = document.getElementsByTagName('nav')[0]
var navbarHeight = this.getComputedStyle(navbar)['height']
navbarHeight = Number(navbarHeight.replace('px', ''))

var sectionAbout = document.getElementById('about')
var aboutHeight = this.getComputedStyle(sectionAbout)['height']
aboutHeight = Number(aboutHeight.replace('px', ''))

var portfolio = document.getElementById('portfolio')
var portfolioPosition = portfolio.getBoundingClientRect()['height']
var team = document.getElementById('team')
var contact = document.getElementById('contact')

var aboutText = sectionAbout.getElementsByClassName('block__text--choose')[0].children

var moved = Array.from(document.getElementsByClassName('moved'))

var position = 0;
var images = sectionAbout.getElementsByTagName('img');

var counter = 0;
var mov = 0
var animationCountdown = 0

// console.log('overlay: ' + overlayHeight);
// console.log('img: ' + imgHomeHeight);

function scrollEvent (id) {
    let obj = document.getElementById(`${id}-link`)
    obj.addEventListener('click', function(event) {
        // portfolio.style.display = 'flex';
        // team.style.display = 'flex';
        // contact.style.display = 'block';
        moved.forEach(function(e){e.classList.remove('moved')})
        counter = 1200
        event.preventDefault()
        document.getElementById(id).scrollIntoView({
            behavior: 'smooth'
        })     
    })
}


scrollIds.forEach(scrollEvent)

// console.log('overlay: ' + overlayHeight);
// console.log('navbar: ' + navbarHeight);       
// console.log('image: ' + imgHomeHeight); 

function Main () {


if (window.outerWidth > 1060) {
    window.onscroll = ScrollAnimate
} //else {
moved.forEach(function(e){e.classList.remove('moved')})
portfolio.style.display = 'flex';
team.style.display = 'flex';
contact.style.display = 'block';
images[2].setAttribute('src', '/static/images/choose3.jpg')
images[3].setAttribute('src', '/static/images/choose4.jpg')
images[4].setAttribute('src', '/static/images/choose5.jpg')
animate();
// }


document.body.onresize = function() {
    this.imgHome = document.getElementById('img-home')
    this.imgHomeHeight = this.getComputedStyle(imgHome)['height']
    imgHomeHeight = Number(imgHomeHeight.replace('px', ''))
    overlay.style.height = `${imgHomeHeight}px`;
}

function ScrollAnimate() {
    let offset = window.pageYOffset;
    if (offset < overlayHeight) {
        let overlayValue = overlayHeight-offset;

        if (overlayValue <= imgHomeHeight) {
            overlay.style.height = `${overlayValue}px`;
        }

        if (offset > overlayValue) {
            navbar.classList.add('white')
        } else {
            navbar.classList.remove('white')
        }



    if (offset + navbarHeight - 10 >= imgHomeHeight) {
        navbar.classList.add('bordered')
    } else {
        navbar.classList.remove('bordered')
    }
 
    }

    if (offset + window.innerHeight + 20 > imgHomeHeight + aboutHeight) {
        document.onwheel = function() {
            
            counter += 1;
            let images = sectionAbout.getElementsByTagName('img');
            
            switch (counter) {
                case 5:
                    mov += images[0].width
                    images[2].setAttribute('src', '/static/images/choose3.jpg')
                    images[3].setAttribute('src', '/static/images/choose4.jpg')
                    images[4].setAttribute('src', '/static/images/choose5.jpg')
                    images[0].style.transform = `translateX(-${mov}px)`
                    images[1].style.transform = `translateX(-${mov}px)`
                    images[2].style.transform = `translateX(-${mov}px)`
                    images[3].style.transform = `translateX(-${mov}px)`
                    aboutText[0].style.transform = `translateX(0px)`
                    aboutText[1].style.transform = `translateX(0px)`
                    break;
                case 15:
                    mov += images[2].width
                    images[1].style.transform = `translateX(-${mov}px)`
                    images[2].style.transform = `translateX(-${mov}px)`
                    images[3].style.transform = `translateX(-${mov}px)`
                    images[4].style.transform = `translateX(-${mov}px)`
                    aboutText[2].style.transform = `translateY(0px)`
                    aboutText[3].style.transform = `translateY(0px)`
                    break;
                case 25:
                    mov += images[3].width
                    images[2].style.transform = `translateX(-${mov}px)`
                    images[3].style.transform = `translateX(-${mov}px)`
                    images[4].style.transform = `translateX(-${mov}px)`
                    // images[3].style.transform = `translateX(-${mov}px)`
                    aboutText[4].style.transform = `translateY(0px)`
                    aboutText[5].style.transform = `translateY(0px)`
                    break;
                case 35:
                    mov += images[3].width
                    images[2].style.transform = `translateX(-${mov}px)`
                    images[3].style.transform = `translateX(-${mov}px)`
                    images[4].style.transform = `translateX(-${mov}px)`
                    aboutText[6].style.transform = `translateY(0px)`
                    aboutText[7].style.transform = `translateY(0px)`
                    break;
                case 40:
                    portfolio.style.display = 'flex';
                    team.style.display = 'flex';
                    contact.style.display = 'block';
            }
        }
        
    } else {
        document.getElementById('portfolio').classList.remove('removed')
        document.getElementById('team').classList.remove('removed')
        document.getElementById('contact').classList.remove('removed')
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