const ProductService = require('../product_service_no_di.js');
const ProductClient = require('../product_client.js');
jest.mock('../product_client.js');

//❗️ 이 fetchItems를 다른 모듈 테스트에도 필요한거라면 이 코드는 재사용 성이 떨어진다. 그래서 stub_impl을 만들것이다.
describe('ellie product test', () => {
  const fetchItems = jest.fn(async () => [
    {items: '🥛', available: true},
    {items: '🍌', available: false},
  ]);
  //❓뭐지!! 이거 못봤어!
  //다른 모듈에 있는 함수를 mock으로 만들기?
  ProductClient.mockImplementation(() => {
    return {
      fetchItems,
    }
  })

  let productService;

  beforeEach(() => {
    productService = new ProductService();
  });

  it('should filter out only available items', async () => {
    const items = await productService.fetchAvailableItems();
    expect(items.length).toBe(1);
    expect(items).toEqual([{items: '🥛', available: true}]);
  })
});

describe('my product test', () => {
  let client;
  let service;

  beforeEach(() => {
    service = new ProductService();
  });

  it('fetchAvailableItems', () => {
    const resp = [
      {name: 'item1', available: false},
      {name: 'item2', available: true}
    ];

    service.productClient.fetchItems = jest.fn( () => new Promise((resolve, reject) => resolve(resp)) );

    return service.fetchAvailableItems().then(data => expect(data).toEqual([{name: 'item2', available: true}]))
    
  })
  
})