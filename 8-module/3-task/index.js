export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    // Почему если делаю возврат или проверяю таким образом и делаю возврат из функции, то работа неккоректна?
    // if (!product) return ;
    // if (
    //   !product.id ||
    //   !product.name ||
    //   !product.price ||
    //   !product.category ||
    //   !product.image
    // )
    //   return;
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

      // this.getTotalPrice();
    }
  }

  updateProductCount(productId, amount) {
    this.cartItems.map((elem, id, arr) => {
      if (elem.product.id === productId) elem.count += amount;
      elem.count === 0 ? arr.splice(id, 1) : elem.count;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
