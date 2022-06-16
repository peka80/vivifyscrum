import LoginElements from "../../elements/loginElements";
import SidebarElements from "../../elements/sidebarElements";
import HeaderElements from "../../elements/headerElements";
import ProjectMenu from "../../elements/projectMenuElements";

class Login {
  clickLoginBtn() {
    cy.get(LoginElements.logInButton).click();
  }

  assertLoginPage() {
    cy.url().should("contain", "/login");
  }

  assertLoggedUser(orgHeader) {
    cy.url().should("contain", "/my-organizations");
    cy.get(HeaderElements.headerTitleSpan)
      .should("be.visible")
      .and("contain", orgHeader);
    cy.get(SidebarElements.accountImg).should("exist").and("be.visible");
  }

  assertEmptyFields(email, password) {
    this.clickLoginBtn();

    cy.get(LoginElements.validationSpan)
      .children()
      .should("have.length", 2)
      .then(($span) => {
        expect($span[0].innerText).to.eq(email);
        expect($span[1].innerText).to.eq(password);
      });
    this.assertLoginPage();
  }

  assertNoPassword(email, password) {
    cy.get(LoginElements.emailInput).clear().type(email);
    this.clickLoginBtn();

    cy.get(LoginElements.validationSpan)
      .children()
      .should("have.length", 2)
      .then(($span) => {
        expect($span[1].innerText).to.eq(password);
      });
    this.assertLoginPage();
  }

  assertNoEmail(email, password) {
    cy.get(LoginElements.passwordInput).clear().type(password);
    this.clickLoginBtn();

    cy.get(LoginElements.validationSpan)
      .children()
      .should("have.length", 2)
      .then(($span) => {
        expect($span[0].innerText).to.eq(email);
      });
    this.assertLoginPage();
  }

  assertNoMonkeySignEmail(email, password, errorMsg) {
    cy.get(LoginElements.emailInput).clear().type(email);
    cy.get(LoginElements.passwordInput).clear().type(password);
    this.clickLoginBtn();

    cy.get(LoginElements.validationSpan)
      .children()
      .should("have.length", 2)
      .then(($span) => {
        expect($span[0].innerText).to.eq(errorMsg);
      });
    this.assertLoginPage();
  }

  assertNoDomainEmail(email, password, errorMsg) {
    cy.get(LoginElements.emailInput).clear().type(email);
    cy.get(LoginElements.passwordInput).clear().type(password);
    this.clickLoginBtn();

    cy.get(LoginElements.validationSpan)
      .children()
      .should("have.length", 2)
      .then(($span) => {
        expect($span[0].innerText).to.eq(errorMsg);
      });
    this.assertLoginPage();
  }

  assertWrongEmail(email, password, errorMsg) {
    cy.intercept("api/v2/login").as("wrongEmailPass");

    cy.get(LoginElements.emailInput).clear().type(email);
    cy.get(LoginElements.passwordInput).clear().type(password);
    this.clickLoginBtn();

    cy.get(LoginElements.invEmailPassSpan).should(($span) => {
      expect($span).to.contain(errorMsg);
    });
    this.assertLoginPage();

    cy.get("@wrongEmailPass").should(({ request, response }) => {
      expect(request.method).to.equal("POST");
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.include({
        message: "Unauthenticated.",
      });
    });
  }

  assertLessCharPass(email, password, errorMsg) {
    cy.get(LoginElements.emailInput).clear().type(email);
    cy.get(LoginElements.passwordInput).clear().type(password);
    this.clickLoginBtn();

    cy.get(LoginElements.validationSpan)
      .children()
      .should("have.length", 2)
      .then(($span) => {
        expect($span[1].innerText).to.eq(errorMsg);
      });
    this.assertLoginPage();
  }

  assertWrongPass(email, password, errorMsg) {
    cy.intercept("api/v2/login").as("wrongEmailPass");

    cy.get(LoginElements.emailInput).clear().type(email);
    cy.get(LoginElements.passwordInput).clear().type(password);
    this.clickLoginBtn();

    cy.get(LoginElements.invEmailPassSpan).should(($span) => {
      expect($span).to.contain(errorMsg);
    });
    this.assertLoginPage();

    cy.get("@wrongEmailPass").should(({ request, response }) => {
      expect(request.method).to.equal("POST");
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.include({
        message: "Unauthenticated.",
      });
    });
  }

  loginUserValid(email, password, orgHeader) {
    cy.get(LoginElements.emailInput).type(email);
    cy.get(LoginElements.passwordInput).type(password);
    cy.get(LoginElements.logInButton).click();

    this.assertLoggedUser(orgHeader);
  }

  loginThenLogoutTheUser(email, password, orgHeader) {
    this.loginUserValid(email, password, orgHeader);

    cy.intercept("api/v2/logout").as("logout");

    cy.get(SidebarElements.accountImg).click();
    cy.get(ProjectMenu.accountProfileLi).click();
    cy.get(HeaderElements.logOutButton).click();

    this.assertLoginPage();

    cy.get(SidebarElements.accountImg).should("not.exist");

    cy.get("@logout").should(({ request, response }) => {
      expect(request.method).to.equal("POST");
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.include({
        message: "Successfully logged out",
      });
    });
  }

  logoutUser() {
    cy.intercept("POST", "/api/v2/logout").as("logout");

    cy.get(SidebarElements.accountImg).click();
    cy.get(ProjectMenu.accountProfileLi).click();
    cy.get(HeaderElements.logOutButton).click();

    this.assertLoginPage();

    cy.get(SidebarElements.accountImg).should("not.exist");

    cy.wait("@logout").should(({ request, response }) => {
      expect(request.method).to.equal("POST");
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.include({
        message: "Successfully logged out",
      });
    });
  }
}

export default Login;
