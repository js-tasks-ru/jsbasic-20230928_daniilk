import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  #elem
  #data
  constructor(product) {
    this.#data = product;
    this.#elem = document.createElement('div')
    this.state()
  }

  state() {
    let {name, price, category, image, id } = this.#data
    this.#elem.className = 'card'
    this.#elem.insertAdjacentHTML('beforeend', `
    <div class="card__top">
      <img src="/assets/images/products/${image}" class="card__image" alt="product">
      <span class="card__price">€${price.toFixed(2)}</span>
    </div>
    <div class="card__body">
      <div class="card__title">${name}</div>
      <button type="button" class="card__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
    </button> 
    </div>
    `)

    this.#elem.querySelector('.card__button').addEventListener('click',this.onClick)
    this.#elem.addEventListener('product-add', (e)=>{console.log(e.detail)})
  }

  onClick = (e) => {
    console.log('addShop ')
    let addProduct = new CustomEvent('product-add',{
      detail: this.#data.id,
      bubbles: true,
    })

    this.#elem.dispatchEvent(addProduct)
  }

  get elem() {
    return this.#elem
  }
}