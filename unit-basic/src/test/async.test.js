const fetchProduct = require('../async.js');

describe('fetchProduct', () => {
  it('success' , () => {
     fetchProduct('success').then((data) => {
      expect(data).toEqual({ item: 'PooP', price: 200 });
    });
  });

  // it('error', () => {
  //   return fetchProduct('error').catch(e => expect(e).toMatch('network error'));
  // })
})