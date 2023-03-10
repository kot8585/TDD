class StubUserClient {
  async login(id, password) {
    return "login success";
  }
}

module.exports = StubUserClient;
