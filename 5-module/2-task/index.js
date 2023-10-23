function toggleText() {
  let hideShowElem = document.querySelector('.toggle-text-button')
  hideShowElem.addEventListener('click',() => {
    let text = document.querySelector('#text')
    text.hidden = !text.hidden
  })
}
