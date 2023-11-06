export default class StepSlider {
  #elem
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.#elem = document.createElement('div')
    this.render()
  }

  render() {
    this.#elem.className = 'slider';
    let spanNumber = this.steps - 1 

    this.#elem.insertAdjacentHTML('afterbegin', `
    <div class="slider__thumb">
      <span class="slider__value">0</span>
    </div>
  
    <!--Полоска слайдера-->
    <div class="slider__progress"></div>
  
    <div class="slider__steps">
      <span class="slider__step-active"></span>   
    </div>
    `)

    this.#elem.querySelector(".slider__progress").style.width = '0%'

    for(let i = 0; i < spanNumber; i++) {
      this.#elem.querySelector('.slider__steps').append(document.createElement('span'))
    }

    this.#elem.querySelector('.slider__steps')

    this.#elem.addEventListener('click', (e) => {
        let [x,y] = [this.#elem.offsetLeft,this.#elem.offsetTop]
        let width = this.#elem.offsetWidth
        let coordOfElem = e.clientX - x
        let percentClider = coordOfElem/width * 100
        let sliderThumb = this.#elem.querySelector(".slider__thumb");
        let progressElem = this.#elem.querySelector(".slider__progress");
        let prevSliderStep =
        this.#elem.querySelector(".slider__steps").children[this.value];

        
        this.value = searchBoundaries(percentClider, this.steps - 1);
        prevSliderStep.classList.remove("slider__step-active");
        this.#elem
        .querySelector(".slider__steps")
        .children[this.value].classList.add("slider__step-active");
        
        
        // sliderThumb.style.left = this.value * (width/(this.steps - 1)) + "px";
        // делал в пикселях и перевёл в проценты, могу рефакторить, если неудобно читать
        sliderThumb.style.left =
          ((this.value * (width / (this.steps - 1))) / width) * 100 + "%";
        sliderThumb.querySelector("span").textContent = this.value;
        progressElem.style.width =
          (this.value * (width / (this.steps - 1))/width)*100 + "%";     
        // progressElem.style.width =
        // this.value * (width / (this.steps - 1)) + "px" ;


        this.#elem.dispatchEvent(new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true
        }))

    })

    document.querySelector('#holder').addEventListener('slider-change', (e) => console.log(e.detail))

    function searchBoundaries(number, steps) {
      let step = 100/steps
      let [boundLeft, boundRight] = [0,100]
      for(let i = 0; i <= 100; i += step) {
        if ( number > i) {
          boundLeft = Math.round(i)
        }
        if( number < i ) {
          boundRight = Math.round(i) 
          break
        }
      }
      if (Math.abs(number - boundRight) <= Math.abs(number - boundLeft)) {
        return Math.round(boundRight / step);
      } else {
        return Math.round(boundLeft / step);
      };

    }

  }

  get elem() {
    return this.#elem
  }
}
