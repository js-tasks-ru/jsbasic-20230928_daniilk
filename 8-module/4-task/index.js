import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (product) {
      let needAdd = true;

      if (this.cartItems) {
        for (let elem of this.cartItems) {
          if (elem.product.id === product.id) {
            elem.count += 1;
            needAdd = false;
            this.onProductUpdate(elem);
            break;
          } else {
            needAdd = true;
          }
        }
      }
      if (needAdd) {
        this.cartItems[this.cartItems.length] = { product: product, count: 1 };
        this.onProductUpdate({ product: product, count: 1 });
      }
    }
  }

  updateProductCount(productId, amount) {
    this.cartItems.map((elem, id, arr) => {
      if (elem.product.id === productId) elem.count += amount;
      elem.count === 0 ? arr.splice(id, 1) : elem.count;
      this.cartItems.length === 0 && this.modal.close();
      this.onProductUpdate(elem);
    });
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, count) => sum + count.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (sum, price) => sum + price.product.price * price.count,
      0
    );
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${
            // просто это вводит в путаницу когда смотришь на открытие самой модали
            // product.price.toFixed(2)
            (product.price * count).toFixed(2)
          }</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle("Your order");
    let containerModal = document.createElement("div");
    this.appendElems(containerModal, this.cartItems);
    containerModal.append(this.renderOrderForm());
    this.modal.setBody(containerModal);
    this.modal.open();

    containerModal.addEventListener("click", (e) => {
      let buttonCounter = e.target.closest(".cart-counter__button");
      if (buttonCounter) {
        let product = e.target.closest(".cart-product");
        let idProduct = product.dataset.productId;

        buttonCounter.classList.contains("cart-counter__button_minus")
          ? this.updateProductCount(idProduct, -1)
          : this.updateProductCount(idProduct, +1);
      }
    });
    containerModal
      .querySelector(".cart-form")
      .addEventListener("submit", this.onSubmit);
  }

  appendElems(container, items) {
    for (let item of items) {
      container.append(this.renderProduct(item.product, item.count));
    }
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (document.body.closest(".is-modal-open")) {
      let product = document.querySelector(
        `[data-product-id=${cartItem.product.id}]`
      );
      let totalPrice = document.querySelector(".cart-buttons__info-price");

      if (product) {
        product.querySelector(".cart-counter__count").textContent =
          cartItem.count;
        product.querySelector(".cart-product__price").textContent = `€${(
          cartItem.product.price * cartItem.count
        ).toFixed(2)}`;
        totalPrice.textContent = `€${this.getTotalPrice().toFixed(2)}`;
        if (cartItem.count === 0) product.remove();
      }
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    let form = document.querySelector(".cart-form ");
    form.querySelector('[type="submit"]').classList.add("is-loading");
    fetch("https://httpbin.org/post", {
      method: "POST",
      body: new FormData(form),
    })
      .then((responce) => {
        form.querySelector('[type="submit"]').classList.remove("is-loading");
        // console.log(responce);
        this.modal.setTitle("Success!");
        this.cartItems = [];
      })
      .then(() => {
        let modal = document.querySelector(".modal__body");
        modal.classList.add("modal__body-inner");
        modal.classList.remove("modal__body");
        modal.innerHTML = "";
        modal.insertAdjacentHTML(
          "beforeend",
          ` 
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      `
        );

        this.cartIcon.update(this);
      });
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
