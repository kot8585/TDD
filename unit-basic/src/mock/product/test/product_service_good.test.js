const ProductService = require('../product_service_good.js');
const StubProductClient = require('./stub_product_client');

describe('ProductService - Stub', () => {
  let productService;

  beforeEach(() => {
    productService = new ProductService(new StubProductClient());
  });

  it('should filter out only available items', async () => {
    const items = await productService.fetchAvailableItems();
    expect(items.length).toBe(1);
    expect(items).toEqual([{items: '🥛', available: true}]);
  });
});