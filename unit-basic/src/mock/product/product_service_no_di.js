const ProductClient = require('./product_client');

class ProductService {
  constructor() {
    //의존성은 클래스 내부에서 만드는게 아닌 외부에서 주입받아야 한다!
    this.productClient = new ProductClient();
  }

  fetchAvailableItems() {
    return this.productClient
      .fetchItems()
      .then((items) => items.filter((item) => item.available));
  }
}

module.exports = ProductService;
