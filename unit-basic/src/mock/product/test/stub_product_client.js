//이 stub을 테스트코드안에 둔 이유는 제품을 배포할때 쓰는게 아니라서 
class StubProductClient {
  async fetchItems() {
    return [
      {items: '🥛', available: true},
      {items: '🍌', available: false},
    ]
  }
}

module.exports = StubProductClient;