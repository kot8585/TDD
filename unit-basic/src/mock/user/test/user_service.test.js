const UserService = require("../user_service");
const UserClient = require("../user_client");
const StubUserClient = require("./stub_user_client");

describe("UserService - stub", () => {
  let userService;

  beforeEach(() => {
    userService = new UserService(new StubUserClient());
  });

  it("isLoggedIn is true after user logged in", async () => {
    await userService.login("id", "password");
    expect(userService.isLogedIn).toBe(true);
  });
});
