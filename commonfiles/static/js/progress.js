var progressBar = document.getElementsByClassName('bar')[0]

function Progress (amount) {
    progressBar.style.width = `${amount}%`
    progressBar.innerText = `${amount}%`
}
