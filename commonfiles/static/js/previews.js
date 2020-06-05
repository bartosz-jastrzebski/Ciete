var reader = new FileReader()
var inputs

document.querySelector('.field-javascript').style.display = 'none'

window.onload = (event)=> {
    let upload = Array.from(document.querySelectorAll("p.file-upload"))
    inputs = Array.from(document.querySelectorAll('input[type=file]'))
    inputs.forEach(AddImage)
    upload.forEach(ShowImage)
    inputs = Array.from(document.querySelectorAll('input[type=file]'))
    inputs.forEach(ShowNewImage)

    let addNextButton = document.querySelector('.add-row')
    addNextButton.onclick = addNext
    }

window.onbeforeunload = function() {
    let uploads = Array.from(document.querySelectorAll("p.file-upload"))
    uploads.forEach(ShowImage)
}

function AddImage(e) {
    if (!e.parentElement.querySelector('img')) {
        e.parentElement.innerHTML += '<img src="" width="auto" height="100" title="Photo preview">'
        }
}

function ShowImage(e) {
    let src = e.querySelector('a').innerHTML
    e.querySelector('img').setAttribute('src', `/media/${src}`)
    }

function ShowNewImage(e) {
    e.onchange = function() {
    let file = e.files[0]
    reader.onloadend = function() {
    if (reader.readyState == 2) {
        let img = e.parentElement.querySelector('img')
        img.setAttribute('src', reader.result)
        }
    }
    reader.readAsDataURL(file)
    }
}

function addNext () {
    let newForm = document.querySelectorAll('input[type=file]')
    newForm = newForm[newForm.length-2]
    ShowNewImage(newForm)
}