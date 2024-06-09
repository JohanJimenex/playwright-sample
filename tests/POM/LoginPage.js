class LoginPage {
  username = "#user-name";
  password = "#password";
  loginButton = "#login-button";

  page;

  constructor(pageObject) {
    this.page = pageObject;
  }

  async Login(username, password) {
    await this.page.fill(this.username, username);
    await this.page.fill(this.password, password);
    await this.page.click(this.loginButton);
  }
}

export default LoginPage;
