import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = document.createElement('div')
    this.render()
  }
  render() {
    this.elem.classList = "ribbon";
    
    let buttonLeft = document.createElement('button')
    let buttonRight = document.createElement('button')
    let nav = document.createElement('nav')
    
    buttonLeft.className =
    "ribbon__arrow ribbon__arrow_left ribbon__arrow_visible";
    buttonRight.className =
    "ribbon__arrow ribbon__arrow_right ribbon__arrow_visible";
    nav.className = "ribbon__inner";

    nav.insertAdjacentHTML(
      "afterbegin",
      '<a href="#" class="ribbon__item ribbon__item_active" data-id="">All</a>' +
        this.categories
          .filter((elem,id) => id > 0 ).map(
            (elem) => `
      <a href="#" class="ribbon__item " data-id=${elem.id}>
          ${elem.name}
        </a> `
          )
          .join('')
    );

    buttonLeft.insertAdjacentHTML(
      "afterbegin",
      '<img src="/assets/images/icons/angle-icon.svg" alt="icon">'
    );
     buttonRight.insertAdjacentHTML(
       "afterbegin",
       '<img src="/assets/images/icons/angle-icon.svg" alt="icon">'
     );
    // console.log('buttonleft: ', buttonLeft)
    // console.log('nav: ',nav)
    this.elem.prepend(buttonLeft);
    this.elem.append(buttonRight);
    // document.body.appendChild(this.elem)
    buttonLeft.after(nav)

    
    
    // console.log('Left: ',nav.scrollLeft);
    
    buttonRight.addEventListener("click", () => {
      nav.scrollBy(350, 0);
    });

     buttonLeft.addEventListener("click", () => {
       nav.scrollBy(-350, 0);
     });

    nav.addEventListener('scroll', (e) => {
      buttonRight.classList.add("ribbon__arrow_visible");
      buttonLeft.classList.add("ribbon__arrow_visible");


       if ( nav.scrollLeft === 0 ) {
        buttonLeft.classList.remove('ribbon__arrow_visible');
       }

       if ((nav.scrollWidth - nav.scrollLeft - nav.clientWidth) < 1) {
         buttonRight.classList.remove('ribbon__arrow_visible');
       }
   
     
    })
    
    document.addEventListener("ribbon-select", (e) => {
      console.log('datId: ', e.detail)
    });

    nav.addEventListener('click', (e) => {
      // но console.log(this.elem.querySelector(".ribbon__inner"));  := null
     if(e.target.tagName === 'A') {
      e.preventDefault()
     Array.from(this.elem.querySelectorAll(".ribbon__item")).map((elem) =>
       elem.classList.remove('ribbon__item_active')
     );
      e.target.classList.add("ribbon__item_active");
      // console.log(e.target)
      //console.log(document.querySelector(`[data-id="${e.target}"]`));  := null
      // let rebboneSelect = new CustomEvent('ribbone-select', {
      //   detail: e.target.dataset.id,
      //   bubbles: true
      // })
      this.elem.dispatchEvent(
        new CustomEvent("ribbon-select", {
          detail: e.target.dataset.id,
          bubbles: true,
        })
      );
     }
     })

   
  }
}
