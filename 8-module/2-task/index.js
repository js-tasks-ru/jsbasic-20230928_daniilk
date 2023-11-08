import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  // При использовании приватного атрибута ломается проверка, хотя результат такой же
  // #elem
  constructor(products) {
    this.products = products;
    this.elem = createElement(
      `<div class="products-grid">
        <div class="products-grid__inner">  
          </div>
       </div>`
    );
    this.filters = {};
    this.renderCards(products)
  }

  renderCards(array) {
    let arrayCards = array.map((elem) => new ProductCard(elem).elem);

    this.elem.querySelector(".products-grid__inner").innerHTML = "";
    for (let i = 0; i < arrayCards.length; i++) {
      this.elem.querySelector(".products-grid__inner").append(arrayCards[i]);
    }
    return this.elem;
  }
 
  updateFilter(filters) {
    this.filters = Object.assign(this.filters, filters);
    let products = this.products.filter((elem) => {
      if (
        (!this.filters.noNuts || this.filters.noNuts !== elem.nuts) &
        (!this.filters.vegeterianOnly ||
          this.filters.vegeterianOnly === elem.vegeterian) &
        (!this.filters.maxSpiciness ||
          elem.spiciness <= this.filters.maxSpiciness) &
        (!this.filters.category || this.filters.category === elem.category)
      ) {
        return true;
      }
      
    });
    // console.log(products)
    return this.renderCards(products);
  }
  // get elem() {
  //   return this.renderCards(this.products);
  // }
}
