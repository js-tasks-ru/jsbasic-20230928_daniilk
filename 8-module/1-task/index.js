import createElement from "../../assets/lib/create-element.js";

export default class CartIcon {
  constructor() {
    this.render();
    this.addEventListeners();
    this.firstCoordTop =
      this.elem.getBoundingClientRect().top + window.pageYOffset;
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add("cart-icon_visible");

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart
            .getTotalPrice()
            .toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add("shake");
      this.elem.addEventListener(
        "transitionend",
        () => {
          this.elem.classList.remove("shake");
        },
        { once: true }
      );
    } else {
      this.elem.classList.remove("cart-icon_visible");
    }
  }

  addEventListeners() {
    document.addEventListener("scroll", () => this.updatePosition());
    window.addEventListener("resize", () => this.updatePosition());
  }

  updatePosition() {
    let firstCoordTop = this.elem.getBoundingClientRect().top + window.scrollY;
    let container = document.querySelector(".container");

    // let coordWind = window.scrollY;
    let offseRightContainer = container.getBoundingClientRect().right + 20;
    let offsetRightWindow =
      document.documentElement.clientWidth - this.elem.offsetWidth - 10;

    let leftOffset = Math.min(offseRightContainer, offsetRightWindow);

    

    if (window.scrollY > firstCoordTop) {
      this.elem.style.zIndex = 20;
      this.elem.style.position = "fixed";
      this.elem.style.left = leftOffset + "px";
      this.elem.style.top = 50 + "px";
      this.elem.style.right = 10 + "px";
      // console.log('сделали фикс')
    } else  if ( window.scrollY  === 0) {
      this.elem.style.position = "";
      this.elem.style.left = "";
      this.elem.style.zIndex = 0;
      // console.log('сделали абсолют')
    }

    if (document.documentElement.clientWidth <= 767) {
      this.elem.style.position = "";
      this.elem.style.left = "";
      this.elem.style.zIndex = 10;
      this.elem.style.top = "";
    }


  }
}
