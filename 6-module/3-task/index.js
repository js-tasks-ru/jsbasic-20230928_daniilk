import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  #elem
  constructor(slides) {
    this.slides = slides;
    this.#elem = document.createElement('div')
    this.lengthSlider = slides.length
    this.render()
    this.initCarousel()
  }

  render() {
    this.#elem.className = 'carousel'
    // console.log(this.#elem)

    this.#elem.innerHTML = `
    <div class="carousel__arrow carousel__arrow_right">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </div>
  <div class="carousel__arrow carousel__arrow_left">
    <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
  </div>
    `
    let carouselInner = document.createElement('div')
    carouselInner.className = 'carousel__inner'
    this.#elem.appendChild(carouselInner)
    carouselInner.insertAdjacentHTML('beforeend', this.slides
      .map((elem) => `
      <div class="carousel__slide" data-id="penang-shrimp">
        <img src="/assets/images/carousel/${elem.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${elem.price}</span>
          <div class="carousel__title">${elem.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
      `).join(''))
    
   console.log('slidesLeng', this.lengthSlider)
  document.body.appendChild(this.#elem);
  //  console.log(document.querySelector('.carousel')) // пока не написал 42 строку, здесь был null

  
  
  let list = document.querySelectorAll('.carousel__button')
  console.log(list)
  Array.from(list).map((elem,id) => 
  
  elem.addEventListener('click', () => {
    console.log(this.slides[id].id)
    let addProduct = new CustomEvent('product-add',{
      detail: this.slides[id].id,
      bubbles: true,
    })
    
    this.#elem.dispatchEvent(addProduct)
  })
  )
  document.addEventListener('product-add', (e)=>{console.log('Hi, this custom',e.detail)})

  }

 
   initCarousel() {
    console.log()
    let containerClick = document.querySelector('.carousel');
    console.log(containerClick)
    let i = 0;
    containerClick.querySelector(".carousel__arrow_left").style.display = "none";
    containerClick.addEventListener("click", (event) => {
      let container = containerClick.querySelector(".carousel__inner");
      let buttonSwipe = event.target.closest("div");
      let swipe = containerClick.querySelector(".carousel__slide");

  
      switch (buttonSwipe.className) {
        case "carousel__arrow carousel__arrow_right":
          containerClick.querySelector(".carousel__arrow_left").style.display = "";
          i += 1;
          container.style.transform = `translateX(-${swipe.offsetWidth * i}px)`;
          if (i == this.lengthSlider - 1) {
            buttonSwipe.style.display = "none";
          }
          break;
  
        case "carousel__arrow carousel__arrow_left":
          containerClick.querySelector(".carousel__arrow_right").style.display = "";
          i -= 1;
          container.style.transform = `translateX(-${swipe.offsetWidth * i}px)`;
          if (i == 0) {
            buttonSwipe.style.display = "none";
          }
          break;
      }
    });
    
  }

//   funClick = (id) => {
// return (
//    function() {
//     console.log(id)
//      let addProduct = new CustomEvent('product-add',{
//       detail: id,
//       bubbles: true,
//     })

//     this.#elem.dispatchEvent(addProduct)
//   }
//     )
//   }

  get elem() {
    return this.#elem
  }
}

