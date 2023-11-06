export default class StepSlider {
  #elem;
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.#elem = document.createElement("div");
    this.render();
  }
  render() {
    this.#elem.className = "slider";
    let spanNumber = this.steps - 1;

    this.#elem.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="slider__thumb" style="left: 0%;">
      <span class="slider__value">0</span>
    </div>

    <!--Заполненная часть слайдера-->
    <div class="slider__progress" style="width: 0%;"></div>

    <!--Шаги слайдера-->
    <div class="slider__steps">
    
    </div>
  </div>
    `
    );

    for(let i = 0; i <= spanNumber; i++) {
    this.#elem.querySelector('.slider__steps').append(document.createElement('span'))
    }
    this.#elem.querySelector('.slider__steps').children[0].classList.add('slider__step-active')
    document.body.onpointerdown = (event) => {
      let elem;
      event.preventDefault();

      if (event.target.className === "slider__thumb") {
        elem = event.target;

        this.#elem.classList.add("slider_dragging");
        // event.target.style.position = 'absolute'
        // event.target.style.zIndex = 1000
        let prevSliderStep = this.#elem.querySelector(".slider__step-active");

        let onMousMove = (e) => {
          let percentShift =
            ((e.pageX - this.#elem.offsetLeft) / this.#elem.offsetWidth) * 100;
          let sliderSteps = this.#elem.querySelector(".slider__steps");
          let sliderValue = elem.querySelector(".slider__value");

          if (percentShift < 0) percentShift = 0;
          if (percentShift > 100) percentShift = 100;
          this.value = searchValueStep(percentShift, spanNumber);
          prevSliderStep.classList.remove("slider__step-active");
          sliderSteps.children[this.value].classList.add("slider__step-active");
          prevSliderStep = sliderSteps.children[this.value];
          sliderValue.textContent = this.value;

          this.#elem.querySelector(".slider__progress").style.width =
            percentShift + "%";
          elem.style.left = percentShift + "%";
        };

        document.body.addEventListener("pointermove", onMousMove);
        document.body.onpointerup = () => {
          this.#elem.dispatchEvent(
            new CustomEvent("slider-change", {
              detail: this.value,
              bubbles: true,
            })
          );
          this.#elem.classList.add("slider_dragging");

          document.body.removeEventListener("pointermove", onMousMove);
        };
      }
    };

    this.#elem.addEventListener("click", (e) => {
      let width = this.#elem.offsetWidth;
      let coordOfElem = e.clientX - this.#elem.offsetLeft;
      let percentClider = (coordOfElem / width) * 100;
      let sliderThumb = this.#elem.querySelector(".slider__thumb");
      let progressElem = this.#elem.querySelector(".slider__progress");
      let prevSliderStep =
        this.#elem.querySelector(".slider__steps").children[this.value];

      this.value = searchValueStep(percentClider, this.steps - 1);
      prevSliderStep.classList.remove("slider__step-active");
      this.#elem
        .querySelector(".slider__steps")
        .children[this.value].classList.add("slider__step-active");

      // делал в пикселях и перевёл в проценты, могу рефакторить, если неудобно читать
      sliderThumb.style.left = ((this.value * (width / (this.steps - 1))) / width) * 100 + "%";
      sliderThumb.querySelector("span").textContent = this.value;
      progressElem.style.width = (this.value * (width / (this.steps - 1))/width)*100 + "%";

      console.log(progressElem.style.width)

      this.#elem.dispatchEvent(
        new CustomEvent("slider-change", {
          detail: this.value,
          bubbles: true,
        })
      );
    });

    document
      .querySelector("#holder")
      .addEventListener("slider-change", (e) => console.log(e.detail));
    document.querySelector("#holder").addEventListener("slider-change", (e) => {
      console.log(e.detail);
    });

    function searchValueStep(number, steps) {
      let step = 100 / steps;
      let [boundLeft, boundRight] = [0, 100];
      for (let i = 0; i <= 100; i += step) {
        if (number > i) {
          boundLeft = Math.round(i);
        }
        if (number < i) {
          boundRight = Math.round(i);
          break;
        }
      }
      if (Math.abs(number - boundRight) <= Math.abs(number - boundLeft)) {
        return Math.round(boundRight / step);
      } else {
        return Math.round(boundLeft / step);
      }
    }
  }

  get elem() {
    return this.#elem;
  }
}
